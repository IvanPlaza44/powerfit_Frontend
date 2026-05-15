import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";
import Home from "./views/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<DetailProduct />} />
    </Routes>
  );
}

export default App;