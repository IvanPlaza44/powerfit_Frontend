import { useParams } from "react-router-dom";
import products from "../mocks/products";

const DetailProduct = () => {
  const { id } = useParams();

  const product = products.find(p => p.id === Number(id));

  if (!product) return <h1>Producto no encontrado</h1>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />

      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
};

export default DetailProduct;