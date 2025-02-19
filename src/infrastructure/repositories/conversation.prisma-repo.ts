import { Conversation } from '#domain/entities/conversation.entity';
import { IConversationRepository } from '#domain/repositories/conversation.repository';
import { ConversationStatus } from '#domain/types/conversation.enums';
import { PrismaService } from '#infrastructure/external-services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConversationPrismaRepo implements IConversationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async save(conversation: Conversation): Promise<Conversation> {
    const result = await this.prismaService.conversation.upsert({
      where: {
        id: conversation.id,
      },
      update: {
        title: conversation.title ?? undefined,
        users: conversation.users,
        agentId: conversation.agentId,
        status: conversation.status,
        deletedAt: conversation.deletedAt,
      },
      create: {
        id: conversation.id,
        users: conversation.users,
        agentId: conversation.agentId,
        status: conversation.status,
        deletedAt: conversation.deletedAt,
        ...(conversation.title ? { title: conversation.title } : {}),
      },
    });

    return Conversation.fromModel({
      ...result,
      status: result.status as ConversationStatus,
      metadata: result.metadata as unknown as JSON,
      messages: [],
    });
  }

  async remove(id: string, permanent?: boolean): Promise<void> {
    if (permanent) {
      await this.prismaService.conversation.delete({
        where: {
          id,
        },
      });
    } else {
      await this.prismaService.conversation.update({
        where: {
          id,
        },
        data: {
          status: 'DELETED',
          deletedAt: new Date(),
        },
      });
    }
  }

  // TODO 过滤已删除的会话
  async findById(id: string): Promise<Conversation | null> {
    const result = await this.prismaService.conversation.findUnique({
      where: {
        id,
        // deletedAt: null,
      },
      include: {
        messages: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!result) return null;

    return Conversation.fromModel({
      ...result,
      status: result.status as ConversationStatus,
      metadata: result.metadata as unknown as JSON,
      messages: result.messages.map((message) => message.id),
    });
  }

  async findAll(): Promise<Conversation[]> {
    const result = await this.prismaService.conversation.findMany();

    return result.map((conversation) =>
      Conversation.fromModel({
        ...conversation,
        status: conversation.status as ConversationStatus,
        metadata: conversation.metadata as unknown as JSON,
        messages: [],
      })
    );
  }
}
