import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ShoppinngCart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const loadCart = async () => {
    try {
      const res = await fetch(`http://localhost:4002/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

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

  const remove = async (productId) => {
    await fetch(`http://localhost:4002/cart/${userId}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    loadCart();
  };

  const total = cart.reduce((acc, p) => acc + p.product.price * p.quantity, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Cargando carrito...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-black mb-8 text-foreground tracking-tight">
        Tu Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
          <p className="text-muted-foreground mb-6 text-lg">
            No hay productos en tu carrito todavía.
          </p>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-all hover:opacity-90"
          >
            Explorar productos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm divide-y divide-border">
            {cart.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 first:pt-0 last:pb-0 gap-4"
              >
                <div className="flex items-center gap-4">
                  {p.product.image && (
                    <div className="h-16 w-16 min-w-[64px] rounded-xl bg-secondary p-2 flex items-center justify-center overflow-hidden border border-border">
                      <img
                        src={p.product.image}
                        alt={p.product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="font-bold text-foreground line-clamp-1">
                      {p.product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">
                      ${p.product.price.toLocaleString()} c/u
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                  <div className="flex items-center gap-2 bg-secondary p-1 rounded-xl border border-border">
                    <button
                      onClick={() => decrease(p)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-foreground transition-colors hover:bg-background disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={p.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="min-w-[28px] text-center font-extrabold text-sm text-foreground">
                      {p.quantity}
                    </span>
                    <button
                      onClick={() => increase(p)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-foreground transition-colors hover:bg-background"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4 ml-auto sm:ml-0">
                    <p className="font-black text-lg text-foreground min-w-[80px] text-right">
                      ${(p.product.price * p.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => remove(p.product.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                      title="Eliminar producto"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Total estimado
              </p>
              <h2 className="text-3xl font-black text-foreground mt-0.5">
                ${total.toLocaleString()}
              </h2>
            </div>
            <Link
              to="/checkout"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Finalizar compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};