import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../views/CardList";
import productsData from "../mocks/products";

const Products = ({ addToFavorites, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState("");

  const currentCategory = searchParams.get("category");

  const categoryImages = {
    indumentaria:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",
    suplementos:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1000&auto=format&fit=crop",
    equipamiento:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
  };

  useEffect(() => {
    let filteredProducts = productsData;

    // filtro por categoría (navbar)
    if (currentCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === currentCategory
      );
    }

    // filtro por precio
    if (priceFilter === "low") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price < 10000
      );
    }

    if (priceFilter === "medium") {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= 10000 &&
          product.price <= 20000
      );
    }

    if (priceFilter === "high") {
      filteredProducts = filteredProducts.filter(
        (product) => product.price > 20000
      );
    }

    setProducts(filteredProducts);

  }, [searchParams, currentCategory, priceFilter]);

  const bannerImage = currentCategory
    ? categoryImages[currentCategory]
    : "https://images.unsplash.com/photo-1517838483737-3015b90bb58e?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Banner */}
      <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-8 flex items-center p-8 md:p-12 border border-border">
        <img
          src={bannerImage}
          alt={currentCategory || "Todos los productos"}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
        />

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase">
            {currentCategory
              ? currentCategory
              : "Todos los productos"}
          </h1>
        </div>
      </div>

      {/* BOTÓN FILTRAR */}
      <div className="mb-6">
        <button
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Filtrar
        </button>
      </div>

      {/* PANEL FILTRO */}
      {showFilters && (
        <div className="mb-6 border border-border p-4 rounded-xl bg-card">
          <label className="block mb-2 font-semibold">
            Filtrar por precio
          </label>

          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
            className="w-full p-2 rounded bg-background border border-border"
          >
            <option value="">
              Todos los precios
            </option>

            <option value="low">
              Menos de $10.000
            </option>

            <option value="medium">
              Entre $10.000 y $20.000
            </option>

            <option value="high">
              Más de $20.000
            </option>
          </select>
        </div>
      )}

      <p className="mb-6 text-sm text-muted-foreground">
        Cantidad de productos: {products.length}
      </p>

      {products.length > 0 ? (
        <CardList
          products={products}
          addToFavorites={addToFavorites}
          addToCart={addToCart}
        />
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl">
          <h2 className="text-xl font-semibold text-muted-foreground">
            No hay productos con esos filtros
          </h2>
        </div>
      )}
    </div>
  );
};

export default Products;