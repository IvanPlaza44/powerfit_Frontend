import Card from "../components/Card";

const CardList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products.map((product) => (
        <Card
          key={product.id}
          product={product}
          //addToFavorites={addToFavorites}
          //addToCart={addToCart}
          //setMessage={setMessage}
          //setMessageType={setMessageType}
        />
      ))}
    </div>
  );
};

export default CardList;