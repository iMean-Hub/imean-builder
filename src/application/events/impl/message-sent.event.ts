import { Message } from '#domain/entities/message.entity';
import { MessageTypeKeys } from '#domain/types/message.enums';
import { IEvent } from '@nestjs/cqrs';

export class MessageSentEvent<T extends MessageTypeKeys> implements IEvent {
  constructor(
    readonly message: Message<T>,
    readonly save: boolean = false
  ) {}
}
