import { Link, Outlet } from "react-router-dom";

const NavBar = ({ topics }) => {
  return (
    <nav>
      <ul>
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
