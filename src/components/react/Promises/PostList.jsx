import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para el loading

    const URL = "https://jsonplaceholder.typicode.com";

    useEffect(() => {
        fetch(`${URL}/posts`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al cargar los datos", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando publicaciones...</p>;

    return (
        <>
            <h1>Publicaciones</h1>
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                />
            ))}
        </>
    );
};

export default PostList;