import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ShoppinngCart = () => {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  //traer carrito
  const loadCart = async () => {
    const res = await fetch(
      `http://localhost:4002/cart/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log("CART BACKEND =>", data);

    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // sumar cantidad
  const increase = async (product) => {
  await fetch(
    `http://localhost:4002/cart/${userId}/products/${product.product.id}?quantity=${product.quantity + 1}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

  // disminuir cantidad
  const decrease = async (product) => {
      if (product.quantity <= 1) return;

  await fetch(
    `http://localhost:4002/cart/${userId}/products/${product.product.id}?quantity=${product.quantity - 1}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

  // eliminar
  const remove = async (productId) => {
    await fetch(
      `http://localhost:4002/cart/${userId}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

    const total = cart.reduce(
      (acc, p) => acc + p.product.price * p.quantity,
      0
    );

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Carrito
      </h1>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        cart.map((p) => (
          <div
            key={p.id}
            className="flex justify-between items-center border p-4 mb-3"
          >
            <div>
              <h2>{p.product.name}</h2>
              <p>${p.product.price}</p>
            </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => decrease(p)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-lg font-bold text-foreground transition-all hover:bg-primary hover:text-white disabled:opacity-50"
              disabled={p.quantity <= 1}
            >
              -
            </button>

            <span className="min-w-[30px] text-center text-lg font-bold">
              {p.quantity}
            </span>

            <button
              onClick={() => increase(p)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-lg font-bold text-foreground transition-all hover:bg-primary hover:text-white"
            >
              +
            </button>

          </div>

            {/* subtotal */}
            <div className="flex items-center gap-4">
              <p>
                ${p.product.price * p.quantity}
              </p>

            <button
              onClick={() => remove(p.product.id)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-sm transition-all hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
            </div>

          </div>
        ))
      )}

      <h2 className="mt-6 text-xl font-bold">
        Total: ${total}
      </h2>
      <div className="mt-8 flex justify-end">

      <Link
        to="/checkout"
        className="rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition hover:scale-105"
      >
        Finalizar compra
      </Link>

    </div>
    </div>
  );
};