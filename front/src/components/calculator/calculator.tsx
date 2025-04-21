"use client";

import React, { useState } from "react";
import CalculatorForm from "../calcuForm/calcuForm";
import Recommendation from "../recomendation/recomendation";
import styles from "../../styles/calculator.module.css";
import {
  calculatePricing,
  calculateRecommendation,
} from "@/utils/inflationData";
import Image from "next/image";
import logo from "../../../public/logo.png";
import MiniInstallmentCalculator from "../miniCalcu/miniCalcu";

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
  const [difference, setDifference] = useState<number>(0);
  const [showInstallments, setShowInstallments] = useState<boolean>(false);

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

    const { recommendation, difference } = calculateRecommendation(
      finalCashPrice,
      adjustedTotal
    );
    setRecommendation(recommendation);
    setDifference(difference);
  };

  const handleReset = () => {
    setTotalCashPrice(0);
    setTotalInstallmentsPrice(0);
    setInstallments(1);
    setFinalPrice(0);
    setTotalInstallmentsAdjustedPrice(0);
    setProjectedPrice(0);
    setAdjustedInstallments([]);
    setRecommendation("");
    setDifference(0);
  };

  return (
    <div className="flex justify-center">
      <div className={styles.container}>
        <Image src={logo} alt="logo" width={145} height={175} />
        <h2>De contado o en cuotas, ¿qué te conviene?</h2>

        <CalculatorForm
          onCalculate={handleCalculation}
          totalCashPrice={totalCashPrice}
          setTotalCashPrice={setTotalCashPrice}
          totalInstallmentsPrice={totalInstallmentsPrice}
          setTotalInstallmentsPrice={setTotalInstallmentsPrice}
          installments={installments}
          setInstallments={setInstallments}
        />

        <MiniInstallmentCalculator
          setTotalInstallmentsPrice={setTotalInstallmentsPrice}
          setInstallments={setInstallments}
        />

        {finalPrice > 0 && <p>Precio de contado: ${finalPrice}</p>}

        {totalInstallmentsAdjustedPrice > 0 && (
          <p>
            Precio total en cuotas ajustadas por inflación: $
            {totalInstallmentsAdjustedPrice.toFixed(2)}
          </p>
        )}

        {projectedPrice > 0 && (
          <p>Precio proyectado con inflación: ${projectedPrice.toFixed(2)}</p>
        )}

        <div>
          <h3>Cuotas ajustadas por la inflación acumulada:</h3>
          <button onClick={() => setShowInstallments(!showInstallments)}>
            {showInstallments ? "Ocultar cuotas" : "Ver cuotas"}
          </button>

          {showInstallments && (
            <ul>
              {adjustedInstallments.length > 0 ? (
                adjustedInstallments.map((installment, index) => (
                  <li key={index}>
                    Cuota #{index + 1}: ${installment.toFixed(2)}
                  </li>
                ))
              ) : (
                <p>No se han calculado cuotas aún.</p>
              )}
            </ul>
          )}
        </div>

        {recommendation && (
          <div className={styles.recommendationBox}>
            <Recommendation recommendation={recommendation} />
            {difference > 0 && (
              <p style={{ marginTop: "8px" }}>
                {finalPrice < totalInstallmentsAdjustedPrice
                  ? `✅ Te estarías ahorrando $${difference.toFixed(
                      2
                    )} si pagás de contado.`
                  : `💡 Te estarías ahorrando $${difference.toFixed(
                      2
                    )} si elegís pagar en cuotas.`}
              </p>
            )}
          </div>
        )}

        <div>
          <p>¿Puedo ayudarte en algo más?</p>
          <button onClick={handleReset} className={styles.resetButton}>
            Resetear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calcu;
