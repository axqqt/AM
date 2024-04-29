/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";
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
    <div className="mx-6 flex justify-between items-center">
     
      <form onSubmit={Search} className="flex justify-between  gap-3">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="p-2 rounded-lg"
          placeholder="Search Here..."
          type="text"
        ></input>
        <Button type="submit" disabled={loading}>
          Search...
        </Button>
      </form>
    </div>
  );
};

export default Search;
