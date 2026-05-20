import { Link } from "react-router-dom";

const Card = ({ product, addToFavorites, addToCart }) => {
  // Verificamos si el producto tiene descuento (asumiendo que viene como un porcentaje, ej: 10)
  const hasDiscount = product.discount && product.discount > 0;
  
  // Calculamos el precio original tachado en base al precio final y el porcentaje
  const originalPrice = hasDiscount 
    ? (product.price / (1 - product.discount / 100)).toFixed(0)
    : null;

  return (
    <div className="flex flex-col w-[260px] rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 relative">
      
      {/* Etiqueta de descuento flotante sobre la imagen (Si aplica) */}
      {hasDiscount && (
        <span className="absolute top-7 left-7 z-10 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          -{product.discount}% OFF
        </span>
      )}

      {/* Contenedor de la imagen */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info del producto */}
      <div className="mt-4 flex flex-col flex-grow">
        {/*NUEVO: Categoría visible arriba del nombre */}
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
          {product.category?.name || "General"}
        </span>

        <h2 className="text-base font-bold text-foreground line-clamp-2 min-h-[3rem]">
          {product.name}
        </h2>
        
        {/* Precios combinados */}
        <div className="mt-2 flex items-baseline gap-2">
          {/* Precio actual */}
          <p className="text-lg font-extrabold text-foreground">
            ${product.price}
          </p>
          
          {/* NUEVO: Precio original tachado si hay descuento */}
          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through opacity-70">
              ${originalPrice}
            </p>
          )}
        </div>
      </div>

      {/* Botón de ver detalle */}
      <Link 
        to={`/products/${product.id}`}
        className="mt-4 flex items-center justify-center rounded-md bg-secondary text-xs font-semibold text-foreground border border-border hover:bg-foreground hover:text-background transition-colors h-9"
      >
        Ver detalle
      </Link>

      {/*NUEVO: Fila de acciones (Añadir al carrito + Favoritos compacto) */}
      <div className="mt-2 grid grid-cols-5 gap-2">
        {/* Botón para añadir al carrito */}
        <button
          onClick={() => addToCart && addToCart(product)}
          className="col-span-4 h-9 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/95 transition-colors cursor-pointer shadow-md shadow-primary/10"
        >
          Añadir al carrito
        </button>

        {/* Botón de favoritos transformado en un botón compacto lateral */}
        <button
          onClick={() => addToFavorites(product)}
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