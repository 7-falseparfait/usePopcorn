import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchedMovie key={i} movie={movie} />
      ))}
    </ul>
  );
}
