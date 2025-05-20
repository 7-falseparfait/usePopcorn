import { Movie } from "./Movie";

export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie, i) => (
        <Movie key={i} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
