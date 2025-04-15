import { Module } from '@nestjs/common';
import { InflationService } from './inflation.service';

@Module({
  providers: [InflationService],
  exports: [InflationService],
})
export class InflationModule {}
