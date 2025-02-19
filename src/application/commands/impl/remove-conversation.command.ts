import { ICommand } from '@nestjs/cqrs';

export class RemoveConversationCommand implements ICommand {
  constructor(
    public readonly conversationId: string,
    public readonly userId: string,
    public readonly permanent?: boolean
  ) {}
}
