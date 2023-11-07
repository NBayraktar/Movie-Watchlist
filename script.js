let movieIds = []
let dataForLocalStor = []
const inputSearchEl = document.getElementById('input-search')
const searchBtnEl = document.getElementById('search-btn')
const mainEl = document.getElementById('main')
const initialContentEl = document.querySelector('.initial-content-wraper')
const watchlistBtnEl = document.getElementById('add-movie-watch-btn')


searchBtnEl.addEventListener('click', async (e) => {
  e.preventDefault()
  const searchValue = inputSearchEl.value
  const response = await fetch(`https://www.omdbapi.com/?apikey=184cd917&s=${searchValue}&type=movie`)
  const data = await response.json()
  if (data.Search) {
    for (let filmId of data.Search) {
      movieIds.push(filmId.imdbID)
    }
    renderMovie()
    inputSearchEl.value = ''
  } else {
    inputSearchEl.placeholder = 'Searching something with no data'
    mainEl.innerHTML = `
      <section class="initial-content-wraper">
        <p class="initial-state-text">Unable to find what you’re looking for. Please try another search!
        </p>
      </section>
    `
    inputSearchEl.value = ''
  }
})

async function renderMovie() {
  initialContentEl.style.display = 'none'
  inputSearchEl.placeholder = 'Search for a movie'
  for (movie of movieIds) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=184cd917&i=${movie}&type=movie&plot=short`)
    const data = await response.json()
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
          <button class="watchlist-btn" data-watchlist="${movie}">Watchlist</button> 
        </div>
        <p class="film-description">${data.Plot}</p>
      </div> 
    </article> 
    <hr class="border-line"/>
    `
  }
  inputSearchEl.addEventListener('focus', clearContent)
}

function clearContent() {
  location.reload()
}

document.addEventListener('click', (e) => {
  if (e.target.dataset.watchlist) {
    dataForLocalStor.push(e.target.dataset.watchlist)
    let removeDublicates = [...new Set(dataForLocalStor)]
    localStorage.setItem("dataForLocalStor", JSON.stringify(removeDublicates))
  }
})