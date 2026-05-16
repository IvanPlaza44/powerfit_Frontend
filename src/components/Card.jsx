import { Link } from "react-router-dom";

const Card = ({ product, addToFavorites }) => {
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

      <br /><br />

      <button
        onClick={() => addToFavorites(product)}
        style={{
          marginTop: "10px",
          padding: "8px",
          cursor: "pointer"
        }}
      >
        Agregar a favoritos
      </button>
    </div>
  );
};

export default Card;