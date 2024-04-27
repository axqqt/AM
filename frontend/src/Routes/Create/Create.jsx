import { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const Create = () => {
  const { loading, setLoading, BASE, status, setStatus } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    link: "",
    category: "",
    commission: "", // Adding commission field
  });

  const navigator = useNavigate();

  const addContent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("video", formData.video);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("commission", formData.commission);
      const response = await Axios.post(`${BASE}/mains`, formDataToSend);
      if (response.status === 201) {
        setStatus("Content Added");
        setFormData({
          title: "",
          description: "",
          video: null,
          link: "",
          category: "",
          commission: "",
        });
        navigator("/");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "video" ? files[0] : value });
  };

  return (
    <div>
      <h1>Add Content</h1>
      <form onSubmit={addContent}>
        <div className="form-group">
          <label>Title:</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
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
          </select>
        </div>
        <div className="form-group">
          <label>Video:</label>
          <input
            name="video"
            type="file"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Link:</label>
          <input
            name="link"
            type="text"
            value={formData.link}
            onChange={handleChange}
            placeholder="Enter Link"
            required
          />
        </div>
        <div className="form-group">
          <label>Commission:</label>
          <input
            name="commission"
            type="text"
            value={formData.commission}
            onChange={handleChange}
            placeholder="Enter Commission"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
      <h2>{status}</h2>
    </div>
  );
};

export default Create;
