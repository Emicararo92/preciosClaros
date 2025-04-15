"use client";
import { useState } from "react";
import CalculatorForm, { CalculatorData } from "../form/CalculatorForm";
import styles from "../../styles/calculator.module.css";

const ParentComponent = () => {
  const [result, setResult] = useState<any>(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const handleCalculate = async (data: CalculatorData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/calculator/calculate`, // Usar la variable de entorno
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setResult(result);
      setShowModal(true); // Mostrar el modal con el resultado
    } catch (error) {
      console.error("Error en el cálculo:", error);
      setResult({
        message: "Error al procesar la solicitud.",
        recommendation: "Intenta nuevamente más tarde.",
        status: "error",
      });
      setShowModal(true); // Mostrar el modal también en caso de error
    }
  };

  // Función para resetear el formulario
  const handleReset = () => {
    setResult(null);
    setShowModal(false); // Cerrar el modal al resetear
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h3>¡Bienvenido a PreciosClaros!</h3>
        <p>
          Calcula fácilmente el mejor precio para ti. ¡Aprovecha nuestras
          recomendaciones personalizadas!
        </p>
      </div>

      <h2 className={styles.title}>Calculadora de Compra</h2>
      <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} />

      {/* Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Resultado</h2>
            <div
              className={`${styles.result} ${
                result.status === "error"
                  ? styles.error
                  : result.recommendation?.includes("contado")
                  ? styles.success
                  : styles.warning
              }`}
            >
              <p>
                <strong>Resultado:</strong> {result.message}
              </p>
              <p>
                <strong>Recomendación:</strong> {result.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
