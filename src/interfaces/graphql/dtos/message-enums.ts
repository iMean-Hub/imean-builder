import { ConversationStatus } from '#domain/types/conversation.enums';
import {
  MessageRoleType,
  MessageTypeKeys,
  PatchMessageContentActionType,
  ProcessStatusEnum,
} from '#domain/types/message.enums';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(ProcessStatusEnum, {
  name: 'ProcessStatusEnum',
  description: '流程执行状态',
  valuesMap: {
    Planning: {
      description: '规划中',
    },
    Waiting: {
      description: '等待中',
    },
    Queueing: {
      description: '队列中',
    },
    Executing: {
      description: '执行中',
    },
    Failed: {
      description: '失败',
    },
    Completed: {
      description: '完成',
    },
    Pause: {
      description: '暂停',
    },
    Discard: {
      description: '取消',
    },
    TimeOut: {
      description: '超时',
    },
  },
});

registerEnumType(PatchMessageContentActionType, {
  name: 'PatchMessageContentActionType',
});

registerEnumType(MessageRoleType, { name: 'MessageRoleType' });

registerEnumType(MessageTypeKeys, { name: 'MessageTypeKeys' });

registerEnumType(ConversationStatus, { name: 'ConversationStatus' });
