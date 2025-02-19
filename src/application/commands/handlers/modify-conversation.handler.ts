import { ConversationService } from '#application/services/conversation.service';
import { Conversation } from '#domain/entities/conversation.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ModifyConversationCommand } from '../impl/modify-conversation.command';

@CommandHandler(ModifyConversationCommand)
export class ModifyConversationHandler
  implements ICommandHandler<ModifyConversationCommand>
{
  constructor(private readonly conversationService: ConversationService) {}

  async execute(command: ModifyConversationCommand): Promise<Conversation> {
    const { input, userId } = command;

    return await this.conversationService.modifyConversation(input, userId);
  }
}
