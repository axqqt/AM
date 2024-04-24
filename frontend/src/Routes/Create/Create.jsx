import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Create = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const [send, setSend] = useState({title:"", description:"", video:[], link:""});

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
        <input name="video" placeholder="Enter Video" type="file" onChange={handleChange}></input>
        <input name="link" placeholder="Enter Link" type="text" onChange={handleChange}></input>
        <button type="submit" disabled={loading}>Add</button>
      </form>
    </div>
  );
};

export default Create;
