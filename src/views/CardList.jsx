import React from "react";
import Card from "../components/Card";

const CardList = ({ products }) => {
    return (
        <div>
            {products.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CardList;