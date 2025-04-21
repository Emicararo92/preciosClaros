import React from "react";
import styles from "../../styles/recomendatio.module.css";

interface RecommendationProps {
  recommendation: string;
}

const Recommendation: React.FC<RecommendationProps> = ({ recommendation }) => {
  return <div className={styles.recommendation}>{recommendation}</div>;
};

export default Recommendation;
