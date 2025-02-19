import { MessageSentEvent } from '#application/events/impl/message-sent.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'bson';
import { assign } from 'lodash';
import { ConversationStatus } from '../types/conversation.enums';
import { IConversation } from '../types/conversation.interface';
import { MessageRoleType, MessageTypeKeys } from '../types/message.enums';
import { IMessageContentMap } from '../types/message.interface';
import { IWorkflowGroup } from '../types/workflow.interface';
import { Message } from './message.entity';

export class Conversation extends AggregateRoot implements IConversation {
  constructor(
    readonly id: string,
    readonly status: ConversationStatus,
    readonly title: string | null,
    readonly users: string[],
    readonly agentId: string,
    readonly createdAt: Date,
    readonly messages: string[] = [],
    readonly candidateWorkflows: IWorkflowGroup[] = [],
    readonly currentWorkflow: IWorkflowGroup | null = null,
    readonly threadId: string | null = null,
    readonly metadata: JSON | null = null,
    readonly updatedAt: Date | null = null,
    readonly deletedAt: Date | null = null
  ) {
    super();
  }

  static create(data: {
    title: string;
    users: string[];
    agentId: string;
  }): Conversation {
    const conversation = new Conversation(
      new ObjectId().toHexString(),
      ConversationStatus.CHAT,
      data.title,
      data.users,
      data.agentId,
      new Date()
    );

    return conversation;
  }

  static fromModel(
    model: IConversation & { messages: string[] }
  ): Conversation {
    return new Conversation(
      model.id,
      model.status,
      model.title,
      model.users,
      model.agentId,
      model.createdAt,
      model.messages,
      model.candidateWorkflows,
      model.currentWorkflow,
      model.threadId,
      model.metadata,
      model.updatedAt,
      model.deletedAt
    );
  }

  modify(data: Partial<IConversation>) {
    const allowedFields: (keyof IConversation)[] = [
      'title',
      'candidateWorkflows',
      'metadata',
    ];

    // 筛选出合法字段的更新数据
    const validUpdateData = Object.keys(data)
      .filter(
        (key) =>
          allowedFields.includes(key as keyof IConversation) &&
          data[key] !== undefined
      )
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {} as Partial<IConversation>);

    // 使用lodash的assign方法合并更新数据
    assign(this, validUpdateData);
  }

  sendMessage<T extends MessageTypeKeys>(
    message: Message<T>,
    save: boolean = false
  ) {
    this.apply(new MessageSentEvent(message, save));
  }

  createSystemMessage<T extends MessageTypeKeys, C = IMessageContentMap[T]>(
    type: T,
    content: Omit<C, 'type'>,
    messageId?: string
  ): Message<T, C> {
    return Message.create({
      conversationId: this.id,
      role: MessageRoleType.SYSTEM,
      type,
      content: { ...content, type } as C,
      messageId,
    });
  }

  chooseWorkflow(index: number) {
    if (
      !this.candidateWorkflows ||
      this.candidateWorkflows.length > index ||
      this.status !== ConversationStatus.CHAT
    ) {
      throw new Error();
    }

    this.modify({ currentWorkflow: this.candidateWorkflows[index - 1] });
    assign(this, { status: ConversationStatus.HINT });
  }
}
