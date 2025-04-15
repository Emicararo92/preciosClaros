import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { InflationModule } from '../inflation/inflation.module'; // Importar InflationModule

@Module({
  imports: [InflationModule], // Agregar InflationModule en el array de imports
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
