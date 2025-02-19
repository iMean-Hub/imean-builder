import { ConversationStatus } from '#domain/types/conversation.enums';
import { IConversation } from '#domain/types/conversation.interface';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  agentId!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: JSON | null;
}

@InputType()
export class ModifyConversationInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: JSON | null;
}

@ObjectType()
export class ConversationModel implements IConversation {
  @Field(() => ID)
  id!: string;

  @Field(() => ConversationStatus)
  status!: ConversationStatus;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => [String])
  users!: string[];

  @Field(() => String)
  threadId!: string;

  @Field(() => String)
  agentId!: string;

  @Field(() => String, { nullable: true })
  metadata!: JSON | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date | null;

  messages!: string[];

  deletedAt!: Date | null;
}
