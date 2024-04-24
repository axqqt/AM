import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Nav = () => {
  const { company } = useContext(UserContext);
  return (
    <ul>
      <Link to={"/"}>Home</Link>
      {!company.gmail && (
        <div>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </ul>
  );
};

export default Nav;
