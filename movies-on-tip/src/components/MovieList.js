import React from 'react';

const MovieList = (movie) => {
    let img_path = "https://image.tmdb.org/t/p/w500";
    const FavouriteComponent = movie.favouriteComponent;
    return (
        <>

            {movie.info.map((movies, index) => (
                <div className='image-container' d-flex justify-content-start m-3 >
                    <div classname="container" onClick={() => movie.handleFavouritesClick(movies)}>
                        <img src={img_path + movies.poster_path} className="poster" alt='Poster'></img>
                        <div className="overview">
                            <h1>overview</h1>
                            {movies.overview}
                        </div>
                        <div className="movie-details" >
                            <div className="box">
                                <h4 className="title">{movies.title}</h4>
                                <p className="rating" >{movies.vote_average}</p>

                            </div>
                        </div>

                    </div>
                    <FavouriteComponent />
                </div>
            ))}
        </>
    );
};

export default MovieList;