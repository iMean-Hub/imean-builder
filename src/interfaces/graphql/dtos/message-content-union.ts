import {
  IMessageContent,
  IPatchMessageContent,
  IProcessMessageContent,
  ITextMessageContent,
  IWorkflowGroupMessageContent,
} from '#domain/types/message-content.interface';
import {
  MessageTypeKeys,
  PatchMessageContentActionType,
  ProcessStatusEnum,
} from '#domain/types/message.enums';
import { IWorkflowGroup } from '#domain/types/workflow.interface';
import {
  createUnionType,
  Field,
  InterfaceType,
  ObjectType,
} from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InterfaceType()
export abstract class IContent extends IMessageContent {
  @Field(() => MessageTypeKeys, { description: '消息类型' })
  abstract type: MessageTypeKeys;

  @Field(() => Boolean, {
    nullable: true,
    defaultValue: true,
    description: '是否已经处理',
  })
  abstract done?: boolean;
}

@ObjectType()
class TextMessageContent extends IContent implements ITextMessageContent {
  type!: MessageTypeKeys;
  done?: boolean;

  @Field(() => String)
  text!: string;
}

@ObjectType()
class ProcessMessageContent extends IContent implements IProcessMessageContent {
  type!: MessageTypeKeys;
  done?: boolean;

  @Field(() => String)
  processId!: string;

  @Field(() => String)
  workflowId!: string;

  @Field(() => ProcessStatusEnum)
  status!: ProcessStatusEnum;

  /** 点赞 */
  @Field(() => Boolean, { nullable: true })
  thumbsUp?: boolean;

  /** 点踩 */
  @Field(() => Boolean, { nullable: true })
  thumbsDown?: boolean;
}

@ObjectType({ description: '消息补丁' })
class PatchItem {
  @Field(() => String)
  path!: string;

  @Field(() => PatchMessageContentActionType)
  action!: PatchMessageContentActionType;

  @Field(() => GraphQLJSON)
  value!: any;
}

@ObjectType({ description: '该消息类型用于给指定消息打补丁' })
class PatchMessageContent extends IContent implements IPatchMessageContent {
  type!: MessageTypeKeys;
  done?: boolean;

  @Field(() => [PatchItem])
  patches!: PatchItem[];
}

@ObjectType()
class WorkflowGroup implements IWorkflowGroup {
  @Field(() => String)
  title!: string;

  @Field(() => [String])
  workflows!: string[];
}

@ObjectType()
class WorkflowGroupMessageContent
  extends IContent
  implements IWorkflowGroupMessageContent
{
  type!: MessageTypeKeys;
  done?: boolean | undefined;

  @Field(() => [WorkflowGroup])
  groups!: WorkflowGroup[];
}

export const MessageContentMap = {
  [MessageTypeKeys.PATCH]: PatchMessageContent,
  [MessageTypeKeys.TEXT]: TextMessageContent,
  [MessageTypeKeys.PROCESS]: ProcessMessageContent,
  [MessageTypeKeys.WORKFLOW_GROUP]: WorkflowGroupMessageContent,
};

export const MessageContentUnion = createUnionType({
  name: 'MessageContentUnion',
  types: () => Object.values(MessageContentMap),
  resolveType: (value) => {
    // 自动推导出对应类型
    return MessageContentMap[value.type as MessageTypeKeys] || null;
  },
});
// 每个消息类型对应的处理chatInput具体实现不同
export {
  PatchMessageContent,
  ProcessMessageContent,
  TextMessageContent,
  WorkflowGroupMessageContent,
};
