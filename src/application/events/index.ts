import { MessageProcessingHandler } from './handlers/message-processing.handler';
import { MessageSentHandler } from './handlers/message-sent.handler';
import { MessageProcessingEvent } from './impl/message-processing.event';
import { MessageSentEvent } from './impl/message-sent.event';

export const EventHandlers = [MessageSentHandler, MessageProcessingHandler];

export { MessageProcessingEvent, MessageSentEvent };
