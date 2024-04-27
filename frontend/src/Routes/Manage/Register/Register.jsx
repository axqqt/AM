import { useContext, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

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
        setStatus("Registration complete! Redirecting to login...");
        setTimeout(() => {
          navigator("/login");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setStatus(`${gmail} is already taken!`);
      } else {
        setStatus("Error occurred during registration");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={userRegister}>
          <input
            type="email"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            name="gmail"
            placeholder="Enter email..."
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <h2>{status}</h2>
        <Link to="/login">Already a user? Log in</Link>
      </div>
    </div>
  );
};

export default Register;
