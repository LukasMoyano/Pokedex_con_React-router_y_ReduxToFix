import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";

const PokemonsList = ({ pokemons }) => {
  const itemsPerPage = 6;
  const [pageNumber, setPageNumber] = useState(0);

  // Función para manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  // Obtener la lista de pokémon correspondiente a la página actual
  const paginatedPokemons = pokemons.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  // Restablecer la página actual cuando cambia la lista de pokémon
  useEffect(() => {
    setPageNumber(0);
  }, [pokemons]);

  return (
    <div className="flex flex-wrap justify-center">
      {/* Mapear y mostrar las cartas de pokémon */}
      {paginatedPokemons.map((pokemon) => (
        <div
          key={pokemon.url}
          className="w-64 max-h flex-shrink-0 m-4 border border-gray-300 rounded-lg"
        >
          <PokemonCard key=pokemon.url pokemonUrl={pokemon.url} />
        </div>
      ))}

      {/* Mostrar paginación si hay más de una página */}
      {pokemons.length > itemsPerPage && (
        <div className="w-full flex justify-center mt-4">
          <nav
            className="relative z-0 inline-flex shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Botón de página anterior */}
            <button
              onClick={() => setPageNumber((prevPage) => prevPage - 1)}
              className={`whitespace-nowrap inline-flex items-center justify-center py-2 px-3 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 ${
                pageNumber === 0 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={pageNumber === 0}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d=""
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="flex items-center justify-center bg-white border-t border-b border-gray-300 py-2 px-4">
              {/* Botones de páginas */}
              {Array.from(
                Array(Math.ceil(pokemons.length / itemsPerPage)).keys()
              ).map((page, index) => (
                <button
                  key={index}
                  onClick={() => setPageNumber(page)}
                  className={`whitespace-nowrap inline-flex items-center justify-center py-2 px-3 border border-gray-300 text-sm font-medium ${
                    pageNumber === page
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
            {/* Botón de página siguiente */}
            <button
              onClick={() => setPageNumber((prevPage) => prevPage + 1)}
              className={`whitespace-nowrap inline-flex items-center justify-center py-2 px-3 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 ${
                pageNumber === Math.ceil(pokemons.length / itemsPerPage) - 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={
                pageNumber === Math.ceil(pokemons.length / itemsPerPage) - 1
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PokemonsList;
