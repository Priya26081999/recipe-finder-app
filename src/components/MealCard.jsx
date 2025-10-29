
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function MealCard({ meal, onOpen }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(stored.some((fav) => fav.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = () => {
    let stored = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      stored = stored.filter((fav) => fav.idMeal !== meal.idMeal);
    } else {
      stored.push({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(stored));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1">
    
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-black/60 p-2 rounded-full hover:bg-black/80 transition"
      >
        <Heart
          size={26}
          className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-200"}
        />
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg mb-4 text-center">
          {meal.strMeal}
        </h3>
        <button
          onClick={() => onOpen(meal.idMeal)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-all"
        >
          View Full Recipe
        </button>
      </div>
    </div>
  );
}
