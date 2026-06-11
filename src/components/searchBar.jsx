import React, { useState } from 'react';
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ isSeller, formClassName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const basePath = isSeller ? "/my-products" : "/products";

    if (searchQuery.trim() !== "") {
      navigate(`${basePath}?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(basePath);
    }
  };

  return (
    <form onSubmit={handleSearch} className={formClassName}>
      <div className="relative w-full">
        <Search onClick={handleSearch} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer" />
        <input
          type="search"
          placeholder={isSeller ? "Buscar en mis productos..." : "Buscar productos..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border-0 bg-secondary py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary"
        />
      </div>
    </form>
  );
}