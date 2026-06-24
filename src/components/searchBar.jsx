import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearch, setCategory } from "../redux/filterSlice";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ isSeller, formClassName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  dispatch(setSearch(searchQuery.trim()));
  dispatch(setCategory(null));

  navigate("/products");
  setSearchQuery("")
};

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className="relative w-70 ml-5">

        <Search onClick={handleSubmit} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          type="search"
          placeholder={
            isSeller
              ? "Buscar en mis productos..."
              : "Buscar productos..."
          }
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value;
            setSearchQuery(val);
          }}
          className="w-full bg-secondary py-2 pl-10 pr-4 rounded-md"
        />
      </div>
    </form>
  );
}