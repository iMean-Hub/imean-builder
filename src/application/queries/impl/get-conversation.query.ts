import { IQuery } from '@nestjs/cqrs';

export class GetConversationQuery implements IQuery {
  constructor(public readonly id: string) {}
}
