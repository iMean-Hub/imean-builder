import { ICommand } from '@nestjs/cqrs';

export class ChatInputCommand implements ICommand {
  constructor(
    public readonly conversationId: string,
    public readonly userId: string,
    public readonly content: string
  ) {}
}
