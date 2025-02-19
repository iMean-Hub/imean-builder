import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { Message } from './dtos/message.dto';

@Resolver(Message)
export class MessageResolver {
  @Query(() => Message)
  getHello(): string {
    return 'Hello, world!';
  }

  @Subscription(() => Message)
  async messages() {}
}
