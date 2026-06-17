import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/detailProductSlice";
import { addToCart, fetchCart } from "../redux/cartSlice";
import { addFavoriteAsync } from "../redux/favoritesSlice";
import { useState } from "react";

const DetailProduct = ({ addToFavorites }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { product, loading } = useSelector(
    (state) => state.detailProduct
  );
  
  const handleAddToFavorites = async () => {
    try {
      await dispatch(addFavoriteAsync(product)).unwrap();
      setMessage("Agregado a favoritos");
      setTimeout(() => setMessage(""), 2000);

    } catch (error) {
      console.error(error);
      setError("Error al agregar favorito");
      setTimeout(() => setError(""), 2000);
    }
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    
    if (!userId || userId === "undefined") {
      setMessage("Tenes que iniciar sesion");
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

      dispatch(fetchCart(userId));

      setMessage("Producto agregado al carrito");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setError("Error al agregar al carrito");
      setTimeout(() => setError(""), 2000);
    }
  };

  if (loading || !product) return <h1>Cargando...</h1>;

  const hasDiscount = product.discount > 0;

  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discount / 100)).toFixed(0)
    : null;
return (
  
  <div className="min-h-screen bg-black text-white py-10 px-4">
    <div className="max-w-4xl mx-auto flex flex-col items-center">

      {/* Imagen */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-w-xl h-[400px] object-contain rounded-xl mb-6"
      />
          {message && (
        <p className="text-green-400 text-center mb-4">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-400 text-center mb-4">
          {error}
        </p>
      )}

      {/* Nombre */}
      <h1 className="text-4xl font-bold text-center mb-4">
        {product.name}
      </h1>

      {/* Precio */}
      {hasDiscount ? (
        <div className="text-center mb-6">
          <span className="text-gray-500 line-through text-2xl mr-3">
            ${originalPrice}
          </span>

          <span className="text-green-500 text-4xl font-black">
            ${product.price}
          </span>

          <div className="mt-2">
            <span className="bg-green-500 text-black px-3 py-1 rounded-full font-bold">
              -{product.discount}%
            </span>
          </div>
        </div>
      ) : (
        <p className="text-green-500 text-4xl font-black mb-6">
          ${product.price}
        </p>
      )}

      {/* Descripción */}
      <p className="text-gray-300 text-center text-lg max-w-2xl mb-8">
        {product.description}
      </p>

      {/* Botones */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-green-500 hover:text-black"
        >
          Añadir al carrito
        </button>

        <button
          onClick={handleAddToFavorites}
          className="border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black"
        >
          ❤️
        </button>
      </div>

    </div>
  </div>
);
};

export default DetailProduct;