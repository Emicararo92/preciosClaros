"use client";

import React, { useState } from "react";
import styles from "../../styles/miniCalcu.module.css";

const MiniInstallmentCalculator: React.FC<{
  setTotalInstallmentsPrice: React.Dispatch<React.SetStateAction<number>>;
  setInstallments: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setTotalInstallmentsPrice, setInstallments }) => {
  const [installmentValue, setInstallmentValue] = useState<number>(0);
  const [installmentCount, setInstallmentCount] = useState<number>(2);
  const [calculatedTotal, setCalculatedTotal] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);

  const handleCalculate = () => {
    const total = installmentValue * installmentCount;
    setCalculatedTotal(total);
    setTotalInstallmentsPrice(total); // Actualiza el input principal
    setInstallments(installmentCount); // Sincroniza la selección de cuotas en el formulario principal
  };

  return (
    <div className={styles.miniCalcWrapper}>
      <button
        type="button"
        onClick={() => setShowCalculator(!showCalculator)}
        className={styles.toggleCalcButton}
      >
        {showCalculator
          ? "Ocultar calculadora"
          : "¿No sabés el valor final en cuotas? Calculalo aquí"}
      </button>

      {showCalculator && (
        <div className={styles.miniCalcContainer}>
          <h4>Calculadora de Cuotas</h4>
          <div>
            <label>Valor de cada cuota ($):</label>
            <input
              type="number"
              value={installmentValue || ""}
              placeholder="Ej: 500"
              onChange={(e) => setInstallmentValue(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Cantidad de cuotas:</label>
            <select
              value={installmentCount}
              onChange={(e) => setInstallmentCount(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
              <option value={32}>32</option>
              <option value={36}>36</option>
              <option value={42}>42</option>
              <option value={48}>48</option>
              <option value={60}>60</option>
            </select>
          </div>
          <button type="button" onClick={handleCalculate}>
            Calcular Total
          </button>

          {calculatedTotal !== null && (
            <p>Total en cuotas: ${calculatedTotal}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniInstallmentCalculator;
