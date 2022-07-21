import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import AddFavourites from './components/AddFavourites';
import MovieListHeading from './components/MovieListHeading';
import RemoveFavourites from './components/RemoveFavourites';

let API_key = "&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
let arr = ["Popular", "Theatre", "Kids", "Drama", "Comedie"];

function App() {
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [search, setSearch] = useState();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch(url_set).then(res => res.json()).then(data => {
      setData(data.results);
    });
  }, [url_set])

  const getData = (movieType) => {
    if (movieType === "Popular") {
      url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
    }
    if (movieType === "Theatre") {
      url = base_url + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" + API_key;
    }
    if (movieType === "Kids") {
      url = base_url + "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" + API_key;
    }
    if (movieType === "Drama") {
      url = base_url + "/discover/movie?with_genres=18&primary_release_year=2014" + API_key;
    }
    if (movieType === "Comedie") {
      url = base_url + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc" + API_key;
    }
    setUrl(url);

  }
  const searchMovie = (evt) => {
    if (evt.key === "Enter") {
      url = base_url + "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" + search;
      setUrl(url);
      setSearch(" ");
    }
  }
  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);

  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );

    setFavourites(newFavouriteList);
  };

  return (
    <>
      <div className="header">
        <nav>
          <ul>
            {
              arr.map((value, pos) => {
                return (
                  <>
                    <li><a href='#' key={pos} name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a></li>
                  </>
                )
              })

            }
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input type="text" placeholder="Enter Movie Name"
              className="inputText" onChange={(e) => { setSearch(e.target.value) }}
              value={search} onKeyPress={searchMovie}>
            </input>
            <button><i className="fas fa-search"></i></button>
          </div>
        </form>
      </div>
      <div className="imageContainer">
        <div className="container">
          <MovieList info={movieData} favouriteComponent={AddFavourites} handleFavouritesClick={addFavouriteMovie} />
        </div>

        <div className='container d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='Favourites' />
        </div>

        <div className='container'>
          <MovieList
            info={favourites}
            favouriteComponent={RemoveFavourites}
            handleFavouritesClick={removeFavouriteMovie}
          />
        </div>
      </div>
    </>
  );
}

export default App;
