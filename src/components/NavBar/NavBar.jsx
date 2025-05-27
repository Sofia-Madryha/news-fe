import { Link, useLocation } from "react-router-dom";

import { fetchTopics } from "../../api/api";
import { useFetchData } from "../../hooks";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { data: topics, isLoading } = useFetchData(fetchTopics);

  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li
          className={
            `${styles.nav_item} ${pathname === "/" ? styles.nav_item_active : null}`
          }
        >
          <Link to="/">Home</Link>
        </li>
        {!isLoading && topics
          ? topics.map((topic) => (
              <li
                key={topic.slug}
                className={
                  `${styles.nav_item} ${pathname.includes(topic.slug) ? styles.nav_item_active: null}`
                }
              >
                <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
              </li>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default NavBar;
