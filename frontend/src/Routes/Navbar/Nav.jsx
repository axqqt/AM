import  { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Nav = () => {
  const { company } = useContext(UserContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Link to="/procedure" className="text-white ml-4">
            How to get started
          </Link>
        </div>
        <div className="flex items-center">
          {!company.gmail && (
            <div className="flex">
              <Link to="/login" className="text-white ml-4">
                Login
              </Link>
              <Link to="/register" className="text-white ml-4">
                Register
              </Link>
            </div>
          )}
          {company?.gmail && (
            <Link to="/create" className="text-white ml-4">
              Add Listing
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
