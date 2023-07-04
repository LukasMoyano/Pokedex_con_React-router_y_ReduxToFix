import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import ReactPaginate from 'react-paginate';

const PokemonComponent = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;
  const columns = 3;

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

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const startIndex = pageNumber * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemons = pokemons.slice(startIndex, endIndex);

  const renderPokemonCards = () => {
    return paginatedPokemons.map((pokemon, index) => (
      <PokemonCard key={index} pokemonUrl={pokemon.url} />
    ));
  };

  const renderPagination = () => {
    const pageCount = Math.ceil(pokemons.length / itemsPerPage);

    return (
      <ReactPaginate
        previousLabel={<span className="material-icons">chevron_left</span>}
        nextLabel={<span className="material-icons">chevron_right</span>}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
      />
    );
  };

  return (
    <div className="flex flex-wrap justify-center">
      {renderPokemonCards()}

      {pokemons.length > itemsPerPage && (
        <div className="w-full flex justify-center mt-4">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default PokemonComponent;
