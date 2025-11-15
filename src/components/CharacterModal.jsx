import { useEffect } from 'react';
import { formatDate, formatHeight, formatMass, formatPopulation } from '../utils/format';

const CharacterModal = ({ character, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!character) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-start mb-8 pb-6 border-b border-yellow-500/30">
            <h2 
              id="modal-title"
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500"
            >
              {character.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-yellow-400 text-3xl font-bold transition-colors hover:rotate-90 transform duration-300"
            >
              ×
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-bold text-yellow-400 mb-3 tracking-wide">CHARACTER INFO</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="font-semibold text-yellow-400/80">Height:</span>
                  <span className="text-gray-300">{formatHeight(character.height)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="font-semibold text-yellow-400/80">Mass:</span>
                  <span className="text-gray-300">{formatMass(character.mass)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="font-semibold text-yellow-400/80">Birth Year:</span>
                  <span className="text-gray-300">{character.birth_year}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="font-semibold text-yellow-400/80">Date Added:</span>
                  <span className="text-gray-300">{formatDate(character.created)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-yellow-400/80">Films:</span>
                  <span className="text-gray-300 bg-yellow-500/20 px-3 py-1 rounded-full font-bold">
                    {character.films.length}
                  </span>
                </div>
              </div>
            </div>

            {character.homeworldDetails && (
              <div className="space-y-4 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-bold text-yellow-400 mb-3 tracking-wide">HOMEWORLD</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="font-semibold text-yellow-400/80">Name:</span>
                    <span className="text-gray-300">{character.homeworldDetails.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="font-semibold text-yellow-400/80">Terrain:</span>
                    <span className="text-gray-300">{character.homeworldDetails.terrain}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                    <span className="font-semibold text-yellow-400/80">Climate:</span>
                    <span className="text-gray-300">{character.homeworldDetails.climate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-yellow-400/80">Population:</span>
                    <span className="text-gray-300">{formatPopulation(character.homeworldDetails.population)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CharacterModal;
