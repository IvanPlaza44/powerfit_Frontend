import { useEffect} from "react";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../redux/favoritesSlice";
import { removeFavoriteAsync } from "../redux/favoritesSlice";

const Favorites = () => {
    const dispatch = useDispatch();
    const {favorites,error,loading} = useSelector((state)=>state.favorites)

    useEffect(()=>{
      dispatch(fetchFavorites())
    },[dispatch])
    
    const handleRemoveFavorite = (favoriteId) => {
        dispatch(removeFavoriteAsync(favoriteId));
      };
      
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-black uppercase tracking-wide mb-6 border-b pb-4 border-border">
        Mis favoritos
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl max-w-2xl mx-auto">
          <p className="text-muted-foreground">No tenés productos guardados en favoritos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {favorites.map((fav) => (
          <div key={fav.id} className="relative" >
            <button
              onClick={() => handleRemoveFavorite(fav.id)}
className="absolute top-2 left-2 z-20 bg-red-500 text-white rounded-full w-8 h-8"            >
              ✕
            </button>
            <Card product={fav.product} />

          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;