import { Conversation } from '../entities/conversation.entity';
import { IConversation } from '../types/conversation.interface';

export abstract class IConversationRepository {
  abstract save(conversation: IConversation): Promise<Conversation>;

  abstract remove(id: string, permanent?: boolean): Promise<void>;

  abstract findById(id: string): Promise<Conversation | null>;
}
