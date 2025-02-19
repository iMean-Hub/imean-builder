import { BusinessErrorCode, BusinessException } from '#core/exceptions';
import { Conversation } from '#domain/entities/conversation.entity';
import { IConversationRepository } from '#domain/repositories/conversation.repository';
import { ConversationStatus } from '#domain/types/conversation.enums';
import { IWorkflowGroup } from '#domain/types/workflow.interface';
import { AiConnectorService } from '#infrastructure/external-services/ai-connector.service';
import { SpecifyRequired } from '#shared/utils/type-fusion.utils';
import { Injectable } from '@nestjs/common';
import { SearchService } from './search.service';

export enum IntentStatus {
  MULTI_TURN = 'MULTI_TURN',
  MULTI_HINT = 'MULTI_HINT',
}

export class AiStreamReader
  implements
    AsyncIterable<{
      type: 'error' | 'message' | 'exec' | 'ended';
      data?: string;
    }>
{
  [Symbol.asyncIterator](): AsyncIterator<
    { type: 'error' | 'message' | 'exec' | 'ended'; data?: string },
    any,
    any
  > {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
export class IntentAnalyzerService {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly searchService: SearchService,
    private readonly aiConnectorService: AiConnectorService
  ) {}
  async analyzeIntent(content: string, conversation: Conversation) {
    if (!this._checkedConversation(conversation)) {
      throw new Error();
    }

    // 异步分析意图
    // TODO 货币意图分析

    // 执行意图分析
    try {
      switch (conversation.status) {
        case ConversationStatus.CHAT:
          return await this._intentForChatStatus(content, conversation);
        case ConversationStatus.HINT:
          return await this._intentForHintStatus(content, conversation);
        default:
          throw new Error();
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  _checkedConversation(
    conversation: Conversation
  ): conversation is SpecifyRequired<Conversation, 'threadId'> {
    if (!conversation.threadId) {
      return false;
    }

    return true;
  }

  async _intentForChatStatus(
    content: string,
    conversation: SpecifyRequired<Conversation, 'threadId'>
  ): Promise<AiStreamReader> {
    let searchList: IWorkflowGroup[];

    try {
      searchList = await this.searchService.searchWorkflows({
        content,
        agentId: conversation.agentId,
        conversationId: conversation.id,
      });
    } catch (error) {
      throw new BusinessException(
        BusinessErrorCode.NETWORK_CONNECTION_ERROR_WRE,
        error
      );
    }

    // TODO 优化这个if嵌套
    if (searchList.length) {
      conversation.modify({
        candidateWorkflows: searchList,
      });

      if (searchList.length === 1) {
        conversation.chooseWorkflow(1);
      }

      // TODO send workflowGroupMessage
      await this.conversationRepository.save(conversation);
    }

    switch (conversation.status) {
      case ConversationStatus.CHAT:
        return await this.aiConnectorService.client.Dialogues.multiTurn(
          {
            agentId: conversation.agentId,
            text: content,
            threadId: conversation.threadId,
            titles: [],
          },
          {
            conversationId: conversation.id,
          }
        );
      case ConversationStatus.HINT:
        return await this._intentForHintStatus(content, conversation);
      default:
        throw new Error();
    }
  }

  async _intentForHintStatus(
    content: string,
    conversation: SpecifyRequired<Conversation, 'threadId'>
  ): Promise<AiStreamReader> {
    if (
      conversation.status !== ConversationStatus.HINT ||
      !conversation.currentWorkflow
    ) {
      throw new Error();
    }

    // TODO const tagList = await combinedFlowService.getCombinedFlowTagsList(this.currentWorkflowIds);
    const tagList = [];

    return await this.aiConnectorService.client.Dialogues.multiHint(
      {
        agentId: conversation.agentId,
        text: content,
        threadId: conversation.threadId,
        title: conversation.currentWorkflow.title,
        tagList,
      },
      {
        conversationId: conversation.id,
      }
    );
  }
}
