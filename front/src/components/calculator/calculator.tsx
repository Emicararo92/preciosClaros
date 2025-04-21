"use client";

import { useState } from "react";
import CalculatorForm from "../calcuForm/calcuForm";
import Recommendation from "../recomendation/recomendation";
import Dashboard from "../dashboard/dashboard"; 
import styles from "../../styles/calculator.module.css";
import {
  calculatePricing,
  calculateRecommendation,
} from "@/utils/inflationData";

const Calcu = () => {
  const [totalCashPrice, setTotalCashPrice] = useState<number>(0);
  const [totalInstallmentsPrice, setTotalInstallmentsPrice] =
    useState<number>(0);
  const [installments, setInstallments] = useState<number>(1);
  const [inflationRate, setInflationRate] = useState<number>(2.7); 
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [totalInstallmentsAdjustedPrice, setTotalInstallmentsAdjustedPrice] =
    useState<number>(0);
  const [projectedPrice, setProjectedPrice] = useState<number>(0);
  const [adjustedInstallments, setAdjustedInstallments] = useState<number[]>(
    []
  );
  const [recommendation, setRecommendation] = useState<string>("");

  const handleCalculation = (
    totalCashPrice: number,
    totalInstallmentsPrice: number,
    installments: number
  ) => {
    const {
      finalCashPrice,
      totalInstallmentsPrice: adjustedTotal,
      projectedPrice,
      adjustedInstallments,
    } = calculatePricing(
      totalCashPrice,
      totalInstallmentsPrice,
      installments,
      inflationRate
    );

    setFinalPrice(finalCashPrice);
    setTotalInstallmentsAdjustedPrice(adjustedTotal);
    setProjectedPrice(projectedPrice);
    setAdjustedInstallments(adjustedInstallments);

    const rec = calculateRecommendation(
      finalCashPrice,
      adjustedTotal,
      projectedPrice
    );
    setRecommendation(rec);
  };

  return (
    <div className={styles.container}>
      <h1>Calculadora de Precios</h1>
      <CalculatorForm
        onCalculate={handleCalculation}
        totalCashPrice={totalCashPrice}
        setTotalCashPrice={setTotalCashPrice}
        totalInstallmentsPrice={totalInstallmentsPrice}
        setTotalInstallmentsPrice={setTotalInstallmentsPrice}
        installments={installments}
        setInstallments={setInstallments}
      />
      {finalPrice && <p>Precio de contado: ${finalPrice}</p>}
      {totalInstallmentsAdjustedPrice && (
        <p>
          Precio total en cuotas ajustadas por inflación: $$
          {totalInstallmentsAdjustedPrice.toFixed(2)}
        </p>
      )}
      {projectedPrice && (
        <p>Precio proyectado (con inflación): ${projectedPrice.toFixed(2)}</p>
      )}

      <div>
        <h3>
          Cuotas ajustadas por la inflación acumulada (desvalorización del
          dinero):
        </h3>
        <ul>
          {adjustedInstallments.map((installment, index) => (
            <li key={index}>
              Cuota #{index + 1}: ${installment.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <Dashboard
        cuotasAjustadas={adjustedInstallments}
        cuotasOriginales={Array(installments).fill(
          totalInstallmentsPrice / installments
        )}
        priceContado={finalPrice}
        priceEnCuotas={projectedPrice}
      />

      {recommendation && <Recommendation recommendation={recommendation} />}
    </div>
  );
};

export default Calcu;
