import React from "react";

const Card = ({ product }) => {
    return (
        <div>
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Stock: {product.stock}</p>
        </div>
    );
};

export default Card;