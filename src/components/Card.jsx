import { Link } from "react-router-dom";

const Card = ({ product, addToFavorites }) => {
  const hasDiscount = Number(product.discount) > 0;

  const discountPrice = hasDiscount
    ? (product.price - (product.price * product.discount) / 100).toFixed(0)
    : product.price;


    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // 🔥 BLOQUEO TOTAL SI NO HAY SESIÓN
        if (!token || !userId || token === "null" || userId === "undefined") {
          alert("Tenés que iniciar sesión");
          return;
        }

        try {
          const res = await fetch(
            `http://localhost:4002/cart/${userId}/products/${product.id}?quantity=1`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.text();

          if (!res.ok) {
            console.log("ERROR BACK:", data);
            alert(data);
            return;
          }

          alert("Agregado al carrito");
        } catch (err) {
          console.error("Error de red:", err);
          alert("Error de conexión con el servidor");
        }
      };

    return (
    <div className="flex flex-col w-[260px] rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 relative">

      {/* Descuento */}
      {hasDiscount && (
        <span className="absolute top-7 left-7 z-10 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          -{product.discount}% OFF
        </span>
      )}

      {/* Imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
          {product.category?.description || "General"}
        </span>

        <h2 className="text-base font-bold text-foreground line-clamp-2 min-h-[3rem]">
          {product.name}
        </h2>

        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-lg font-extrabold text-foreground">
            ${Number(discountPrice).toLocaleString()}
          </p>

          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through opacity-70">
              ${product.price}
            </p>
          )}
        </div>
      </div>

      {/* Ver detalle */}
      <Link
        to={`/products/${product.id}`}
        className="mt-4 flex items-center justify-center rounded-md bg-secondary text-xs font-semibold text-foreground border border-border hover:bg-foreground hover:text-background transition-colors h-9"
      >
        Ver detalle
      </Link>

      {/* Acciones */}
      <div className="mt-2 grid grid-cols-5 gap-2">

        {/* Carrito */}
        <button
          onClick={handleAddToCart}
          className="col-span-4 h-9 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Añadir al carrito
        </button>

        {/* Favoritos */}
        <button
          onClick={() => addToFavorites?.(product)}
          className="col-span-1 h-9 rounded-md bg-secondary text-foreground hover:text-red-500 border border-border flex items-center justify-center transition-colors cursor-pointer"
          title="Agregar a favoritos"
        >
          ❤️
        </button>

      </div>
    </div>
  );
};

export default Card;