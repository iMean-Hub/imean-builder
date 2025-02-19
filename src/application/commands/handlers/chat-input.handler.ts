import { ChatService } from '#application/services/chat.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatInputCommand } from '../impl/chat-input.command';

@CommandHandler(ChatInputCommand)
export class ChatInputHandler implements ICommandHandler<ChatInputCommand> {
  constructor(private readonly chatService: ChatService) {}

  async execute(command: ChatInputCommand): Promise<void> {
    const { conversationId, userId, content } = command;

    return await this.chatService.chatInput(content, conversationId, userId);
  }
}
