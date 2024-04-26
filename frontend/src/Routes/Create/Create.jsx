import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    timestamps: [],
    link: "",
    category: "",
    commission: "", // Adding commission field
  });

  const navigator = useNavigate();

  async function addContent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("video", formData.video);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("commission", formData.commission); // Appending commission data
      formData.timestamps.forEach((point, index) => {
        formDataToSend.append(`timestamps[${index}]`, point);
      });
      console.log(formDataToSend);
      await Axios.post(`${BASE}/mains`, formDataToSend).then((response) => {
        if (response.status === 201) {
          setStatus("Content Added");
          navigator("/");
        } else if (response.status === 400) {
          setStatus("Required fields not filled");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value, files, dataset } = e.target;
    if (name === "video") {
      setFormData({ ...formData, video: files[0] });
    } else if (name === "timestamps") {
      const index = dataset.index;
      const newTimestamps = [...formData.timestamps];
      newTimestamps[index] = value;
      setFormData({ ...formData, timestamps: newTimestamps });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddTimestamp = () => {
    setFormData({
      ...formData,
      timestamps: [...formData.timestamps, ""],
    });
  };

  return (
    <div>
      <h1>Add Content</h1>
      <form onSubmit={addContent}>
        <div>
          <label>Title:</label>
          <input
            name="title"
            placeholder="Enter title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            name="description"
            placeholder="Enter description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="health">Health Care</option>
            <option value="beauty">Beauty</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label>Video:</label>
          <input name="video" type="file" onChange={handleChange} />
        </div>
        <div>
          <label>Timestamps:</label>
          {formData.timestamps.map((point, index) => (
            <div key={index}>
              <input
                name="timestamps"
                data-index={index}
                placeholder="Enter timestamp"
                type="text"
                value={point}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddTimestamp}>
            Add Timestamp
          </button>
        </div>
        <div>
          <label>Link:</label>
          <input
            name="link"
            placeholder="Enter Link"
            type="text"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Commission:</label>
          <input
            name="commission"
            placeholder="Enter Commission"
            type="text"
            value={formData.commission}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Add
        </button>
      </form>
      <h2>{status}</h2>
    </div>
  );
};

export default Create;
