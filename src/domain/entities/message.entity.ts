import { ObjectId } from 'bson';
import { MessageRoleType, MessageTypeKeys } from '../types/message.enums';
import { IMessage, IMessageContentMap } from '../types/message.interface';

export class Message<T extends MessageTypeKeys, C = IMessageContentMap[T]>
  implements IMessage<T, C>
{
  constructor(
    readonly id: string,
    readonly conversationId: string,
    readonly role: MessageRoleType,
    readonly type: T,
    readonly content: C,
    readonly createdAt: Date,
    public metadata?: any,
    readonly visitorId?: string | null,
    readonly userId?: string | null,
    readonly updatedAt?: Date
  ) {}

  static create<T extends MessageTypeKeys, C = IMessageContentMap[T]>(data: {
    conversationId: string;
    role: MessageRoleType;
    type: T;
    content: C;
    visitorId?: string | null;
    userId?: string | null;
    messageId?: string;
  }): Message<T, C> {
    return new Message(
      data.messageId ?? new ObjectId().toHexString(),
      data.conversationId,
      data.role,
      data.type,
      data.content,
      new Date(),
      undefined,
      data.visitorId,
      data.userId
    );
  }

  static fromModel<T extends MessageTypeKeys>(model: IMessage<T>): Message<T> {
    return new Message(
      model.id,
      model.conversationId,
      model.role,
      model.type,
      model.content,
      model.createdAt,
      model.metadata,
      model.visitorId,
      model.userId,
      model.updatedAt
    );
  }
}
