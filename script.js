let filmId = []
const inputSearchEl = document.getElementById('input-search')
const searchBtnEl = document.getElementById('search-btn')

searchBtnEl.addEventListener('click', async (e) => {
  e.preventDefault()
  const searchValue = inputSearchEl.value
  const response = await fetch(`https://www.omdbapi.com/?apikey=184cd917&s=${searchValue}&type=movie`)
  const data = await response.json()
  console.log(data.Search);




})