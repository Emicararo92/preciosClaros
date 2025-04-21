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
    adjustedInstallments.push(adjustedInstallmentPrice);
    totalInstallmentsAdjusted += adjustedInstallmentPrice;
  }

  
  const projectedPrice =
    totalCashPrice * Math.pow(1 + inflationRate / 100, installments);

  return {
    finalCashPrice,
    totalInstallmentsPrice: totalInstallmentsAdjusted,
    projectedPrice,
    adjustedInstallments,
  };
};


export const calculateRecommendation = (
  finalCashPrice: number, 
  totalInstallmentsPrice: number,
  projectedPrice: number
): string => {
  
  if (finalCashPrice < totalInstallmentsPrice) {
    return `Te conviene pagar de contado, ya que el precio de contado ($${finalCashPrice}) es más barato que el precio total en cuotas ajustado por inflación ($${totalInstallmentsPrice}).`;
  }

  
  if (totalInstallmentsPrice < finalCashPrice) {
    return `Te conviene pagar en cuotas, ya que el costo total en cuotas ajustadas ($${totalInstallmentsPrice}) es más barato que el precio de contado ($${finalCashPrice}).`;
  }

  
  return `El precio de contado es similar al precio total en cuotas ajustado por inflación, pero te recomendamos pagar de contado para evitar futuros aumentos.`;
};
