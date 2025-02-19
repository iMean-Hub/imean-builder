import { Message } from '../entities/message.entity';
import { MessageTypeKeys } from '../types/message.enums';
import { IMessage } from '../types/message.interface';

export abstract class IMessageRepository {
  abstract save<T extends MessageTypeKeys>(
    message: IMessage<T>
  ): Promise<Message<T>>;

  abstract remove(id: string, permanent?: boolean): Promise<void>;
}
