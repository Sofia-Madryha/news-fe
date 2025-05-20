import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Header = ({topics}) => {
  return (
    <>
      <Link to="/">News</Link>
      <NavBar topics={ topics}/>
    </>
  );
};

export default Header;
