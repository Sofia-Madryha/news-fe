import { Link } from "react-router-dom";

import { fetchTopics } from "../../api/api";
import { useFetchData } from "../../hooks";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const { data: topics, isLoading } = useFetchData(fetchTopics);

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <Link to="/">Home</Link>
        </li>
        {!isLoading && topics
          ? topics.map((topic) => (
              <li key={topic.slug} className={styles.nav_item}>
                <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
              </li>
            ))
          : null}
      </ul>
    </nav>
  );
};

export default NavBar;
