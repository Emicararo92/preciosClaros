import styles from "../../styles/footer.module.css";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h2>Emiliano Cararo</h2>
      <p>Desarrollador Frontend | Programador | Diseñador Web</p>
      <div className={styles.socialLinks}>
        <a
          href="www.linkedin.com/in/emilianocararofrontend"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={28} />
        </a>
        <a
          href="https://my-porfolio-sepia-iota.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
        >
          <FaGlobe size={28} />
        </a>
        <a
          href="https://github.com/Emicararo92"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={28} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
