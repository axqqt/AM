import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";


const Nav = () => {
  const { company } = useContext(UserContext);

  function Logout() {
    localStorage.removeItem("company");
    window.location.reload();
  }

  return (
    <nav className="py-5 px-24 w-full">
      <div className="container">
        <div className="flex justify-between  gap-6 items-center w-full">
          <Link to="/">
          <div className="flex justify-between items-center">
            <div>
              <img src="/download.png" alt="logo" width={50}/>
            </div>
            <div>
              <h1 className="text-white font-bold">Affiliated</h1>
            </div>
          </div>
          </Link>

          <div className="flex justify-between items-center gap-6">
            <Link className="text-white bg-transparent hover:text-muted" to="/procedure">
              How to get started?
            </Link>
            <Link to="/register"><Button variant={"white"}>Become a member</Button></Link>
            <Link to="/login"><Button variant={"outline"}>Sign in</Button></Link>
          </div>
        </div>
      </div>
      {/* <div className=" mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold">
            Home
          </Link>
          <Button  onClick={Logout}>{localStorage.getItem("company") && "Logout"}</Button>
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

      </div> */}
    </nav>
  );
};

export default Nav;
