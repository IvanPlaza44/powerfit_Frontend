import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../redux/cartSlice";
import toast from "react-hot-toast";

export const ShoppinngCart = () => {
  const dispatch = useDispatch();

  const { items: cart, loading } = useSelector((state) => state.cart);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  /*
  const increase = (p) => {
    dispatch(
      updateCartItem({
        userId,
        productId: p.product.id,
        quantity: p.quantity + 1,
      })
    )
      .unwrap()
      .then(() => {
        dispatch(fetchCart(userId));
      })
      .catch(() => {
        toast.error("No hay stock suficiente");
      });
  };
  */
const increase = (p) => {
  dispatch(
    updateCartItem({
      userId,
      productId: p.product.id,
      quantity: p.quantity + 1,
    })
  ).then((result) => {
    console.log("RESULTADO:", result);

    if (result.type.includes("rejected")) {
      alert("No hay stock suficiente");
      return;
    }

    dispatch(fetchCart(userId));
  });
};

  const decrease = (p) => {
    if (p.quantity <= 1) return;

    dispatch(
      updateCartItem({
        userId,
        productId: p.product.id,
        quantity: p.quantity - 1,
      })
    ).then(() => dispatch(fetchCart(userId)));
  };

  const remove = (productId) => {
    dispatch(removeFromCart({ userId, productId }))
      .then(() => dispatch(fetchCart(userId)));
  };

  const total = cart.reduce((acc, p) => {
    const finalPrice =
      p.product.discount > 0
        ? p.product.price - (p.product.price * p.product.discount) / 100
        : p.product.price;

    return acc + finalPrice * p.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Cargando carrito...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black mb-8 text-foreground">
        Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-6">
            No hay productos en tu carrito
          </p>

          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-white"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
            {cart.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                {/* Producto */}
                <div className="flex items-center gap-4">
                  <img
                    src={p.product.image}
                    className="h-16 w-16 object-contain bg-secondary rounded-lg p-2"
                  />

                  <div>
                    <h2 className="font-bold">{p.product.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      $
                      {p.product.discount > 0
                        ? p.product.price - (p.product.price * p.product.discount) / 100
                        : p.product.price}
                      {" "}c/u
                    </p>
                  </div>
                </div>

                {/* Cantidad */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(p)}
                    className="h-8 w-8 rounded bg-secondary"
                  >
                    -
                  </button>

                  <span className="font-bold">{p.quantity}</span>

                  <button
                    onClick={() => increase(p)}
                    className="h-8 w-8 rounded bg-secondary"
                  >
                    +
                  </button>
                </div>

                {/* Total + delete */}
                <div className="flex items-center gap-4">
                  <p className="font-black">
                    $
                    {(p.product.discount > 0
                      ? p.product.price - (p.product.price * p.product.discount) / 100
                      : p.product.price) * p.quantity}
                  </p>

                  <button
                    onClick={() => remove(p.product.id)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-black">
              Total: ${total}
            </h2>

            <Link
              to="/checkout"
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
            >
              Finalizar compra
            </Link>
          </div>
        </>
      )}
    </div>
  );
};