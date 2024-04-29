import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>The product id is {id}</h1>
    </div>
  );
};

export default Product;
