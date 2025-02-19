import { Message } from '#domain/entities/message.entity';
import { IMessageRepository } from '#domain/repositories/message.repository';
import { MessageTypeKeys } from '#domain/types/message.enums';
import { IMessage } from '#domain/types/message.interface';
import { PrismaService } from '#infrastructure/external-services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagePrismaRepo implements IMessageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save<T extends MessageTypeKeys>(
    message: IMessage<T>
  ): Promise<Message<T>> {
    const result = await this.prismaService.message.upsert({
      where: {
        id: message.id,
      },
      update: {
        content: message.content as any,
        type: message.type,
        conversationId: message.conversationId,
        metadata: message.metadata,
        createdAt: message.createdAt,
      },
      create: {
        id: message.id,
        role: message.role,
        content: message.content as any,
        type: message.type,
        conversationId: message.conversationId,
        metadata: message.metadata,
        createdAt: message.createdAt,
      },
    });

    return Message.fromModel<T>({
      ...result,
      content: result.content as any,
      role: result.role as any,
      type: result.type as any,
      updatedAt: result.updatedAt ?? undefined,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: string, _permanent?: boolean): Promise<void> {
    await this.prismaService.message.delete({
      where: {
        id,
      },
    });
  }
}
