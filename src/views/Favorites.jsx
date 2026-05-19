const Favorites = ({
  favorites,
  removeFromFavorites
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Mis favoritos
      </h1>

      {favorites.length === 0 ? (
        <p>No hay productos favoritos</p>
      ) : (
        favorites.map((product) => (
          <div
            key={product.id}
            className="border p-4 mb-4"
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            <button
              onClick={() =>
                removeFromFavorites(product.id)
              }
              className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
            >
              Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;