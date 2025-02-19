import { Conversation } from '#domain/entities/conversation.entity';
import { Message } from '#domain/entities/message.entity';
import { IConversationRepository } from '#domain/repositories/conversation.repository';
import { IMessageRepository } from '#domain/repositories/message.repository';
import {
  MessageRoleType,
  MessageTypeKeys,
  PatchMessageContentActionType,
} from '#domain/types/message.enums';
import { AiConnectorService } from '#infrastructure/external-services/ai-connector.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { IntentAnalyzerService } from './intent-analyzer.service';

@Injectable()
export class ChatService {
  private readonly logger = new Logger();

  constructor(
    private readonly aiConnectorService: AiConnectorService,
    private readonly conversationRepository: IConversationRepository,
    private readonly conversationService: ConversationService,
    private readonly intentAnalyzerService: IntentAnalyzerService,
    private readonly messageRepository: IMessageRepository
  ) {}

  async chatInput(content: string, conversationId: string, userId: string) {
    // ----- STEP1 校验并实例参数 ---------------------------------------------
    // TODO checkBalance
    const conversation = await this.conversationService.ensureGet(
      conversationId,
      userId
    );

    // ----- STEP2 初始化回复消息 ---------------------------------------------
    const { userMessage, systemMessage } = this._initialMessages(
      content,
      conversation,
      userId
    );

    // ----- STEP3 校验会话的线程 ---------------------------------------------
    if (!conversation.threadId) {
      const { threadId } =
        await this.aiConnectorService.client.Dialogues.createThread();

      conversation.modify({ threadId });
      await this.conversationRepository.save(conversation);
    }

    // ----- STEP4 意图分析并回复 ---------------------------------------------
    try {
      const finalMsg = await this._handleIntentMessages(
        content,
        conversation,
        systemMessage.id
      );

      conversation.sendMessage(userMessage, true);
      if (finalMsg) conversation.sendMessage(finalMsg, true);
    } catch (error) {
      await this._rollbackMessage(userMessage.id, conversation);
      throw error;
    }
  }

  _initialMessages(
    content: string,
    conversation: Conversation,
    userId: string
  ) {
    const userMessage = Message.create({
      conversationId: conversation.id,
      role: MessageRoleType.USER,
      type: MessageTypeKeys.TEXT,
      content: { text: content, type: MessageTypeKeys.TEXT },
      userId,
    });
    conversation.sendMessage(userMessage, false);

    const systemMessage = conversation.createSystemMessage(
      MessageTypeKeys.TEXT,
      { text: '', done: false }
    );
    conversation.sendMessage(systemMessage, false);

    return { userMessage, systemMessage };
  }

  async _handleIntentMessages(
    content: string,
    conversation: Conversation,
    systemMessageId: string
  ): Promise<Message<MessageTypeKeys.TEXT> | null> {
    const intent = await this.intentAnalyzerService.analyzeIntent(
      content,
      conversation
    );
    let text: string | null = '';

    for await (const { type, data } of intent) {
      switch (type) {
        case 'message':
          if (text) text += data;
          const msg = conversation.createSystemMessage(
            MessageTypeKeys.PATCH,
            {
              patches: [
                {
                  path: 'content.text',
                  action: PatchMessageContentActionType.APPEND,
                  value: data,
                },
              ],
            },
            systemMessageId
          );
          conversation.sendMessage(msg, false);
          break;
        case 'exec':
          text = null;
          // TODO execWorkflow event
          break;
        case 'ended':
          break;
        default:
          this.logger.warn(`Unknown intent type: ${type}`);
      }
    }

    // 最终消息
    const finalMsg = text
      ? conversation.createSystemMessage(
          MessageTypeKeys.TEXT,
          {
            text,
            done: true,
          },
          systemMessageId
        )
      : null;

    return finalMsg;
  }

  /**
   * 回滚会话中处理发生异常的消息
   * @param messageId
   * @param conversation
   */
  async _rollbackMessage(messageId: string, conversation: Conversation) {
    await this.messageRepository.remove(messageId);

    const toRollbackMessage = conversation.createSystemMessage(
      MessageTypeKeys.TEXT,
      { text: '已撤回', done: true },
      messageId
    );

    conversation.sendMessage(toRollbackMessage, false);
  }
}
