import { createSlice } from "@reduxjs/toolkit";

const savedPosts =
  JSON.parse(localStorage.getItem("communityPosts")) || [
    {
      id: 1,
      user: "Camila R.",
      product: "Proteína Whey Gold",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      testimonial:
        "Después de dos meses de entrenamiento y una buena alimentación, noté una mejora importante en mi recuperación muscular.",
    },
    {
      id: 2,
      user: "Matías S.",
      product: "Set de Mancuernas Ajustables",
      image:
        "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa",
      testimonial:
        "Me permitió entrenar desde casa sin necesidad de ir al gimnasio. Muy práctico y de excelente calidad.",
    },
  ];

  const communitySlice = createSlice({
    name: "community",
    initialState: {
      posts: savedPosts,
    },

    reducers: {
      addPost: (state, action) => {
        state.posts.unshift(action.payload);

        localStorage.setItem(
          "communityPosts",
          JSON.stringify(state.posts)
        );
      },

      deletePost: (state, action) => {
        const id = action.payload;

        state.posts = state.posts.filter(
          (post) => post.id !== id
        );

        localStorage.setItem(
          "communityPosts",
          JSON.stringify(state.posts)
        );
      },
    },
  });

export const { addPost, deletePost  } = communitySlice.actions;
export default communitySlice.reducer;