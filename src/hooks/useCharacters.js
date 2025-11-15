import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export const useCharacters = (page) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_BASE}/people/?page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch characters');
        
        const data = await response.json();
        
        // Fetch additional details for each character
        const charactersWithDetails = await Promise.all(
          data.results.map(async (character) => {
            try {
              // Fetch homeworld
              const homeworldRes = await fetch(character.homeworld);
              const homeworldData = await homeworldRes.json();
              
              // Fetch species
              const speciesData = await Promise.all(
                character.species.map(async (speciesUrl) => {
                  const res = await fetch(speciesUrl);
                  return res.json();
                })
              );
              
              return {
                ...character,
                homeworldDetails: homeworldData,
                speciesDetails: speciesData
              };
            } catch (err) {
              console.error('Error fetching details:', err);
              return character;
            }
          })
        );
        
        setCharacters(charactersWithDetails);
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return { characters, loading, error, pagination };
};
