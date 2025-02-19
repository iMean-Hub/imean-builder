import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import DataLoader from 'dataloader';
import { Connection } from 'mongoose';

@Injectable()
export class ScheduleTaskLoader {
  private readonly loader: DataLoader<string, number>;

  constructor(@InjectConnection() private connection: Connection) {
    this.loader = new DataLoader(async (conversationIds: readonly string[]) => {
      const result = await this.connection?.db
        ?.collection('schedule-tasks')
        .aggregate([
          { $match: { conversationId: { $in: conversationIds } } },
          { $group: { _id: '$conversationId', count: { $sum: 1 } } },
        ])
        .toArray();

      return result?.map((item) => item[0]?.count || 0) ?? [];
    });
  }

  load(conversationId: string): Promise<number> {
    return this.loader.load(conversationId);
  }
}
