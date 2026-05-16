import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../views/CardList";
import productsData from "../mocks/products";

const Products = ({ addToFavorites }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");

    // mostrar todos
    if (!category) {
      setProducts(productsData);
      return;
    }

    // filtrar por categoría
    const filteredProducts = productsData.filter(
      (product) => product.category === category
    );

    setProducts(filteredProducts);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Todos los productos
      </h1>

      {searchParams.get("category") && (
        <p className="mb-4 text-green-500 font-semibold">
          Categoría seleccionada: {searchParams.get("category")}
        </p>
      )}

      <p className="mb-6">
        Cantidad de productos: {products.length}
      </p>

      {products.length > 0 ? (
        <CardList
          products={products}
          addToFavorites={addToFavorites}
        />
      ) : (
        <h2>No hay productos en esta categoría</h2>
      )}
    </div>
  );
};

export default Products;