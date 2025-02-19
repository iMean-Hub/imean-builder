import { Conversation } from '#domain/entities/conversation.entity';
import { IConversationRepository } from '#domain/repositories/conversation.repository';
import {
  CreateConversationInput,
  ModifyConversationInput,
} from '#interfaces/graphql/dtos/conversation.dto';
import { Injectable } from '@nestjs/common';
import { ConversationValidatorService } from './conversation-validator.service';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: IConversationRepository,
    private readonly conversationValidatorService: ConversationValidatorService
  ) {}

  async createConversation(
    input: CreateConversationInput,
    users: string[]
  ): Promise<Conversation> {
    await this.conversationValidatorService.validate({
      agentId: input.agentId,
      userIds: users,
    });

    // 创建 Conversation 聚合根
    const conversation = Conversation.create({
      title: input.title,
      users,
      agentId: input.agentId,
    });

    await this.conversationRepository.save(conversation);

    return conversation;
  }

  async removeConversation(
    conversationId: string,
    userId: string,
    permanent?: boolean
  ): Promise<boolean> {
    await this.conversationValidatorService.check({
      hasConversation: { conversationId, userId },
    });

    await this.conversationRepository.remove(conversationId, permanent);

    return true;
  }

  async modifyConversation(
    input: ModifyConversationInput,
    userId: string
  ): Promise<Conversation> {
    await this.conversationValidatorService.check({
      hasConversation: { conversationId: input.id, userId },
    });

    const conversation = await this.conversationRepository.findById(input.id);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    conversation.modify(input);

    await this.conversationRepository.save(conversation);

    return conversation;
  }

  async ensureGet(
    conversationId: string,
    userId: string
  ): Promise<Conversation> {
    await this.conversationValidatorService.check({
      hasConversation: { conversationId, userId },
    });

    const conversation =
      await this.conversationRepository.findById(conversationId);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation;
  }
}
