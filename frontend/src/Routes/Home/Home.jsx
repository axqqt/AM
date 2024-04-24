/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // State to store the selected type

  async function fetchContent() {
    try {
      setLoading(true);
      // You can modify the URL to include the selected type if needed
      const response = await Axios.get(`${BASE}/mains?type=${selectedType}`);
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

  useEffect(() => {
    fetchContent();
  }, [selectedType]); // Fetch content whenever the selected type changes

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="company">
      <h1>{company.gmail ? "Welcome Back!" : "Welcome to Affiliated"}</h1>
      {/* Dropdown menu for selecting the type */}
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Select type</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
        {/* Add more options as needed */}
      </select>
      {loading ? (
        "Loading..."
      ) : (
        <div className="data">
          {data.length > 0 ? (
            data.map((x) => (
              <div key={x._id} className="container">
                <h1>{x.title}</h1>
                <h2>{x.description}</h2>
                {/* Render video */}
                <video width="320" height="240" controls>
                  <source src={x.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Link to view more */}
                <Link to={x.link}>{`Click here to view more ${x.title}`}</Link>
              </div>
            ))
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
