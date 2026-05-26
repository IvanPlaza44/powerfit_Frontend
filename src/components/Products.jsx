import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardList from "../views/CardList";

const Products = ({ addToFavorites, addToCart }) => {

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const currentCategory = searchParams.get("category");
  const currentSearch = searchParams.get("search"); // 1. Capturamos lo que viene de la barra de búsqueda

  const categoryImages = {
    indumentaria:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop",

    suplementos:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=1000&auto=format&fit=crop",

    equipamiento:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
  };

  useEffect(() => {
      fetch("http://localhost:4002/products")
        .then((res) => res.json())
        .then((data) => {
          console.log("Producto Muestra:", data.content[0]);
          let filtered = data.content;

          // 2. Filtro por Categorías
          if (currentCategory) {
            filtered = filtered.filter((p) => {
              const productCat = p.category?.description ? String(p.category.description).toLowerCase() : "";
              const searchCat = currentCategory ? String(currentCategory).toLowerCase() : "";
              
              return productCat.includes(searchCat) || searchCat.includes(productCat);
            });
          }

          //  3. NUEVO: Filtro por la barra de búsqueda del NavBar
          if (currentSearch) {
            const query = currentSearch.toLowerCase();
            filtered = filtered.filter((p) => {
              const name = p.name ? p.name.toLowerCase() : "";
              const description = p.description ? p.description.toLowerCase() : "";
              // Busca si el término coincide en el nombre O en la descripción del producto
              return name.includes(query) || description.includes(query);
            });
          }

          // Ordenar por precio
      if (sortOrder === "asc") {
        filtered = [...filtered].sort((a, b) => {

          const finalPriceA =
            a.discount > 0
              ? a.price - (a.price * a.discount) / 100
              : a.price;

          const finalPriceB =
            b.discount > 0
              ? b.price - (b.price * b.discount) / 100
              : b.price;

          return finalPriceA - finalPriceB;
        });
      }

      if (sortOrder === "desc") {
        filtered = [...filtered].sort((a, b) => {

          const finalPriceA =
            a.discount > 0
              ? a.price - (a.price * a.discount) / 100
              : a.price;

          const finalPriceB =
            b.discount > 0
              ? b.price - (b.price * b.discount) / 100
              : b.price;

          return finalPriceB - finalPriceA;
        });
      }

          setProducts(filtered);
        })
        .catch(() => setProducts([]));
    }, [currentCategory, currentSearch, sortOrder]);

  const bannerImage = currentCategory
    ? categoryImages[currentCategory]
    : "https://images.unsplash.com/photo-1517834483737-3015b90bb58e?q=80&w=1000&auto=format&fit=crop";

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
          <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
            {/* Si está buscando algo, mostramos qué está buscando en el título principal */}
            {currentSearch ? `Resultados para: "${currentSearch}"` : (currentCategory || "Todos los productos")}
          </h1>
        </div>

      </div>

      {/* Botón filtros */}
      <div className="mb-6">
        <button
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Ordenar
        </button>
      </div>

      {/* Panel filtros */}
      {showFilters && (
        <div className="mb-6 border border-border p-4 rounded-xl bg-card">

          <label className="block mb-2 font-semibold">
            Ordenar por precio
          </label>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
            className="w-full p-2 rounded bg-background border border-border"
          >

            <option value="">
              Sin ordenar
            </option>

            <option value="asc">
              Menor a mayor
            </option>

            <option value="desc">
              Mayor a menor
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