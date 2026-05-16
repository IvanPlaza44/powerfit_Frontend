import Card from "../components/Card";

const CardList = ({ products, addToFavorites }) => {
  return (
    <div>
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          addToFavorites={addToFavorites}
        />
      ))}
    </div>
  );
};

export default CardList;