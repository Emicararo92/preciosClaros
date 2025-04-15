import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculateBestOption(
    price: number,
    installments: number,
    monthlyQuota: number,
    inflationRate: number,
  ): { message: string; recommendation: string } {
    const totalInInstallments = installments * monthlyQuota;

    // Asegurarse de que la tasa de inflación esté en un rango razonable
    if (inflationRate > 1 || inflationRate < 0) {
      return {
        message: `Error: La tasa de inflación no es válida. Valor recibido: ${inflationRate}`,
        recommendation:
          'La inflación recibida no es válida. Por favor, revisa los datos.',
      };
    }

    const priceAdjustedForInflation =
      price * Math.pow(1 + inflationRate, installments);

    let recommendation = '';

    if (priceAdjustedForInflation > totalInInstallments) {
      recommendation = `Te conviene pagar en cuotas porque, al finalizar el pago, el precio de contado será más caro debido a la inflación. El precio ajustado por inflación sería ${priceAdjustedForInflation.toFixed(2)}.`;
    } else {
      recommendation = `Te conviene pagar de contado porque el precio total en cuotas será igual o más caro que el precio de contado ajustado por la inflación. El precio ajustado por inflación sería ${priceAdjustedForInflation.toFixed(2)}.`;
    }

    return {
      message: `El precio de contado es ${price}, el precio total en cuotas es ${totalInInstallments.toFixed(2)}.`,
      recommendation,
    };
  }
}
