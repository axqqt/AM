
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1>You have landed at emptiness 🪐</h1>
      <Link to={"/"}> Click here to go back!</Link>
    </div>
  );
};

export default NotFound;
