import React, { useEffect, useState } from "react";
import CardList from "../views/CardList";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4002/products?page=0&size=20")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.content);
            })
            .catch((error) => {
                console.log("Error al obtener productos", error);
            });
    }, []);

    return (
        <div>
            <h1>Todos los productos</h1>

            <p>Cantidad: {products.length}</p>

            <CardList products={products} />
        </div>
    );
};

export default Products;