/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Home = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);

  async function fetchContent() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/mains`).then((response) => {
        if (response.status === 200) {
          setData(response.data);
        } else if (response.status === 404) {
          setStatus("No results found");
        } else {
          setStatus("Error!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div className="company">
      <h1>{company.gmail ? "Welcome Back!" : "Welcome to Affiliated"}</h1>
      {loading ? (
        "Loading..."
      ) : (
        <div className="data">
          {data && data.length ? (
            JSON.stringify(data)
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      )}
      <h2>{status}</h2>
    </div>
  );
};

export default Home;
