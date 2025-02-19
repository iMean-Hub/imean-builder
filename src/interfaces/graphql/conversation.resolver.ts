import { ChatInputCommand } from '#application/commands/impl/chat-input.command';
import { CreateConversationCommand } from '#application/commands/impl/create-conversation.command';
import { ModifyConversationCommand } from '#application/commands/impl/modify-conversation.command';
import { RemoveConversationCommand } from '#application/commands/impl/remove-conversation.command';
import { GetConversationQuery } from '#application/queries/impl/get-conversation.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import {
  ConversationModel,
  CreateConversationInput,
  ModifyConversationInput,
} from './dtos/conversation.dto';

@Resolver(ConversationModel)
export class ConversationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Mutation(() => ConversationModel)
  async createConversation(
    @Args('input') input: CreateConversationInput,
    // TODO 使用中间件获取当前用户
    @Args('user') creatorId: string
  ): Promise<ConversationModel> {
    return this.commandBus.execute(
      new CreateConversationCommand(input, [creatorId])
    );
  }

  @Mutation(() => Boolean)
  async removeConversation(
    @Args('id') id: string,
    // TODO 使用中间件获取当前用户
    @Args('user') userId: string,
    @Args('permanent', { nullable: true }) permanent?: boolean
  ) {
    return await this.commandBus.execute(
      new RemoveConversationCommand(id, userId, permanent)
    );
  }

  @Mutation(() => ConversationModel)
  async modifyConversation(
    @Args('input') input: ModifyConversationInput,
    // TODO 使用中间件获取当前用户
    @Args('user') userId: string
  ) {
    return await this.commandBus.execute(
      new ModifyConversationCommand(input, userId)
    );
  }

  @Query(() => ConversationModel)
  async conversation(@Args('id') id: string) {
    return await this.queryBus.execute<GetConversationQuery, ConversationModel>(
      new GetConversationQuery(id)
    );
  }

  async conversations() {}

  @Mutation(() => Boolean, { description: '对话', nullable: true })
  async chatInput(
    @Args('conversationId') conversationId: string,
    @Args('user') userId: string,
    @Args('content') content: string
  ) {
    await this.commandBus.execute(
      new ChatInputCommand(conversationId, userId, content)
    );

    return true;
  }

  @ResolveField(() => Number)
  async scheduleTaskCount(@Root() conversation: ConversationModel) {
    // TODO
    return conversation.id.length;
  }
}
