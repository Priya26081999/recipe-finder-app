
import React, { useEffect, useState } from "react";
import { filterByCategory, filterByArea, lookupById } from "../services/api";
import MealCard from "../components/MealCard";
import Modal from "../components/Modal";
import { Globe2, Coffee, UtensilsCrossed, Pizza, Soup, Cake , ChefHat } from "lucide-react";

const AllRecipes = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Popular");
  const [error, setError] = useState("");

  const cuisines = [
    { name: "Indian", icon: UtensilsCrossed },
    { name: "Chinese", icon: Pizza },
    { name: "French", icon: Coffee },
    { name: "Mexican", icon: Soup },
    { name: "Japanese", icon: Globe2 },
    { name: "Dessert", icon: Cake },
  ];

  useEffect(() => {
    fetchDefaultMeals();
  }, []);

  
  const fetchDefaultMeals = async () => {
    try {
      const promises = Array.from({ length: 8 }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) =>
          res.json()
        )
      );

      const results = await Promise.all(promises);
      const allMeals = results.map((r) => r.meals[0]).filter(Boolean);
      setMeals(allMeals);
    } catch {
      setError("Oops! Unable to load recipes. Please try again later.");
    }
  };

  const handleCuisineClick = async (type) => {
    setActive(type);
    setError("");
    setMeals([]);

    try {
      let data;
      if (type === "Dessert") data = await filterByCategory(type);
      else data = await filterByArea(type);

      if (data?.meals?.length > 0) setMeals(data.meals);
      else setError("Oops! No delicious dishes found ");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong fetching these recipes!");
    }
  };

  const openMeal = async (id) => {
    setOpen(true);
    try {
      const data = await lookupById(id);
      setSelectedMeal(data?.meals?.[0] || null);
    } catch {
      setSelectedMeal(null);
      setError("Couldn't load this recipe. Please try another one!");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Explore Recipes from Around the World
      </h1>

    
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {cuisines.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleCuisineClick(name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
              active === name
                ? "bg-orange-500 text-white scale-105 shadow-md"
                : "bg-gray-800 hover:bg-orange-600"
            }`}
          >
            <Icon size={20} /> {name}
          </button>
        ))}
      </div>

    

<p className="text-center text-gray-400 mb-10 text-lg flex justify-center items-center gap-2">
  {active === "Popular" ? (
    <>
      <UtensilsCrossed className="w-5 h-5 text-orange-400" />
      <span>Here are some random popular recipes to get you started</span>
    </>
  ) : (
    <>
      <ChefHat className="w-5 h-5 text-orange-400" />
      <span>Craving something tasty? Choose a cuisine and explore new flavors</span>
    </>
  )}
</p>


      
      {error ? (
        <p className="text-center text-red-400 text-lg mt-6">{error}</p>
      ) : meals?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onOpen={openMeal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-8 animate-pulse">
          Loading recipes...
        </p>
      )}

      <Modal open={open} onClose={() => setOpen(false)} meal={selectedMeal} />
    </div>
  );
};

export default AllRecipes;
