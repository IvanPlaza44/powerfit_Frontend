import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


  const DetailProduct = ({ addToCart }) => {

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    await fetch(
      `http://localhost:4002/cart/${userId}/products/${product.id}?quantity=1`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Agregado al carrito");
  };

  const [product, setProduct] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:4002/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) =>
        console.error(error)
      );

  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20">
        <h1 className="text-2xl font-bold">
          Cargando producto...
        </h1>
      </div>
    );
  }

  const hasDiscount =
    product.discount && product.discount > 0;

  const originalPrice = hasDiscount
    ? (
        product.price /
        (1 - product.discount / 100)
      ).toFixed(0)
    : null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-10 lg:grid-cols-2">

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">

          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-secondary">

            {hasDiscount && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-extrabold text-white shadow-md">
                -{product.discount}% OFF
              </span>
            )}

            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-6"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">

          <span className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary">
            {product.category?.description || "General"}
          </span>

          <h1 className="text-4xl font-black">
            {product.name}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">

            <span className="text-4xl font-black">
              ${product.price}
            </span>

            {hasDiscount && (
              <span className="text-xl line-through text-muted-foreground">
                ${originalPrice}
              </span>
            )}

          </div>

          <div className="mt-4">
            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-500">
              Stock disponible: {product.stock}
            </span>
          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                addToCart(product)
              }
              className="flex-1 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground"
            >
              Añadir al carrito
            </button>

            <button
              onClick={() =>
                addToFavorites(product)
              }
              className="rounded-xl border border-border bg-secondary px-6 py-4 text-xl"
            >
              ❤️
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;