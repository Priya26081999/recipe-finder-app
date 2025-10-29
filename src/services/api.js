const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function searchByName(name) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`);
  return res.ok ? res.json() : null;
}

export async function filterByIngredient(ing) {
  const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ing)}`);
  return res.ok ? res.json() : null;
}

export async function lookupById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  return res.ok ? res.json() : null;
}

export async function filterByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  return res.ok ? res.json() : null;
}

export async function filterByArea(area) {
  const res = await fetch(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  return res.ok ? res.json() : null;
}
