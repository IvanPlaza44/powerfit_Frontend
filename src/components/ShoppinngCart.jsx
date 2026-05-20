import React from "react";
import { Link } from "react-router-dom";

export const ShoppinngCart = ({
  cart = [],
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
}) => {

  const total = cart.reduce(
    (acc, product) =>
      acc + product.price * product.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-6">
        Carrito de compras
      </h1>

      {cart.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">

          <p className="text-lg font-medium">
            No hay productos en el carrito.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Agrega productos desde la sección de productos para verlos aquí.
          </p>

          <Link
            to="/products"
            className="mt-4 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/95 transition-colors"
          >
            Ir a productos
          </Link>

        </div>

      ) : (

        <>
          <div className="space-y-4">

            {cart.map((product) => (

              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 md:flex-row md:items-center md:justify-between"
              >

                <div className="flex items-center gap-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-xl object-contain"
                  />

                  <div>

                    <h2 className="text-lg font-semibold text-foreground">
                      {product.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {product.category?.description || "Sin categoría"}
                    </p>

                    <p className="mt-2 text-base font-bold text-foreground">
                      ${product.price}
                    </p>

                  </div>
                </div>

                <div className="flex items-center gap-4">

                  {/* Cantidad */}
                  <div className="flex items-center gap-3 border border-border rounded-lg px-3 py-2">

                    <button
                      onClick={() =>
                        decreaseQuantity(product.id)
                      }
                      className="text-lg font-bold"
                    >
                      -
                    </button>

                    <span className="font-semibold">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(product.id)
                      }
                      className="text-lg font-bold"
                    >
                      +
                    </button>

                  </div>

                  {/* Subtotal */}
                  <p className="font-bold text-lg">
                    $
                    {product.price *
                      product.quantity}
                  </p>

                  {/* Remover */}
                  <button
                    onClick={() =>
                      removeFromCart(product.id)
                    }
                    className="rounded-md border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    Remover
                  </button>

                </div>

              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-8 flex justify-end">

            <div className="rounded-2xl border border-border bg-card p-6 w-full max-w-sm">

              <h2 className="text-xl font-bold mb-4">
                Resumen
              </h2>

              <div className="flex items-center justify-between text-lg font-semibold">

                <span>Total:</span>

                <span>${total}</span>

              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
};