import { useLocation } from "react-router-dom";

import { navLinks } from "@/constants";
import { getDate } from "@/utils";

import styles from "./TopBar.module.scss";

const TopBar = () => {
  const location = useLocation();
  const { pathname } = location;

  const { currentDate, hour } = getDate();

  let dayPeriod;

  if (hour < 12) {
    dayPeriod = "morning";
  } else if (hour < 18) {
    dayPeriod = "afternoon";
  } else {
    dayPeriod = "evening";
  }

  const activeLink = navLinks.find((link) => link.path === pathname);

  return (
    <div className={styles.top_bar}>
      <div className="container">
        <div className={styles.top_bar_wrapper}>
          {activeLink && activeLink.path === "/" ? (
            <div>
              <p>Good {dayPeriod}</p>
              <p className={styles.top_bar_date}>{currentDate}</p>
            </div>
          ) : (
            <h2 className={styles.top_bar_label}>{activeLink?.label}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
