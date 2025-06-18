import { NavBar } from "@/components";

import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_wrapper}>
          <h1 className={styles.header_logo}>
            <span className={styles.header_logo_span}>Daily</span> digest
          </h1>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
