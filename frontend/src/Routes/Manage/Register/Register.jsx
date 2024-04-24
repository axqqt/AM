/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [creds, setCreds] = useState({
    gmail:""
  });

  useEffect(()=>{
    console.log(`${creds.admin ? "Admin" : "Not"}`)
  },[creds.admin])

  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/register`, { creds });
      if (response.status === 201) {
        setStatus("Registration Complete, Please login to continue!");
        setTimeout(() => {
          navigator("/login");
          setStatus("");
        }, 1200);
      }
    } catch (err) {
      setStatus("Error registering user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={userRegister}>
          <input
            onChange={handleChange}
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
