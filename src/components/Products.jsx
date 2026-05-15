import React, { useEffect, useState } from "react";
import CardList from "../views/CardList";
import productsData from "../mocks/products";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div>
      <h1>Todos los productos</h1>
      <p>Cantidad: {products.length}</p>

      <CardList products={products} />
    </div>
  );
};

export default Products;