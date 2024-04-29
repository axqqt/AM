import { useLocation } from "react-router-dom";
const Product = () => {
  const { id } = useLocation();

  return (
    <div>
      <h1>The product id is {id}</h1>
    </div>
  );
};

export default Product;
