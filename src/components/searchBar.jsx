import React, { useState } from "react";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/filterSlice";

export default function SearchBar({ isSeller, formClassName }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const applySearch = (value) => {
    dispatch(setSearch(value.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applySearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      <div className="relative w-full">

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

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

            if (val === "") {
              dispatch(setSearch(""));
            }
          }}
          className="w-full bg-secondary py-2 pl-10 pr-4 rounded-md"
        />
      </div>
    </form>
  );
}