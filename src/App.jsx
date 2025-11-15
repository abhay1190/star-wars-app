import { useState, useEffect, useMemo } from 'react';
import { checkAuth, logout } from './utils/auth';
import { useCharacters } from './hooks/useCharacters';
import Login from './components/Login';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import Pagination from './components/Pagination';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHomeworld, setSelectedHomeworld] = useState('');
  const [selectedFilm, setSelectedFilm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');

  const { characters, loading, error, pagination } = useCharacters(currentPage);

  useEffect(() => {
    const isAuth = checkAuth();
    setIsAuthenticated(isAuth);
  }, []);

  // Extract unique values for filters
  const { homeworlds, films, species } = useMemo(() => {
    const homeworldSet = new Set();
    const filmSet = new Set();
    const speciesSet = new Set();

    characters.forEach((char) => {
      if (char.homeworldDetails) {
        homeworldSet.add(char.homeworldDetails.name);
      }
      char.speciesDetails?.forEach((sp) => speciesSet.add(sp.name));
    });

    return {
      homeworlds: Array.from(homeworldSet).sort(),
      films: Array.from(filmSet).sort(),
      species: Array.from(speciesSet).sort()
    };
  }, [characters]);

  // Filter and search characters
  const filteredCharacters = useMemo(() => {
    return characters.filter((char) => {
      const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesHomeworld = !selectedHomeworld || char.homeworldDetails?.name === selectedHomeworld;
      const matchesSpecies = !selectedSpecies || char.speciesDetails?.some(sp => sp.name === selectedSpecies);
      
      return matchesSearch && matchesHomeworld && matchesSpecies;
    });
  }, [characters, searchTerm, selectedHomeworld, selectedSpecies]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedHomeworld('');
    setSelectedFilm('');
    setSelectedSpecies('');
  };

  const totalPages = Math.ceil(pagination.count / 10);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 relative z-10 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 tracking-wider">
              STAR WARS
            </h1>
            <p className="text-yellow-400/70 text-sm tracking-widest mt-1">CHARACTER DATABASE</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl transition transform hover:scale-105 font-semibold shadow-lg"
          >
            🚪 Logout
          </button>
        </div>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <Filters
          homeworlds={homeworlds}
          films={films}
          species={species}
          selectedHomeworld={selectedHomeworld}
          selectedFilm={selectedFilm}
          selectedSpecies={selectedSpecies}
          onHomeworldChange={setSelectedHomeworld}
          onFilmChange={setSelectedFilm}
          onSpeciesChange={setSelectedSpecies}
          onClearFilters={handleClearFilters}
        />

        {loading && (
          <div className="text-center py-32">
            <div className="inline-block relative">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-4 border-yellow-400 opacity-20"></div>
            </div>
            <p className="text-yellow-400 mt-6 text-xl font-semibold tracking-wide">Loading characters from a galaxy far, far away...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border-2 border-red-500 text-white px-8 py-6 rounded-xl backdrop-blur-sm">
            <p className="font-bold text-xl mb-2">⚠️ Error:</p>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {!loading && !error && filteredCharacters.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-yellow-400 text-2xl font-semibold">No characters found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {!loading && !error && filteredCharacters.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  speciesName={character.speciesDetails?.[0]?.name || 'Unknown'}
                  onClick={() => setSelectedCharacter(character)}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              hasNext={!!pagination.next}
              hasPrevious={!!pagination.previous}
            />
          </>
        )}

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
      
      <style>{`
        .stars, .stars2, .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><circle cx="1" cy="1" r="1" fill="white" opacity="0.3"/></svg>') repeat;
          animation: animateStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3"><circle cx="1.5" cy="1.5" r="1" fill="white" opacity="0.2"/></svg>') repeat;
          animation: animateStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="4" height="4"><circle cx="2" cy="2" r="1.5" fill="white" opacity="0.1"/></svg>') repeat;
          animation: animateStars 150s linear infinite;
        }
        
        @keyframes animateStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
      `}</style>
    </div>
  );
}

export default App;
