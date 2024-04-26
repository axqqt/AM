/* eslint-disable no-unused-vars */
import React, { useState, useContext, createContext, useEffect, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./Routes/NotFound/NotFound";
import Logo from "./Routes/Logo/Logo";
import Procedure from "./Routes/Procedure/Procedure";

// Lazy load your route components
const Home = React.lazy(() => import("./Routes/Home/Home"));
const Register = React.lazy(() => import("./Routes/Manage/Register/Register"));
const Login = React.lazy(() => import("./Routes/Manage/Login/Login"));
const Nav = React.lazy(() => import("./Routes/Navbar/Nav"));
const Create = React.lazy(() => import("./Routes/Create/Create"));
const Search = React.lazy(() => import("./Routes/Search/Search"));

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({ gmail: "", password: "" });
  const [status, setStatus] = useState("");
  const BASE = "http://localhost:8000";

  useEffect(() => {
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }, [status]);

  const theStates = {
    loading,
    setLoading,
    company,
    setCompany,
    BASE,
    status,
    setStatus,
  };

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={theStates}>
          <Logo/>
          <Suspense fallback={<div>Loading...</div>}>
            <Nav />
            {/* <Search /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/procedure" element={<Procedure/>}></Route>
              {company.gmail && (
                <Route path="/create" element={<Create />}></Route>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
