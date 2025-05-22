import { Link } from "react-router-dom";
import { fetchTopics } from "../../api/api";
import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks";

const NavBar = () => {

const { data: topics, isLoading } = useFetchData(
    fetchTopics,
  );

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isLoading && topics ? topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/articles/${topic.slug}`}>{topic.slug}</Link>
          </li>
        )): null}
      </ul>
    </nav>
  );
};

export default NavBar;
