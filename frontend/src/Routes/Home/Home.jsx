import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Feedback from "../Feedback/Feedback";

const Home = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("all"); // Set default value to "all"

  async function fetchContent() {
    try {
      setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="company" id="top">
      {company.gmail && <Link to={"/create"}>ADD YOUR LISTINGS!</Link>}
      <a href={"#feedback"}>Provide Your Valuable Feedback!</a>
      <h1>
        {company.gmail
          ? `Welcome Back ${company.gmail.split("@")[0]}!👋🏻`
          : "Welcome to Affiliated 💸"}
      </h1>
  
      <div className="selector">
        <label>Select Type</label>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="clothing">Clothing</option>
          <option value="health">Health Care</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="card-container">
          {data && data.length > 0 ? (
            data
              .filter(item => selectedType === 'all' || item.category === selectedType)
              .map((item) => (
                <div key={item._id} className="card" style={{ margin: "40px" }}>
                  <h1>{item.title}</h1>
                  <h2>{item.description}</h2>
                  <h3 style={{ color: "black" }}>
                    Commission rate: {item.commission}
                  </h3>
                  <div className="vid">
                    <video width="320" height="240" controls>
                      <source src={item.video.link} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="timestamps">
                      <h1>{item.timstamps}</h1>
                    </div>
                  </div>
                  {item.video.link && (
                    <Link
                      to={item.video.link}
                    >{`Click here to get started with ${item.title}`}</Link>
                  )}
                </div>
              ))
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      )}
      <h2>{status}</h2>
  
      <div className="footer">
        <Feedback />
      </div>
    </div>
  );
};

export default Home;
