import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Header = () => {
  return (
    <>
      <Link to="/">News</Link>
      <NavBar/>
    </>
  );
};

export default Header;
