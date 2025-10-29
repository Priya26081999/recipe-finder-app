
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, ArrowLeft, Frown } from "lucide-react";
import { searchByName, lookupById } from "../services/api";
import Modal from "../components/Modal";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const data = await searchByName(query);
        if (data?.meals) {
          setResults(data.meals);
          setError("");
        } else {
          setResults([]);
          setError("No recipes found for your search.");
        }
      } catch {
        setError("Something went wrong. Please try again later.");
      }
    };
    fetchResults();
  }, [query]);

 
  const handleOpen = async (idMeal) => {
    setOpen(true);
    setLoading(true);
    setSelectedMeal(null);

    const data = await lookupById(idMeal);
    if (data?.meals && data.meals.length > 0) {
      setSelectedMeal(data.meals[0]);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
       
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Showing results for:{" "}
            <span className="text-orange-500">"{query}"</span>
          </h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition"
          >
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>

       
        {error ? (
          <div className="text-center mt-20">
            <Frown size={60} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              <ArrowLeft size={20} /> Go Back Home
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {results.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {meal.strMeal}
                  </h3>
                  <button
                    onClick={() => handleOpen(meal.idMeal)}
                    className="mt-auto text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md transition"
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      
        <Modal open={open} onClose={handleClose} meal={loading ? null : selectedMeal} />
      </div>
    </div>
  );
};

export default SearchPage;
