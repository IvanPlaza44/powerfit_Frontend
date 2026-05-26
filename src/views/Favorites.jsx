import React from "react";
import Card from "../components/Card"; // Asegúrate de que la ruta a tu componente Card sea la correcta

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-black uppercase tracking-wide mb-6 border-b pb-4 border-border">
        Mis favoritos
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl max-w-2xl mx-auto">
          <p className="text-muted-foreground">No tenés productos guardados en favoritos.</p>
        </div>
      ) : (
        /* Renderizamos la misma grilla que usa tu catálogo general */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {favorites.map((product) => (
            <Card
              key={product.id}
              product={product}
              /* Al clickear el corazón dentro de favoritos, se ejecutará la eliminación */
              addToFavorites={() => removeFromFavorites(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;