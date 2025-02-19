import {
  IPatchMessageContent,
  IProcessMessageContent,
  ITextMessageContent,
  IWorkflowGroupMessageContent,
} from '../types/message-content.interface';
import { MessageRoleType, MessageTypeKeys } from './message.enums';

export interface IMessageContentMap {
  [MessageTypeKeys.PATCH]: IPatchMessageContent;
  [MessageTypeKeys.TEXT]: ITextMessageContent;
  [MessageTypeKeys.PROCESS]: IProcessMessageContent;
  [MessageTypeKeys.WORKFLOW_GROUP]: IWorkflowGroupMessageContent;
  // 继续添加其他消息类型...
}

export interface IMessage<
  T extends MessageTypeKeys,
  // 如果有遗漏，TS 会报错
  C = IMessageContentMap[T],
> {
  readonly id: string;
  readonly conversationId: string;
  readonly role: MessageRoleType;
  readonly type: T;
  readonly content: C;
  readonly createdAt: Date;
  metadata?: any;
  readonly visitorId?: string | null;
  readonly userId?: string | null;
  readonly updatedAt?: Date;
}
