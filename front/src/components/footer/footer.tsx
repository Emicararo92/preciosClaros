import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Emiliano Cararo</h2>
      <p>Desarrollador Frontend | Programador | Diseñador Web</p>
      <div className={styles.socialLinks}>
        <a
          href="https://www.linkedin.com/in/emilianocararo"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://emilianocararo.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </a>
        <a
          href="https://github.com/emilianocararo"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
