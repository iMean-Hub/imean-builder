/** 流程执行状态 */
export enum ProcessStatusEnum {
  /** 规划中 */
  Planning = 'Planning',
  /** 等待中 */
  Waiting = 'Waiting',
  /** 队列中 */
  Queueing = 'Queueing',
  /** 执行中 */
  Executing = 'Executing',
  /** 失败 */
  Failed = 'Failed',
  /** 完成 */
  Completed = 'Complete',
  /** 暂停 */
  Pause = 'Pause',
  /** 取消 */
  Discard = 'Discard',
  /** 超时 */
  TimeOut = 'TimeOut',
}

/** Path消息内容操作类型 */
export enum PatchMessageContentActionType {
  /** 追加 */
  APPEND = 'APPEND',
  /** 替换 */
  REPLACE = 'REPLACE',
}

/** 消息创建者角色类型 */
export enum MessageRoleType {
  /** 系统 */
  SYSTEM = 'SYSTEM',
  /** 用户 */
  USER = 'USER',
}

export enum MessageTypeKeys {
  PATCH = 'patch',
  TEXT = 'text',
  PROCESS = 'process',
  WORKFLOW_GROUP = 'workflowGroup',
}
