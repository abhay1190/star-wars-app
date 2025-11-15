const Filters = ({ 
  homeworlds, 
  films, 
  species, 
  selectedHomeworld, 
  selectedFilm, 
  selectedSpecies,
  onHomeworldChange,
  onFilmChange,
  onSpeciesChange,
  onClearFilters
}) => {
  return (
    <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-5">
      <select
        value={selectedHomeworld}
        onChange={(e) => onHomeworldChange(e.target.value)}
        className="px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition cursor-pointer"
      >
        <option value="">🌍 All Homeworlds</option>
        {homeworlds.map((hw) => (
          <option key={hw} value={hw}>{hw}</option>
        ))}
      </select>

      <select
        value={selectedFilm}
        onChange={(e) => onFilmChange(e.target.value)}
        className="px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition cursor-pointer"
      >
        <option value="">🎬 All Films</option>
        {films.map((film) => (
          <option key={film} value={film}>{film}</option>
        ))}
      </select>

      <select
        value={selectedSpecies}
        onChange={(e) => onSpeciesChange(e.target.value)}
        className="px-4 py-3 bg-gray-900/80 text-white rounded-xl border border-yellow-500/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition cursor-pointer"
      >
        <option value="">👽 All Species</option>
        {species.map((sp) => (
          <option key={sp} value={sp}>{sp}</option>
        ))}
      </select>

      <button
        onClick={onClearFilters}
        className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl transition transform hover:scale-105 font-semibold shadow-lg"
      >
        ✕ Clear Filters
      </button>
    </div>
  );
};

export default Filters;
