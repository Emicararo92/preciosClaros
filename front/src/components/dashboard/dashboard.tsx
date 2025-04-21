import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "../../styles/dashboard.module.css";

interface DashboardProps {
  cuotasAjustadas: number[];
  cuotasOriginales: number[];
  priceContado: number;
  priceEnCuotas: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  cuotasAjustadas,
  cuotasOriginales,
  priceContado,
  priceEnCuotas,
}) => {
  const cuotasData = cuotasAjustadas.map((value, index) => ({
    name: `Mes ${index + 1}`,
    cuotaAjustada: value,
    cuotaOriginal: cuotasOriginales[index],
  }));

  return (
    <div className={styles.dashboardContainer}>
      <h2>Panel de Comparación de Pagos</h2>
      <div className={styles.priceSummary}>
        <p>
          Precio de contado: <strong>${priceContado}</strong>
        </p>
        <p>
          Precio total en cuotas: <strong>${priceEnCuotas}</strong>
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cuotasData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cuotaAjustada"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="cuotaOriginal" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
