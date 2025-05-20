export function Search({ query, setQuery }) {
  //Stateful Comps (removed the states)
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
