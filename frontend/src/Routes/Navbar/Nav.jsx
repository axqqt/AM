/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { UserContext } from "../../App";
import Create from "../Create/Create";

const Nav = () => {
  const { company } = useContext(UserContext);
  return (
    <ul>
      <Link to={"/"}>Home</Link>
    
      {!company.gmail ? (
        <div>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      ) : (
        <Link path="/create" element={<Create />}></Link>
      )}
    </ul>
  );
};

export default Nav;
