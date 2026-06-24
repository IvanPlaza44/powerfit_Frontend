import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "../redux/communitySlice";
import { useState } from "react";
import { toast } from "react-toastify";

const Community = () => {
  const dispatch = useDispatch();
  

  const posts = useSelector(
    (state) => state.community.posts
  );

  const token = localStorage.getItem("token");

  const username =
    useSelector((state) => state.login.user?.username) ||
    localStorage.getItem("username");

  const isLogged = !!token;

    const IMGBBB_API_KEY = "addff561790a76132ef3c2fbd7b280b3";

    const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
    };

  const [form, setForm] = useState({
    product: "",
    testimonial: "",
    });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
        !form.product ||
        !form.testimonial ||
        !imageFile
    ) {
        toast.error("Debes completar todos los campos", {
              toastId: "fav-seller",
              })
        return;
    }

    try {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBBB_API_KEY}`,
        {
            method: "POST",
            body: imageData,
        }
        );

        const imgbbData = await imgbbRes.json();

        dispatch(
        addPost({
            id: Date.now(),
            user: username || "Usuario PowerFit",
            product: form.product,
            image: imgbbData.data.url,
            testimonial: form.testimonial,
        })
        );

        setForm({
        product: "",
        testimonial: "",
        });

        setImageFile(null);
        setPreviewUrl("");

    } catch (error) {
        toast.error("Error al subir imagen", {
              toastId: "img-error",
              })
    }
    };

    return (
    <div className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-3">
          Comunidad
          <span className="text-green-500">
            {" "}
            PowerFit
          </span>
        </h1>

        <p className="text-gray-400 mb-10">
          Compartí tu experiencia e inspirá a otros.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {posts.map((post) => (
  <div
    key={post.id}
    // Agregamos "relative" aquí para que el botón se posicione correctamente
    className="relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
  >
    {/* Boton para borrar exp */}
    {post.user === username && (
      <button
        onClick={() => handleDelete(post.id)}
        // Subimos el z-index con z-10 para asegurar que quede por encima de la imagen
        className="absolute top-3 right-3 z-10 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
      >
        Borrar
      </button>
    )}

    <div className="md:flex">

                  <img
                    src={post.image}
                    alt={post.product}
                    className="w-full md:w-72 h-72 object-cover"
                  />

                  <div className="p-6 flex-1">

                    <h3 className="font-bold text-xl">
                      {post.user}
                    </h3>

                    <p className="text-green-500 mt-3">
                      Producto:
                    </p>

                    <p className="font-semibold">
                      {post.product}
                    </p>

                    <p className="text-gray-300 mt-5 italic">
                      "{post.testimonial}"
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {isLogged && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-fit">

              <h2 className="text-2xl font-bold text-green-500 mb-5">
                Compartí tu experiencia
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <input
                  type="text"
                  placeholder="Producto"
                  value={form.product}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      product: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded bg-black border border-zinc-700"
                />

                <div>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <label
                        htmlFor="image-upload"
                        className="block w-full cursor-pointer bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded text-center transition"
                    >
                        Seleccionar foto
                    </label>

                    {imageFile && (
                        <p className="text-sm text-green-400 mt-2 text-center">
                        {imageFile.name}
                        </p>
                    )}

                    {previewUrl && (
                        <img
                        src={previewUrl}
                        alt="preview"
                        className="mt-3 w-full h-48 object-cover rounded-lg"
                        />
                    )}
                </div>

                <textarea
                  rows="5"
                  placeholder="Contanos tu experiencia..."
                  value={form.testimonial}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      testimonial:
                        e.target.value,
                    })
                  }
                  className="w-full p-3 rounded bg-black border border-zinc-700"
                />

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded"
                >
                  Publicar experiencia
                </button>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Community;