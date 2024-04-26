/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../../App";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import jwt_decode from 'jwt-decode'; 

const Login = () => {
  const {
    loading,
    setLoading,
    status,
    setStatus,
    BASE,

    setCompany,
  } = useContext(UserContext);
  const [creds, setCreds] = useState({ gmail: "", password: "" });
  const navigator = useNavigate();

  async function userLogin(e) {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/login`, creds);
      if (response.status === 200) {
        const { token, company } = response.data;
  
        // Store JWT in local storage
        localStorage.setItem('token', token);
  
        // Optionally, you can decode the token to access user information
        // const decodedToken = jwt_decode(token);
        // console.log(decodedToken);
  
        setCompany(company); 
        setStatus(`${company.gmail} Logged in!`);
        setTimeout(() => {
          navigator("/");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setStatus("Wrong Credentials");
      } else {
        setStatus("Error");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2>{loading && "Loading..."}</h2>
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={userLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Gmail
            </label>
            <input
              onChange={handleChange}
              name="gmail"
              placeholder="Enter gmail..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <h1 className="text-gray-600">{status}</h1>
          <Link to="/register" className="text-blue-500 hover:underline">
            {" "}
            Not registered?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
