import { useEffect, useState } from "react";

export const ShoppinngCart = () => {
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  //TRAER CARRITO
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

    // 🔥 SIEMPRE ES ARRAY
    setCart(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 🔼 SUMAR
  const increase = async (product) => {
    await fetch(
      `http://localhost:4002/cart/${userId}/products/${product.id}?quantity=${product.quantity + 1}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

  // 🔽 RESTAR
  const decrease = async (product) => {
    if (product.quantity <= 1) return;

    await fetch(
      `http://localhost:4002/cart/${userId}/products/${product.id}?quantity=${product.quantity - 1}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadCart();
  };

  // ❌ ELIMINAR
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
    (acc, p) => acc + p.price * p.quantity,
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
            {/* INFO PRODUCTO */}
            <div>
              <h2>{p.name}</h2>
              <p>${p.price}</p>
            </div>

            {/* CONTROLES */}
            <div className="flex items-center gap-3">

              <button onClick={() => decrease(p)}>
                -
              </button>

              <span>{p.quantity}</span>

              <button onClick={() => increase(p)}>
                +
              </button>

            </div>

            {/* SUBTOTAL */}
            <div className="flex items-center gap-4">
              <p>
                ${p.price * p.quantity}
              </p>

              <button onClick={() => remove(p.id)}>
                ❌
              </button>
            </div>

          </div>
        ))
      )}

      <h2 className="mt-6 text-xl font-bold">
        Total: ${total}
      </h2>
    </div>
  );
};