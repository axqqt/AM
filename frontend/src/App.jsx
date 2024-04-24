/* eslint-disable no-unused-vars */
import { useState, useContext, createContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home/Home";
import NotFound from "./Routes/NotFound/NotFound";
import Register from "./Routes/Manage/Register/Register";
import Login from "./Routes/Manage/Login/Login";
import Nav from "./Routes/Navbar/Nav";
import Create from "./Routes/Create/Create";

export const UserContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({ gmail: "x", password: "" });
  const [status, setStatus] = useState("");
  const BASE = "http://localhost:8000";

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
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {company.gmail && <Route path="/create" element={<Create/>}></Route>}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
