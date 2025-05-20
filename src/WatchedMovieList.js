import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchedMovie key={i} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}
