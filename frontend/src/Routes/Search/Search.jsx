/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Search = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  async function Search(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/searchs`, search);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("No results found");
      } else {
        setStatus("Error!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{margin:"40px"}}>
      <h1>Search</h1>
      <form onSubmit={Search}>
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Here..."
          type="text"
        ></input>
        <button type="submit" disabled={loading}>
          Search...
        </button>
      </form>
    </div>
  );
};

export default Search;
