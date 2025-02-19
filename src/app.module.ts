import { ApplicationModule } from '#application/application.module';
import { InterfacesModule } from '#interfaces/interfaces.module';
import { RabbitmqModule } from '#shared/rabbitmq/rabbitmq.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
// import { LoggingModule } from './core/logging/logging.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/nest',
      }),
    }),
    RabbitmqModule,
    ApplicationModule,
    InterfacesModule,
    // LoggingModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
