import { MessageRoleType, MessageTypeKeys } from '#domain/types/message.enums';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';
import {
  MessageContentMap,
  MessageContentUnion,
} from './message-content-union';

@ObjectType()
export class Message<
  T extends MessageTypeKeys,
  // 如果有遗漏，TS 会报错
  C = (typeof MessageContentMap)[T],
> {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  conversationId!: string;

  @Field(() => MessageRoleType)
  role!: MessageRoleType;

  @Field(() => String, { description: '创建者ID', nullable: true })
  userId?: string | null;

  @Field(() => String, { description: '创建者(未登录用户)ID', nullable: true })
  visitorId?: string | null;

  @Field(() => MessageTypeKeys, { description: '消息类型' })
  type!: T;

  @Field(() => MessageContentUnion, { description: '消息内容', nullable: true })
  content!: C;

  @Field(() => GraphQLJSON, { description: '消息元数据', nullable: true })
  metadata?: any;

  @Field(() => Date, { description: '创建时间' })
  createdAt!: Date;

  @Field(() => Date, { description: '更新时间', nullable: true })
  updatedAt?: Date;
}
