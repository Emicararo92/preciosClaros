import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorModule } from './calculator/calculator.module';
import { InflationModule } from './inflation/inflation.module';

@Module({
  imports: [CalculatorModule, InflationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
