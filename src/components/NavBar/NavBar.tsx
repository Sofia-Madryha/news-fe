import { Link, useLocation } from "react-router-dom";

import { ExploreIcon, FavouritesIcon, HomeIcon, ProfileIcon } from "@/assets";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const location = useLocation();
  const { pathname } = location;

  const navLinks = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "Explore", path: "/explore", icon: <ExploreIcon /> },
    { label: "Favourites", path: "/favourites", icon: <FavouritesIcon /> },
    { label: "Profile", path: "/profile", icon: <ProfileIcon /> },
  ];

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
