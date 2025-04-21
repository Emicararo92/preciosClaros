import React from "react";
import styles from "../../styles/form.module.css";

interface CalculatorFormProps {
  onCalculate: (
    totalCashPrice: number,
    totalInstallmentsPrice: number,
    installments: number
  ) => void;
  totalCashPrice: number;
  setTotalCashPrice: React.Dispatch<React.SetStateAction<number>>;
  totalInstallmentsPrice: number;
  setTotalInstallmentsPrice: React.Dispatch<React.SetStateAction<number>>;
  installments: number;
  setInstallments: React.Dispatch<React.SetStateAction<number>>;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onCalculate,
  totalCashPrice,
  setTotalCashPrice,
  totalInstallmentsPrice,
  setTotalInstallmentsPrice,
  installments,
  setInstallments,
}) => {
  const handleReset = () => {
    setTotalCashPrice(0);
    setTotalInstallmentsPrice(0);
    setInstallments(1);
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        onCalculate(totalCashPrice, totalInstallmentsPrice, installments);
      }}
    >
      <div>
        <label>Precio de contado ($):</label>
        <input
          type="number"
          value={totalCashPrice || ""}
          placeholder="Ej: 5000"
          onChange={(e) => setTotalCashPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Precio total en cuotas ($):</label>
        <input
          type="number"
          value={totalInstallmentsPrice || ""}
          placeholder="Ej: 6000"
          onChange={(e) => setTotalInstallmentsPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Cantidad de cuotas:</label>
        <select
          value={installments}
          onChange={(e) => setInstallments(Number(e.target.value))}
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
      <button type="submit">Calcular</button>
    </form>
  );
};

export default CalculatorForm;
