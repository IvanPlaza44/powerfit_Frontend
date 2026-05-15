import { Link } from "react-router-dom";

const Card = ({ product }) => {
  return (
    <div className="border p-4 rounded-md">
      
      <img src={product.image} alt={product.name} />

      <h2>{product.name}</h2>
      <p>${product.price}</p>

      <Link to={`/products/${product.id}`}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Card;