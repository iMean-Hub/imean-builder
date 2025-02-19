import { ModifyConversationInput } from '#interfaces/graphql/dtos/conversation.dto';
import { ICommand } from '@nestjs/cqrs';

export class ModifyConversationCommand implements ICommand {
  constructor(
    public readonly input: ModifyConversationInput,
    public readonly userId: string
  ) {}
}
