import { Link } from "react-router-dom";

import { NavBar } from "../NavBar";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_wrapper}>
          <p>Contact us!</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
