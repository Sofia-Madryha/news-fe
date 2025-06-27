import { Link, useLocation } from "react-router-dom";

import { NavBar } from "@/components";

import styles from "./Header.module.scss";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <header
      className={`${styles.header} 
        ${
          pathname.includes("/article") ? styles.header_article : styles.header
        }`}
    >
      <div className="container">
        <div className={styles.header_wrapper}>
          <Link to="/">
            <h1 className={styles.header_logo}>
              <span className={styles.header_logo_span}>Daily</span> digest
            </h1>
          </Link>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
