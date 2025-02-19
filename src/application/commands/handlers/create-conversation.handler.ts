import { ConversationService } from '#application/services/conversation.service';
import { Conversation } from '#domain/entities/conversation.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateConversationCommand } from '../impl/create-conversation.command';

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler
  implements ICommandHandler<CreateConversationCommand>
{
  constructor(private readonly conversationService: ConversationService) {}

  async execute(command: CreateConversationCommand): Promise<Conversation> {
    const { users, input } = command;

    return await this.conversationService.createConversation(input, users);
  }
}
