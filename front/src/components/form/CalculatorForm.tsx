"use client";

import { useState } from "react";
import styles from "../../styles/calculator.module.css";

export interface CalculatorData {
  price: number;
  installments: number;
  monthlyQuota: number;
}

interface CalculatorFormProps {
  onCalculate: (data: CalculatorData) => void;
  onReset: () => void; // Recibimos la función de reset
}

const CalculatorForm = ({ onCalculate, onReset }: CalculatorFormProps) => {
  const [price, setPrice] = useState<string>("");
  const [installments, setInstallments] = useState<string>("");
  const [monthlyQuota, setMonthlyQuota] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      price: Number(price),
      installments: Number(installments),
      monthlyQuota: Number(monthlyQuota),
    });
  };

  // Función para limpiar los inputs
  const handleReset = () => {
    setPrice("");
    setInstallments("");
    setMonthlyQuota("");
    onReset(); // Llamamos a la función de reset en el ParentComponent
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="price" className={styles.label}>
          Precio de contado
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ej: 50000"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="installments" className={styles.label}>
          Cantidad de cuotas
        </label>
        <input
          type="number"
          id="installments"
          value={installments}
          onChange={(e) => setInstallments(e.target.value)}
          placeholder="Ej: 12"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="monthlyQuota" className={styles.label}>
          Valor de la cuota mensual
        </label>
        <input
          type="number"
          id="monthlyQuota"
          value={monthlyQuota}
          onChange={(e) => setMonthlyQuota(e.target.value)}
          placeholder="Ej: 5200"
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.button}>
        Calcular
      </button>

      {/* Botón de Reset */}
      <button
        type="button"
        className={styles.resetButton}
        onClick={handleReset} // Limpiar los campos cuando se hace clic
      >
        Resetear
      </button>

      {/* Información de Inflación */}
      <div className={styles.inflationInfo}>
        <p>
          <strong>IPC de Inflación (Marzo 2025):</strong> 3.7% mensual (IPC BCRA). Este
          valor se usa como referencia en el cálculo de cuotas 
        </p>
      </div>
    </form>
  );
};

export default CalculatorForm;
