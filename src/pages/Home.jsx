
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search , ChefHat } from "lucide-react";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/60"></div>

     
      <div className="relative z-10 max-w-2xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Recipe Finder
        </h1>
       ";

<p className="text-lg md:text-xl text-gray-200 mb-8 flex items-center justify-center gap-2">
  <span>Discover, Cook, and Enjoy Delicious Meals from Around the World</span>
  <ChefHat className="w-6 h-6 text-orange-400" />
</p>


      
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/90 rounded-full overflow-hidden shadow-lg max-w-xl mx-auto focus-within:ring-2 focus-within:ring-orange-500 transition"
        >
          <input
            type="text"
            placeholder="Search recipes by name, ingredient, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-3 bg-transparent outline-none text-gray-800 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 flex items-center justify-center transition"
          >
            <Search size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
