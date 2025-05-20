import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import { ErrMessage } from "./ErrMessage";
import { Search } from "./Search";
import { Results } from "./Results";
import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { WatchedMovieList } from "./WatchedMovieList";
import { WatchedSummary } from "./WatchedSummary";

export const KEY = "f2afef59";
export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  /*
  useEffect(function(){
    console.log('After initial Render');
  }, []);

  useEffect(function(){
    console.log('Effect that runs after every render');
  });

  useEffect(function(){
    console.log('Effect that runs when "query" changes');
  }, [query]);

  console.log('during render');
  */
  function handleDeleteMovie(watchedID) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== watchedID)
    );
  }
  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }
  function handleClose() {
    setSelectedID(null);
  }
  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setErrMessage("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("No movies found. Please try a different search.");
          }
          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          setErrMessage(err.message);
        } finally {
          setIsLoading(false);
        }
        if (query.length < 3) {
          setMovies([]);
          setErrMessage("");
          return;
        }
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        {" "}
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Navbar>
      <Main>
        {" "}
        {/* <Box> {isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {errMessage && <ErrMessage errMessage={errMessage} />}
          {!isLoading && !errMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              watched={watched}
              onCloseMovie={handleClose}
              onAddWatched={handleWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
