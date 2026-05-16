import { Routes, Route } from "react-router-dom";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./components/Products";
import DetailProduct from "./views/DetailProduct";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      {/* navbar arriba en todas las páginas */}
      <NavBar />

      <Routes>
        {/* home */}
        <Route path="/" element={<Home />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* marketplace */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<DetailProduct />} />

        {/* opcional para probar error */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;