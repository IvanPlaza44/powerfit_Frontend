import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addToCart, fetchCart } from "../redux/cartSlice";
import { toggleFavoriteAsync } from "../redux/favoritesSlice";
import { Heart } from "lucide-react";

const Card = ({ product, setMessage, setMessageType  }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites.favorites|| []
  );

  const isFavorite = favorites.some(
    (fav) => fav.product?.id === product.id
  );

  const handleToggleFavorite = () => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined") {
      setMessageType("error");
      setMessage("Debes iniciar sesión para usar favoritos");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    dispatch(toggleFavoriteAsync(product));

    setMessageType("success");
    setMessage("Producto agregado a favoritos");

    setTimeout(() => setMessage(""), 2000);
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined") {
      setMessageType("error");
      setMessage("Debes iniciar sesión para agregar al carrito");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
        })
      ).unwrap();

      setMessageType("success");
      setMessage("Producto agregado al carrito");

      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      setMessageType("error");
      setMessage("Error al agregar al carrito");

      setTimeout(() => setMessage(""), 2000);
    }
  };
  const hasDiscount = Number(product.discount) > 0;

  const discountPrice = hasDiscount
    ? (product.price - (product.price * product.discount) / 100).toFixed(0)
    : product.price;

  return (
    <div className="flex flex-col w-[260px] rounded-xl border border-border bg-card p-5 relative">

        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition
            ${
              isFavorite
                ? "border-red-500 "
                : "border-gray-500 hover:border-red-500"
            }`}
        >
          <Heart
            size={25}
            fill={isFavorite ? "currentColor" : "none"}
            className={
              isFavorite ? "text-red-500" : "text-gray-400"
            }
          />
        </button>


      <div className="relative aspect-square overflow-hidden flex items-center justify-center bg-secondary rounded-lg">
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="mt-3 font-bold">{product.name}</h2>

      <div className="mt-2 flex items-center gap-2">
        <p className="font-black text-lg">
          ${discountPrice}
        </p>

        {hasDiscount && (
          <p className="text-sm text-gray-500 line-through">
            ${product.price}
          </p>
        )}
      </div>

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

    </div>
  );
};

export default Card;