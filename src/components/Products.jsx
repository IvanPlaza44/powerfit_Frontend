import React, { useEffect, useState } from "react";
import CardList from "../views/CardList";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteAsync,
  removeFavoriteAsync,
  fetchFavorites,
} from "../redux/favoritesSlice";
import { fetchProducts } from "../redux/productSlice";
import { setSortOrder } from "../redux/filterSlice";

const Products = () => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);

  const { category, search, sortOrder } = useSelector(
    (state) => state.filter
  );

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const { favorites } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchFavorites());
  }, [dispatch]);

  let filteredProducts = [...products];


  if (category) {
    filteredProducts = filteredProducts.filter((p) => {
      const productCat = p.category?.description?.toLowerCase() || "";
      const selected = category.toLowerCase();

      return productCat.includes(selected);
    });
  }


  if (search) {
    const q = search.toLowerCase();

    filteredProducts = filteredProducts.filter((p) =>
      p.name?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }

  const getFinalPrice = (p) =>
    p.discount > 0
      ? p.price - (p.price * p.discount) / 100
      : p.price;

  if (sortOrder === "asc") {
    filteredProducts.sort(
      (a, b) => getFinalPrice(a) - getFinalPrice(b)
    );
  }

  if (sortOrder === "desc") {
    filteredProducts.sort(
      (a, b) => getFinalPrice(b) - getFinalPrice(a)
    );
  }

 
  const handleAddToFavorites = async (product) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role")?.toUpperCase() || "";

    if (!token || !userId || userId === "undefined") {
      alert("Tenés que iniciar sesión.");
      return;
    }

    if (role.includes("SELLER")) {
      alert("Los vendedores no pueden usar favoritos.");
      return;
    }

    const existing = favorites.find(
      (f) => f.product?.id === product.id
    );

    try {
      if (existing) {
        await dispatch(removeFavoriteAsync(existing.id)).unwrap();
      } else {
        await dispatch(addFavoriteAsync(product)).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold">
          Cargando productos...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          Error: {error}
        </h2>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="relative h-40 md:h-48 rounded-2xl overflow-hidden mb-8 flex items-center p-8 md:p-12 border border-border">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black uppercase text-white">
            {search
              ? search
              : category || "Todos los productos"}
          </h1>
        </div>
      </div>

      {/* BOTÓN ORDENAR */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Ordenar
        </button>
      </div>

      {/* FILTRO SORT */}
      {showFilters && (
        <div className="mb-6 border border-border p-4 rounded-xl bg-card">
          <label className="block mb-2 font-semibold">
            Ordenar por precio
          </label>

          <select
            value={sortOrder}
            onChange={(e) =>
              dispatch(setSortOrder(e.target.value))
            }
            className="w-full p-2 rounded bg-background border border-border"
          >
            <option value="">Sin ordenar</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>
      )}

      <p className="mb-6 text-sm text-muted-foreground">
        Cantidad de productos: {filteredProducts.length}
      </p>

      {/* LISTA */}
      {filteredProducts.length > 0 ? (
        <CardList
          products={filteredProducts}
          addToFavorites={handleAddToFavorites}
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