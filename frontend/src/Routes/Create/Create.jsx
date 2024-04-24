import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Create = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const [send, setSend] = useState({ title: "", description: "", video: null, link: "", category: "" });

  async function AddContent(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post(`${BASE}/mains`, send);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setSend({ ...send, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add Content</h1>
      <form onSubmit={AddContent}>
        <input name="title" placeholder="Enter title" type="text" onChange={handleChange}></input>
        <input name="description" placeholder="Enter description" type="text" onChange={handleChange}></input>
        <select name="category" onChange={handleChange}>
          <option value="">Select category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
          {/* Add more options as needed */}
        </select>
        <input name="video" placeholder="Enter Video" type="file" onChange={handleChange}></input>
        <input name="link" placeholder="Enter Link" type="text" onChange={handleChange}></input>
        <button type="submit" disabled={loading}>Add</button>
      </form>
    </div>
  );
};

export default Create;
