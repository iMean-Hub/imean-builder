import { IConversationRepository } from '#domain/repositories/conversation.repository';
import { IMessageRepository } from '#domain/repositories/message.repository';
import { PrismaService } from '#infrastructure/external-services/prisma.service';
import { Module } from '@nestjs/common';
import { AiConnectorService } from './external-services/ai-connector.service';
import { MqttService } from './external-services/mqtt.service';
import { ConversationPrismaRepo } from './repositories/conversation.prisma-repo';
import { MessagePrismaRepo } from './repositories/message.prisma-repo';

const externalServices = [AiConnectorService];

@Module({
  providers: [
    PrismaService,
    {
      provide: IConversationRepository,
      useClass: ConversationPrismaRepo,
    },
    {
      provide: IMessageRepository,
      useClass: MessagePrismaRepo,
    },
    ...externalServices,
    MqttService,
  ],
  exports: [IConversationRepository, IMessageRepository, ...externalServices],
})
export class InfrastructureModule {}
