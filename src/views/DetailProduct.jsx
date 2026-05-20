import { useParams } from "react-router-dom";
import products from "../mocks/products";

const DetailProduct = ({
  addToFavorites,
  addToCart,
}) => {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20">
        <h1 className="text-2xl font-bold">
          Producto no encontrado
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

        {/* Imagen */}
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
              className="h-full w-full object-contain p-6 transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">

          {/* Categoría */}
          <span className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-primary">
            {product.category || "General"}
          </span>

          {/* Nombre */}
          <h1 className="text-4xl font-black leading-tight text-foreground">
            {product.name}
          </h1>

          {/* Descripción */}
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Precio */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-4xl font-black text-foreground">
              ${product.price}
            </span>

            {hasDiscount && (
              <span className="text-xl text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="mt-4">
            <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-500">
              Stock disponible: {product.stock}
            </span>
          </div>

          {/* Botones */}
          <div className="mt-10 flex gap-4">

            <button
              onClick={() =>
                addToCart && addToCart(product)
              }
              className="flex-1 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
            >
              Añadir al carrito
            </button>

            <button
              onClick={() =>
                addToFavorites(product)
              }
              className="rounded-xl border border-border bg-secondary px-6 py-4 text-xl transition-all duration-300 hover:border-red-400 hover:text-red-500"
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