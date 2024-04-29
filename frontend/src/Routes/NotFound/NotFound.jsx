import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="h-screen  flex justify-center items-center p-24">
      <div className="container text-center">
        <h1 className="text-white text-3xl">You have landed at emptiness 🪐</h1>
        <Link to={"/"} className="text-blue-600 tex-center mt-3">
          {" "}
          Click here to go back!
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
