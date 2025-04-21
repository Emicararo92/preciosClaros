export interface InflationData {
  current: number;
  pastInflations: number[];
}

export interface PricingDetails {
  finalCashPrice: number;
  totalInstallmentsPrice: number;
  projectedPrice: number;
  adjustedInstallments: number[];
}

export const calculatePricing = (
  totalCashPrice: number,
  totalInstallmentsPrice: number,
  installments: number,
  inflationRate: number
): PricingDetails => {
  const finalCashPrice = totalCashPrice;
  const totalInstallmentsPriceAdjusted = totalInstallmentsPrice;

  let adjustedInstallmentPrice = totalInstallmentsPriceAdjusted / installments;
  let totalInstallmentsAdjusted = 0;
  const adjustedInstallments = [];

  for (let i = 0; i < installments; i++) {
    adjustedInstallmentPrice /= 1 + inflationRate / 100;
    adjustedInstallments.push(parseFloat(adjustedInstallmentPrice.toFixed(2)));
    totalInstallmentsAdjusted += adjustedInstallmentPrice;
  }

  const projectedPrice =
    totalCashPrice * Math.pow(1 + inflationRate / 100, installments);
  const totalInstallmentsPriceRounded = parseFloat(
    totalInstallmentsAdjusted.toFixed(2)
  );
  const projectedPriceRounded = parseFloat(projectedPrice.toFixed(2));

  return {
    finalCashPrice: parseFloat(finalCashPrice.toFixed(2)),
    totalInstallmentsPrice: totalInstallmentsPriceRounded,
    projectedPrice: projectedPriceRounded,
    adjustedInstallments,
  };
};
export const calculateRecommendation = (
  finalCashPrice: number,
  totalInstallmentsPrice: number
): { recommendation: string; difference: number } => {
  let recommendation = "";
  const difference = Math.abs(finalCashPrice - totalInstallmentsPrice);
  const percentage = ((difference / finalCashPrice) * 100).toFixed(2);

  if (finalCashPrice < totalInstallmentsPrice) {
    if (parseFloat(percentage) > 5) {
      recommendation = `💸 Te conviene pagar de contado: el precio es $${finalCashPrice} y en cuotas ajustadas pagarías $${totalInstallmentsPrice}. Te estarías ahorrando $${difference.toFixed(
        2
      )}, es decir un ${percentage}% — ¡una diferencia considerable!`;
    } else {
      recommendation = `💡 Pagar de contado ($${finalCashPrice}) es apenas más barato que en cuotas ajustadas ($${totalInstallmentsPrice}). Ahorrarías $${difference.toFixed(
        2
      )}, que representa un ${percentage}% — quizás no sea tanto, especialmente si la inflación sigue subiendo.`;
    }
  } else if (totalInstallmentsPrice < finalCashPrice) {
    recommendation = `💳 Las cuotas ajustadas ($${totalInstallmentsPrice}) son más convenientes que pagar de contado ($${finalCashPrice}). Ahorrarías $${difference.toFixed(
      2
    )}, lo que equivale a un ${percentage}%.`;
  } else {
    recommendation = `🔍 Ambos precios son casi iguales, la diferencia es mínima. Podrías elegir según tu comodidad, aunque en contextos inflacionarios pagar de contado suele ser más seguro.`;
  }

  return { recommendation, difference };
};
