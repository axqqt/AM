import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Create = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: { link: null, timestamps: [] },
    link: "",
    category: "",
  });

  async function AddContent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("video", formData.video.link); // Use formData.video.link for the file URL
      formDataToSend.append("link", formData.link);
      formDataToSend.append("category", formData.category);
      // Append each content point in the timestamps array
      formData.video.timestamps.forEach((point, index) => {
        formDataToSend.append(`timestamps[${index}]`, point);
      });
      await Axios.post(`${BASE}/mains`, formDataToSend);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    if (e.target.name === "video") {
      // Bind the file to video.link
      setFormData({
        ...formData,
        video: { ...formData.video, link: e.target.files[0] },
      });
    } else if (e.target.name === "timestamps") {
      // Handle changes in the timestamps array
      const timestamps = [...formData.video.timestamps];
      timestamps[e.target.dataset.index] = e.target.value;
      setFormData({ ...formData, video: { ...formData.video, timestamps } });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return (
    <div>
      <h1>Add Content</h1>
      <form onSubmit={AddContent}>
        <input
          name="title"
          placeholder="Enter title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        ></input>
        <input
          name="description"
          placeholder="Enter description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          required
        ></input>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="clothing">Clothing</option>
          <option value="health">Health Care</option>
          <option value="beauty">Beauty</option>
          {/* Add more options as needed */}
        </select>
        <div className="video">
          <label>
            Video must contain clear instructions and accurate timestamps{" "}
          </label>
          <label>Select Category</label>
          <input
            name="video"
            placeholder="Enter Video"
            type="file"
            onChange={handleChange}
           
          ></input>
        </div>
        {/* Render input fields for content points */}
        {formData.video.timestamps.map((point, index) => (
          <input
            key={index}
            name="timestamps"
            data-index={index}
            placeholder="Enter content point"
            type="text"
            value={point}
            onChange={handleChange}
            required
          />
        ))}
        <input
          name="link"
          placeholder="Enter Link"
          type="text"
          value={formData.link}
          onChange={handleChange}
          required
        ></input>
        <button type="submit" disabled={loading}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Create;
