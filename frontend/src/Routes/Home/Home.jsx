import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Feedback from "../Feedback/Feedback";
// import ReactSpinner from 'react-spinner'; // Import the spinner component

const Home = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("");

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
    <div className="company">
      {company.gmail && <Link to={"/create"}>ADD YOUR LISTINGS!</Link>}
      <a href={"#feedback"}>Feedback</a>
      <h1>
        {company.gmail
          ? `Welcome Back ${company.gmail}!👋🏻`
          : "Welcome to Affiliated 💸"}
      </h1>
      <div className="selector">
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="all">Select type</option>
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          <option value="type3">Type 3</option>
        </select>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="card">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="container"
                style={{ margin: "40px" }}
              >
                <h1>{item.title}</h1>
                <h2>{item.description}</h2>
                <h3 style={{ color: "black" }}>
                  {" "}
                  Commission rate : {item.commission}
                </h3>
                <div className="vid">
                  <video width="320" height="240" controls>
                    <source src={item.video.link} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="timestamps">
                    <h1>{item.video.timstamps}</h1>
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
       
        <div className="footer">
          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Home;
