/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [gmail, setGmail] = useState("");


  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    setStatus("");
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/register`, { gmail });
      if (response.status === 201) {
        setStatus("Registration Complete, Please login to continue!");
        setTimeout(() => {
          navigator("/login");
          setStatus("");
        }, 1200);
      } else if(response.status===409){
        setStatus(`${gmail} already taken!`)
      }
  
    } catch (err) {
      // if(err.status===409){
      //   setStatus(`${gmail} already taken!`)
      // }
  
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  


  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={userRegister}>
          <input
            onChange={(e)=>{setGmail(e.target.value)}}
            name="gmail"
            placeholder="Enter gmail..."
          ></input>
          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>
        <h2>{status}</h2>
        <Link to={"/login"}>Already an user?</Link>
      </div>
    </div>
  );
};

export default Register;
