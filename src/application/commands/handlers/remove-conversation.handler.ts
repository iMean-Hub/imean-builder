import { ConversationService } from '#application/services/conversation.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveConversationCommand } from '../impl/remove-conversation.command';

@CommandHandler(RemoveConversationCommand)
export class RemoveConversationHandler
  implements ICommandHandler<RemoveConversationCommand>
{
  constructor(private readonly conversationService: ConversationService) {}

  async execute(command: RemoveConversationCommand): Promise<boolean> {
    const { conversationId, userId, permanent } = command;

    return await this.conversationService.removeConversation(
      conversationId,
      userId,
      permanent
    );
  }
}
