import { Link } from "react-router-dom";
import { fetchTopics } from "../../api/fetchData";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((result) => setTopics(result));
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
