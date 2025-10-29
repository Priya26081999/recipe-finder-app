import React from "react";
import { Heart, Globe, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-gray-300 py-5 px-6 ">
      <div className="max-w-5xl mx-auto text-center space-y-2">
      
        <h2 className="text-2xl font-semibold text-white flex justify-center items-center gap-2">
          <Globe className="text-orange-400" size={22} />
          Recipe Finder
        </h2>

       
        <p className="text-gray-400 max-w-lg mx-auto text-medium sm:text-base leading-relaxed">
          Discover and save your favorite dishes from around the world.  
          Explore endless meal ideas and cook something amazing every day!
        </p>

       
        <div className="w-24 h-[1px] bg-gray-700 mx-auto my-2"></div>

       
        <p className="text-xs sm:text-sm text-gray-400">
          © 2025 <span className="text-orange-400 font-medium">Sheeba Priya</span>.  
          Built with <span className="text-blue-400">React</span> +{" "}
          <span className="text-cyan-400">Tailwind CSS</span> +{" "}
          <span className="text-green-400">TheMealDB API</span>.
        </p>

      
        <div className="flex justify-center gap-4 mt-3">
          <Heart
            size={18}
            className="text-red-500 hover:scale-110 transition-transform"
          />
          <Github
            size={18}
            className="text-gray-400 hover:text-gray-200 hover:scale-110 transition-transform"
          />
          <Globe
            size={18}
            className="text-orange-400 hover:text-orange-300 hover:scale-110 transition-transform"
          />
        </div>
      </div>
    </footer>
  );
}
