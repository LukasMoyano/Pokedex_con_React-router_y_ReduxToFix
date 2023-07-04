import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonComponent = () => {
  const [pokemons, setPokemons] = useState([]);

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

  return (
    <div>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemonUrl={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonComponent;
