import React from "react";
import { UtensilsCrossed, Code2, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-3xl text-center">
       
        <div className="flex flex-col items-center mb-6">
          <UtensilsCrossed className="text-orange-500 mb-3" size={48} />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            About Recipe Finder
          </h1>
        </div>

       
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          <span className="text-orange-400 font-semibold">Recipe Finder</span> is a modern web
          application designed to help food lovers discover, explore, and cook delicious meals from
          around the world. Whether you're craving an Indian curry, Chinese noodles, or a French
          dessert — this app makes it effortless to find recipes using ingredients or cuisine types.
        </p>

      
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code2 className="text-orange-500" size={28} />
            <h2 className="text-xl font-semibold text-white">Built With</h2>
          </div>
          <p className="text-gray-400 text-base">
            React.js, Tailwind CSS, Lucide Icons, and the{" "}
            <span className="text-orange-400 font-semibold">TheMealDB API</span> for fetching
            real-time recipes and details.
          </p>
        </div>

       
        <div className="flex flex-col items-center">
          <Heart className="text-red-500 mb-2 animate-pulse" size={32} />
          <p className="text-gray-400 text-base">
            Crafted with <span className="text-red-400">love</span> and code by{" "}
            <span className="font-semibold text-white">Priya</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
