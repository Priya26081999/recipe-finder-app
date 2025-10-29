
import React from "react";
 import { X } from "lucide-react";

export default function Modal({ open, onClose, meal }) {
  if (!open) return null;

 
  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const meas = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${ing}${meas ? " — " + meas.trim() : ""}`);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

    
      <div className="relative z-10 w-full max-w-3xl bg-gray-900 text-gray-100 rounded-2xl shadow-lg overflow-auto max-h-[90vh] p-6">
      

<button
  onClick={onClose}
  className="absolute top-4 right-4 text-gray-300 hover:text-white transition-transform hover:scale-110"
  aria-label="Close"
>
  <X className="w-6 h-6" />
</button>


        {!meal ? (
          <p className="text-center py-8">Loading...</p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
                <p className="text-sm text-gray-400 mt-1">
                  {meal.strCategory} • {meal.strArea}
                </p>

                <h3 className="mt-4 font-semibold">Ingredients</h3>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  {ingredients.length === 0 ? (
                    <li>No ingredients found</li>
                  ) : (
                    ingredients.map((it, idx) => <li key={idx}>{it}</li>)
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Instructions</h3>
              <p className="mt-2 whitespace-pre-line text-sm text-gray-200">
                {meal.strInstructions}
              </p>
            </div>

            {meal.strYoutube && (
              <div className="mt-4">
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-yellow-300 underline"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
