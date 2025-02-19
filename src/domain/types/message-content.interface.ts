import {
  MessageTypeKeys,
  PatchMessageContentActionType,
  ProcessStatusEnum,
} from './message.enums';
import { IWorkflowGroup } from './workflow.interface';

export abstract class IMessageContent {
  type!: MessageTypeKeys;
  done?: boolean;
}

interface ITextMessageContent extends IMessageContent {
  type: MessageTypeKeys;
  done?: boolean;
  text: string;
}

interface IProcessMessageContent extends IMessageContent {
  type: MessageTypeKeys;
  done?: boolean;
  processId: string;
  workflowId: string;
  status: ProcessStatusEnum;
  thumbsUp?: boolean;
  thumbsDown?: boolean;
}

interface IPatchMessageContent extends IMessageContent {
  type: MessageTypeKeys;
  done?: boolean;
  patches: {
    path: string;
    action: PatchMessageContentActionType;
    value: any;
  }[];
}

interface IWorkflowGroupMessageContent extends IMessageContent {
  type: MessageTypeKeys;
  done?: boolean;
  groups: IWorkflowGroup[];
}

// 每个消息类型对应的处理chatInput具体实现不同
export {
  IPatchMessageContent,
  IProcessMessageContent,
  ITextMessageContent,
  IWorkflowGroupMessageContent,
};
