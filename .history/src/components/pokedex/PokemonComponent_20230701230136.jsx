import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonComponent = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=40');
        const { results } = response.data;
        setPokemons(results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {currentPokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemonUrl={pokemon.url} />
      ))}
      <div className="flex justify-center mt-4">
        {totalPages > 1 && (
          <nav>
            <ul className="flex items-center">
              <li>
                <button
                  className={`mr-2 px-4 py-2 text-white bg-red-500 rounded ${
                    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
              </li>
              {Array.from(Array(totalPages), (item, index) => (
                <li key={index}>
                  <button
                    className={`mr-2 px-4 py-2 text-white bg-red-500 rounded ${
                      currentPage === index + 1 ? 'bg-red-700' : ''
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={`ml-2 px-4 py-2 text-white bg-red-500 rounded ${
                    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PokemonComponent;
