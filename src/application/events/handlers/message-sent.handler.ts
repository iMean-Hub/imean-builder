import { IMessageRepository } from '#domain/repositories/message.repository';
import { MessageRoleType, MessageTypeKeys } from '#domain/types/message.enums';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MessageSentEvent } from '../impl/message-sent.event';

@EventsHandler(MessageSentEvent)
export class MessageSentHandler<T extends MessageTypeKeys>
  implements IEventHandler<MessageSentEvent<T>>
{
  constructor(private readonly messageRepository: IMessageRepository) {}

  handle(event: MessageSentEvent<T>) {
    const { message, save } = event;

    // TODO pubSub.publish('conversation', this.conversationId, message);

    if (save) {
      this.messageRepository.save(message);
    }

    // TODO 最简与或表达式 !A && !(B && C && !D)
    if (
      message.type !== MessageTypeKeys.PATCH &&
      !(
        message.type === 'text' &&
        message.role === MessageRoleType.SYSTEM &&
        !message.content.done
      )
    ) {
      // TODO bizLogger
      // this.conversationLogger.info(
      //   message.role === MessageRoleType.USER ? '_sendMessage' : 'replyMessage',
      //   {
      //     type: message.type,
      //     content: message.content,
      //   }
      // );
    }
  }
}
