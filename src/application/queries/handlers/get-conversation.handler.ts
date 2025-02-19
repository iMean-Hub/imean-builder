import { Conversation } from '#domain/entities/conversation.entity';
import { IConversationRepository } from '#domain/repositories/conversation.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetConversationQuery } from '../impl/get-conversation.query';

@QueryHandler(GetConversationQuery)
export class GetConversationHandler
  implements IQueryHandler<GetConversationQuery>
{
  constructor(
    private readonly conversationRepository: IConversationRepository
  ) {}

  async execute(query: GetConversationQuery): Promise<Conversation | null> {
    const { id } = query;
    return this.conversationRepository.findById(id);
  }
}
