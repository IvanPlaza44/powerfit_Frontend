import React, { useState } from "react";

const Favorites = () => {
    const [favorites] = useState([]);

    return (
        <div>
            <h1>Mis favoritos</h1>

            {favorites.length === 0 ? (
                <p>No hay productos favoritos</p>
            ) : (
                favorites.map((product) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                    </div>
                ))
            )}
        </div>
    );
};

export default Favorites;