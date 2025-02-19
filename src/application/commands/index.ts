import { CreateConversationHandler } from './handlers/create-conversation.handler';
import { ModifyConversationHandler } from './handlers/modify-conversation.handler';
import { RemoveConversationHandler } from './handlers/remove-conversation.handler';

export const CommandHandlers = [
  CreateConversationHandler,
  ModifyConversationHandler,
  RemoveConversationHandler,
];
