import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from "./pages/Favorites";
import About from './pages/About'
import SearchPage from "./pages/Search";
import AllRecipes from './pages/AllRecipes'
import Footer from './components/Footer';

export default function App(){
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipes' element={<AllRecipes />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='/about' element={<About />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Footer/>
      </main>

    </div>
  )
}
