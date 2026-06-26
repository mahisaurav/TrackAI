function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <label className="text-xs text-zinc-500">Search questions</label>
      <input
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Filter by topic or problem name..."
        className="mt-1.5 w-full cursor-text rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600"
      />
    </div>
  );
}

export default SearchBar;
