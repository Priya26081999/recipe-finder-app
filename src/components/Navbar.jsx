import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home,Info, BookOpen, UtensilsCrossed, Heart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-5 py-4 flex justify-between items-center">
       
        <div className="flex items-center gap-2">
          <UtensilsCrossed size={28} className="text-yellow-200" />
          <h1 className="text-2xl font-semibold tracking-wide">Recipe Finder</h1>
        </div>

      
        <ul className="hidden md:flex space-x-10 text-medium font-medium">
          <li className="flex items-center gap-1 hover:text-yellow-200 transition-all duration-200 cursor-pointer">
            <Home size={20} /> <Link to="/"> Home</Link>
          </li>
          <li className="flex items-center gap-1 hover:text-yellow-200 transition-all duration-200 cursor-pointer">
            <BookOpen size={20} /> <Link to="/recipes"> All Recipes</Link>
          </li>
          <li className="flex items-center gap-1 hover:text-yellow-200 transition-all duration-200 cursor-pointer">
            <Heart size={20} /> <Link to="/favorites">Favourites</Link>
          </li>
          <li className="flex items-center gap-1 hover:text-yellow-200 transition-all duration-200 cursor-pointer">
            <Info size={20} /> <Link to="/about">About</Link>
          </li>
        </ul>

      
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 px-6 py-5 space-y-4 text-lg font-medium shadow-inner">
          <div className="flex items-center gap-2 hover:text-yellow-200 cursor-pointer transition-all">
            <Home size={20} /> <Link to="/">Home</Link>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-200 cursor-pointer transition-all">
            <BookOpen size={20} /> <Link to="/recipes">All Recipes</Link>
          </div>
          <div className="flex items-center gap-2 hover:text-yellow-200 cursor-pointer transition-all">
            <Info size={20} /> <Link to="/about">About</Link>
          </div>
         
        </div>
      )}
    </nav>
  );
};

export default Navbar;
