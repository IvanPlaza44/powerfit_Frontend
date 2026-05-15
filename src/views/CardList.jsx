import Card from "../components/Card";

const CardList = ({ products }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}
    >
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CardList;