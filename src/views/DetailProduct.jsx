import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";

import { fetchProductById } from "../redux/detailProductSlice";
import { addToCart } from "../redux/cartSlice";
import { addFavoriteAsync } from "../redux/favoritesSlice";
import { toggleFavoriteAsync } from "../redux/favoritesSlice";


const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.detailProduct
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const favorites = useSelector(
    (state) => state.favorites.favorites|| []
  );

  const isFavorite = favorites.some(
  (fav) => fav?.product?.id === product?.id
);

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteAsync(product));
  };



  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToFavorites = async () => {
    try {
      await dispatch(addFavoriteAsync(product)).unwrap();

      setMessage("Producto agregado a favoritos");
      setError("");

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (err) {
      setError("Error al agregar favorito");
      setMessage("");

      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined") {
      setError("Tenés que iniciar sesión");
      setTimeout(() => setError(""), 2500);
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId,
          productId: product.id,
        })
      ).unwrap();

      setMessage("Producto agregado al carrito 🛒");
      setError("");

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Error al agregar al carrito"
      );

      setMessage("");

      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold">
          Cargando producto...
        </h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold">
          Producto no encontrado
        </h2>
      </div>
    );
  }

  const hasDiscount = product.discount > 0;

  const discountedPrice = hasDiscount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* IMAGEN */}
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="relative">

            {hasDiscount && (
              <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}% OFF
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-contain"
            />
          </div>
        </div>

        {/* INFORMACIÓN */}
        <div>

          <span className="text-sm uppercase tracking-widest text-primary font-bold">
            {product.category?.description || "General"}
          </span>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            {product.name}
          </h1>

          <p className="mt-6 text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* PRECIO */}
          <div className="mt-8 flex items-center gap-4 flex-wrap">

            {hasDiscount && (
              <span className="text-2xl text-muted-foreground line-through">
                ${product.price}
              </span>
            )}

            <span className="text-5xl font-black text-primary">
              ${discountedPrice}
            </span>

            {hasDiscount && (
              <span className="bg-green-500/10 text-green-500 font-bold px-3 py-1 rounded-full">
                Ahorrás {product.discount}%
              </span>
            )}
          </div>

          {/* STOCK */}
          <div className="mt-6">
            {product.stock > 0 ? (
              <span className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full font-semibold">
                Stock disponible: {product.stock} unidades
              </span>
            ) : (
              <span className="bg-red-500/10 text-red-500 px-4 py-2 rounded-full font-semibold">
                Sin stock
              </span>
            )}
          </div>

          {/* MENSAJES */}
          {message && (
            <div className="mt-6 rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-green-500 font-medium">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-red-500 font-medium">
              {error}
            </div>
          )}

          {/* BOTONES */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-bold text-primary-foreground transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart size={20} />
              Añadir al carrito
            </button>

            <button
              onClick={handleToggleFavorite}
              className={`top-3 right-3 z-10 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition
                ${
                  isFavorite
                    ? "border-red-500 "
                    : "border-gray-500 hover:border-red-500"
                }`}
            >
              <Heart
                size={35}
                fill={isFavorite ? "currentColor" : "none"}
                className={
                  isFavorite ? "text-red-500" : "text-gray-400"
                }
              />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailProduct;