import Card from "../components/Card";

const CardList = ({ products, addToFavorites, addToCart }) => {
  return (
    /* Cambiamos el div plano por una grilla responsiva */
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default CardList;