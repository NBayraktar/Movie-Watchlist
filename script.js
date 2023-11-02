let movieIds = []

const inputSearchEl = document.getElementById('input-search')
const searchBtnEl = document.getElementById('search-btn')
const mainEl = document.getElementById('main')
const initialContentEl = document.querySelector('.initial-content-wraper')

searchBtnEl.addEventListener('click', async (e) => {
  e.preventDefault()
  const searchValue = inputSearchEl.value
  const response = await fetch(`https://www.omdbapi.com/?apikey=184cd917&s=${searchValue}&type=movie`)
  const data = await response.json()
  if (data.Search) {
    for (let filmId of data.Search) {
      movieIds.push(filmId.imdbID)
    }
  }
  renderMovie()
  inputSearchEl.value = ''
})

async function renderMovie() {
  initialContentEl.style.display = 'none'
  for (movie of movieIds) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=184cd917&i=${movie}&type=movie&plot=short`)
    const data = await response.json()
    console.log(data);
    mainEl.innerHTML += `
    <article class="article-wraper">
      <div class="art-img-wraper">
        <img src="${data.Poster}" class="art-img"/>
      </div>
      <div>
        <div class="film-title-wraper">
          <h3>${data.Title}</h3><img src="images/icon.png" class="star-icon"/>
          <h5 class="raiting">${data.imdbRating}</h5>
        </div> 
        <div class="film-info-wraper">
          <h5 class="film-info">${data.Runtime}</h5>
          <h5 class="film-info">${data.Genre}</h5>
          <img src="images/add-icon.png" class="add-icon"/>
          <button class="watchlist-btn">Watchlist</button> 
        </div>
        <p class="film-description">${data.Plot}</p>
      </div> 
    </article> 
    <hr class="border-line"/>
    `
  }

}