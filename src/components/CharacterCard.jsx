import { useMemo, useState } from "react";
import { getSpeciesColor } from "../utils/colors";

const FALLBACK_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

const CharacterCard = ({ character, speciesName, onClick }) => {
  const randomImageId = useMemo(() => Math.floor(Math.random() * 1000), []);
  const colorClass = getSpeciesColor(speciesName);
  const [src, setSrc] = useState(
    `https://picsum.photos/seed/${encodeURIComponent(
      character.name + randomImageId
    )}/400/300`
  );

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded-xl bg-gray-900 shadow-lg hover:shadow-yellow-500/30 
                 overflow-hidden border border-gray-700 hover:border-yellow-500/40 
                 transition-all p-4 m-2"
    >
      {/* IMAGE */}
      <div className={`relative w-full h-44 overflow-hidden ${colorClass}`}>
        <img
          src={src}
          alt={character.name}
          loading="lazy"
          onError={() => setSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover block"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* TEXT */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-yellow-300 mb-1">
          {character.name}
        </h3>

        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-500">Species: </span>
          <span className="text-yellow-400">{speciesName || "Unknown"}</span>
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
