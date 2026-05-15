import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "10px",
        width: "250px"
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        width="200"
      />

      <h2>{product.name}</h2>
      <p>${product.price}</p>

      <Link to={`/products/${product.id}`}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Card;