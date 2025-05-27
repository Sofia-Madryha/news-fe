import { Link } from "react-router-dom";

import { NavBar } from "../NavBar";

import styles from "./Header.module.css";


const Header = () => {

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <Link to="/" className={styles.header_logo}>NEWS</Link>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
