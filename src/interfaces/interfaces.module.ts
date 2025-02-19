import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [GraphqlModule, WebhookModule],
})
export class InterfacesModule {}
