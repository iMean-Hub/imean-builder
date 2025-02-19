import { IEvent } from '@nestjs/cqrs';

export class MessageProcessingEvent implements IEvent {
  constructor() {}
}
