import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../redux/cartSlice";

const Card = ({ product, addToFavorites }) => {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined") {
      alert("Tenés que iniciar sesión");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
        })
      ).unwrap();

      dispatch(fetchCart(userId));

      alert("Agregado al carrito");
    } catch (err) {
      console.error(err);
      alert("Error al agregar al carrito");
    }
  };

  const hasDiscount = Number(product.discount) > 0;

  const discountPrice = hasDiscount
    ? (product.price - (product.price * product.discount) / 100).toFixed(0)
    : product.price;

  return (
    <div className="flex flex-col w-[260px] rounded-xl border border-border bg-card p-5">

      <div className="aspect-square flex items-center justify-center bg-secondary rounded-lg">
        <img src={product.image} alt={product.name} />
      </div>

      <h2 className="mt-3 font-bold">{product.name}</h2>

      <p className="font-black">${discountPrice}</p>

      <Link
        to={`/products/${product.id}`}
        className="mt-3 text-center bg-secondary py-2 rounded-md"
      >
        Ver detalle
      </Link>

      <button
        onClick={handleAddToCart}
        className="mt-2 bg-primary text-white py-2 rounded-md"
      >
        Añadir al carrito
      </button>

      <button onClick={() => addToFavorites?.(product)}>
        ❤️
      </button>
    </div>
  );
};

export default Card;