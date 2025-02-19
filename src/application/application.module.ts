import { InfrastructureModule } from '#infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { IntentAnalyzerService } from './services/intent-analyzer.service';
import { SearchService } from './services/search.service';

@Module({
  imports: [InfrastructureModule],
  providers: [IntentAnalyzerService, SearchService],
})
export class ApplicationModule {}
