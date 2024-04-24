import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";

const Create = () => {
  const { loading, setLoading, BASE } = useContext(UserContext);
  const [send, setSend] = useState({});

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
        <input name="" placeholder="" type="text" onChange={handleChange}></input>
        <input name="" placeholder="" type="text" onChange={handleChange}></input>
        <input name="" placeholder="" type="text" onChange={handleChange}></input>
        <button type="submit" disabled={loading}>Add</button>
      </form>
    </div>
  );
};

export default Create;
