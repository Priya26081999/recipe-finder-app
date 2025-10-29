import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import MealCard from '../components/MealCard'
import Modal from '../components/Modal'
import { searchByName, filterByIngredient, lookupById, filterByCategory } from '../services/api'

export default function Recipes(){
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [detailedMeal, setDetailedMeal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [params] = useSearchParams()

  useEffect(()=>{
    const preset = params.get('filter')
    if(preset === 'veg') fetchVeg()
    else if(preset === 'non-veg') fetchNonVeg()
  },[params])

  async function handleSearch(e){
    e.preventDefault()
    if(!query) return
    setLoading(true)
   
    const byName = await searchByName(query)
    if(byName && byName.meals){
      setMeals(byName.meals)
      setLoading(false)
      return
    }
   
    const byIng = await filterByIngredient(query)
    setMeals(byIng && byIng.meals ? byIng.meals : [])
    setLoading(false)
  }

  async function fetchVeg(){
    setLoading(true)
    const res = await filterByCategory('Vegetarian')
    setMeals(res && res.meals ? res.meals : [])
    setLoading(false)
  }

  async function fetchNonVeg(){
    setLoading(true)
    
    const ch = await filterByCategory('Chicken')
    const bf = await filterByCategory('Beef')
    const combined = []
    if(ch && ch.meals) combined.push(...ch.meals)
    if(bf && bf.meals) combined.push(...bf.meals)
    
    const map = {}
    combined.forEach(m=> map[m.idMeal] = m)
    setMeals(Object.values(map))
    setLoading(false)
  }

  async function openModal(id){
    setOpen(true)
    setDetailedMeal(null)
    const res = await lookupById(id)
    setDetailedMeal(res && res.meals ? res.meals[0] : null)
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="bg-white p-4 rounded shadow mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input value={query} onChange={(e)=> setQuery(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Search ingredient (eg: chicken) or recipe name" />
          <button className="px-4 py-2 bg-primary text-white rounded">Search</button>
        </form>
        <div className="mt-4 flex gap-2">
          <button onClick={fetchVeg} className="px-3 py-1 border rounded bg-primary/10 text-primary">Veg</button>
          <button onClick={fetchNonVeg} className="px-3 py-1 border rounded bg-primary/10 text-primary">Non-Veg</button>
        </div>
      </div>

      {loading ? <p className="text-center text-gray-500">Loading…</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals && meals.length>0 ? meals.map(m=>(
            <MealCard key={m.idMeal} meal={m} onOpen={openModal} />
          )) : <p className="text-gray-500">No meals found. Try different keywords like "chicken" or "Arrabiata".</p>}
        </div>
      )}

      <Modal open={open} onClose={()=> setOpen(false)} meal={detailedMeal} />
    </div>
  )
}
