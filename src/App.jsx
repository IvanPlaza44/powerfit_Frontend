import { Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products/:id" element={<DetailProduct />} />
    </Routes>
  );
}

export default App;