import { useContext, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <section className="flex items-center justify-center h-screen">
      {/* <div className="register-form">
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
      </div> */}
      <div className="contianer p-24">
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-col justify-center items-start h-full">
            <div className="">
              <h1 className="text-5xl text-white text-start font-bold mb-3">
                Register
              </h1>
              <h1 className="text-lg text-muted">
                Please enter your details to Register
              </h1>
            </div>
            <div className="w-full">
              <form
                onSubmit={userRegister}
                className="flex flex-col gap-3 mt-5"
              >
                <Input
                  type="email"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  name="gmail"
                  className="w-full"
                  placeholder="Enter email..."
                  required
                />
                <Button type="submit" className="mt-5" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
              <h2 className="text-white mt-5">{status}</h2>
              <Link to="/login" className="text-blue-500 hover:underline">
                {" "}
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
