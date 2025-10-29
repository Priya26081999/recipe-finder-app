
import React, { useState, useEffect } from "react";
import { Heart, XCircle } from "lucide-react";
import Modal from "../components/Modal";
import { lookupById } from "../services/api";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

 
  const removeFavorite = (idMeal) => {
    const updated = favorites.filter((fav) => fav.idMeal !== idMeal);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  
  const handleOpen = async (idMeal) => {
    const data = await lookupById(idMeal);
    setSelectedMeal(data?.meals?.[0] || null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-6">
    
      <div className="flex items-center justify-center gap-3 mb-8">
        <Heart size={30} className="text-red-500 fill-red-500" />
        <h1 className="text-3xl font-bold text-gray-800">Your Favorite Recipes</h1>
      </div>

      
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600 mt-20">
          <Heart size={40} className="text-gray-400 mb-3" />
          <p className="text-lg font-medium text-center max-w-md">
            No favorites found yet. Click the <Heart size={16} className="inline text-red-500" /> icons on recipes to save them here!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-44 object-cover"
              />

            
              <button
                onClick={() => removeFavorite(meal.idMeal)}
                className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 p-2 rounded-full text-white transition"
              >
                <XCircle size={20} />
              </button>

              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {meal.strMeal}
                </h3>

                <button
                  onClick={() => handleOpen(meal.idMeal)}
                  className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-medium py-2 rounded-lg hover:from-orange-500 hover:to-red-600 transition"
                >
                  View Full Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        meal={selectedMeal}
      />
    </div>
  );
}
