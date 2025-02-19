import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import './dtos/message-content-union';
import './dtos/message-enums';
import './dtos/message.dto';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [ConversationResolver, MessageResolver],
})
export class GraphqlModule {}
