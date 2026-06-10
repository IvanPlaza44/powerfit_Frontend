import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/detailProductSlice";
import { addToCart, fetchCart } from "../redux/cartSlice";

const DetailProduct = ({ addToFavorites }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector(
    (state) => state.detailProduct
  );

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
    <div className="p-10">
      <img src={product.image} className="w-80" />

      <h1>{product.name}</h1>
      <p>{product.description}</p>

      <p className="text-3xl font-black">${product.price}</p>

      {hasDiscount && (
        <p className="line-through">${originalPrice}</p>
      )}

      <button onClick={handleAddToCart}>
        Añadir al carrito
      </button>

      <button onClick={() => addToFavorites?.(product)}>
        ❤️
      </button>
    </div>
  );
};

export default DetailProduct;