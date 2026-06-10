import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/detailProductSlice";
import { addToCart, fetchCart } from "../redux/cartSlice";
import { addFavoriteAsync } from "../redux/favoritesSlice";

const DetailProduct = ({ addToFavorites }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.detailProduct
  );
  
  const handleAddToFavorites = async () => {
    try {
      await dispatch(addFavoriteAsync(product)).unwrap();

      alert("Producto agregado a favoritos");
    } catch (error) {
      console.error(error);
      alert("Error al agregar favorito");
    }
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

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

      alert("Producto agregado al carrito");
    } catch (err) {
      console.error(err);
      alert("Error al agregar al carrito");
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
        className="w-full max-w-2xl object-contain rounded-xl mb-8"
      />

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