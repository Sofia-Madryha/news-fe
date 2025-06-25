import { Link, useLocation } from "react-router-dom";

import { navLinks } from "@/constants";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        {navLinks.map((link, index) => (
          <li
            key={index}
            className={`${styles.nav_item} ${
              pathname === link.path ? styles.nav_item_active : null
            }`}
          >
            <Link to={link.path}>{link.icon}</Link>
            {pathname === link.path ? <span>{link.label}</span> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
