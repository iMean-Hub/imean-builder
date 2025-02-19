import { CreateConversationInput } from '#interfaces/graphql/dtos/conversation.dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateConversationCommand implements ICommand {
  constructor(
    public readonly input: CreateConversationInput,
    public readonly users: string[]
  ) {}
}
