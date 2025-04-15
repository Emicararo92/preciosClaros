/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { InflationService } from '../inflation/inflation.service';

interface CalculatorResponse {
  price: number;
  totalPaidInInstallments: number;
  difference: number;
  message: string;
  recommendation: string;
}
@Controller('calculator')
export class CalculatorController {
  constructor(
    private readonly calculatorService: CalculatorService,
    private readonly inflationService: InflationService,
  ) {}

  @Post('calculate')
  async calculate(
    @Body() data: { price: number; installments: number; monthlyQuota: number },
  ): Promise<CalculatorResponse | { message: string }> {
    try {
      // Obtenemos la tasa de inflación (fija 3%)
      const inflationData = await this.inflationService.getInflation();

      // Si la tasa de inflación es válida, seguimos con el cálculo
      if (typeof inflationData === 'string') {
        return { message: inflationData }; // Devolvemos mensaje de error si no pudimos obtener la inflación
      }

      const inflationRate = parseFloat(inflationData.message); // Aquí accedemos a `message` para obtener la tasa de inflación como un número

      // Ahora pasamos la tasa de inflación al servicio de cálculo
      const result = await this.calculatorService.calculateBestOption(
        data.price,
        data.installments,
        data.monthlyQuota,
        inflationRate,
      );

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { message: error.message };
      }
      return { message: 'Unknown error occurred' };
    }
  }
}
