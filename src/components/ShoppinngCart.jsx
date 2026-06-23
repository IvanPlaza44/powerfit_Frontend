import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItem, removeFromCart } from "../redux/cartSlice";
import { toast }from "react-toastify";
import { ScaleLoader } from "react-spinners";

export default function ShoppinngCart () {
  const dispatch = useDispatch();

  const { items: cart, loading } = useSelector((state) => state.cart);

  const userId = localStorage.getItem("userId");

  const getFinalPrice = (product) =>
  product.discount > 0
    ? product.price - (product.price * product.discount) / 100
    : product.price;

const increase = async (p) => {
  try {
    await dispatch(
      updateCartItem({
        userId,
        productId: p.product.id,
        quantity: p.quantity + 1,
      })
    ).unwrap();
  } catch {
    toast.error("No hay stock suficiente", {
      toastId: "stock-error",
    });
  }
};

  const decrease = async (p) => {
  if (p.quantity <= 1) return;

  try {
    await dispatch(
      updateCartItem({
        userId,
        productId: p.product.id,
        quantity: p.quantity - 1,
      })
    ).unwrap();
  } catch (err) {
    console.error(err);
  }
};

  const remove = (productId) => {
    dispatch(removeFromCart({ userId, productId }))
  };

  const total = cart.reduce(
  (acc, p) => acc + getFinalPrice(p.product) * p.quantity,
  0
);


  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {loading && (
        <div className="fixed inset-0 bg-white/20 flex items-center justify-center z-[9999]">
          <ScaleLoader />
        </div>
      )}
      <h1 className="text-3xl font-black mb-8 text-foreground">
        Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground mb-6">
            No hay productos en tu carrito
          </p>

          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-black"
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
                      ${getFinalPrice(p.product).toFixed(2)} c/u
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
                    ${(getFinalPrice(p.product) * p.quantity).toFixed(2)}
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
              Total: ${total.toFixed(2)}
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