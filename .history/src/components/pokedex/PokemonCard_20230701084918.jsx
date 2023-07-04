import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getColorData = async (idOrName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${id)`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTypeData = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const pokeLinearGradients = {
    grass: "bg-gradient-to-t from-black to-gree-500",
  fire: "bg-gradient-to-t from-black to-red-500",
  water: "bg-gradient-to-b from-blue-900 to-blue-300",
  bug: "bg-gradient-to-b from-green-500 to-lime-300",
  flying: "bg-gradient-to-b from-pink-700 via-red-600 to-red-700",
  fighting: "bg-gradient-to-b from-brown-700 to-red-500",
  poison: "bg-gradient-to-b from-indigo-700 via-purple-500 to-pink-300",
  ghost: "bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-700",
  rock: "bg-gradient-to-b from-gray-500 via-gray-600 to-gray-200",
  dark: "bg-gradient-to-b from-black via-gray-900 to-gray-500",
  ice: "bg-gradient-to-b from-blue-300 via-blue-400 to-blue-100",
  steel: "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-400",
  dragon: "bg-gradient-to-b from-teal-700 via-teal-500 to-teal-300",
  fairy: "bg-gradient-to-b from-red-700 via-pink-500 to-pink-300",
  electric: "bg-gradient-to-b from-blue-900 via-blue-900 to-blue-300",
  ground: "bg-gradient-to-b from-brown-600 via-brown-400 to-gold-500",
  psychic: "bg-gradient-to-b from-purple-700 via-purple-500 to-pink-500",
  normal: "",     
  };

  const PokemonCard = ({ pokemonUrl }) => {
    const [pokemon, setPokemon] = useState(null);
    const [gradients, setGradients] = useState({});
    const [color, setColor] = useState('');
  
    const formatTypesPokemon = (types = []) => {
      const nameTypes = types.map((type) => type.type.name);
      const titleTypes = nameTypes.join(" / ");
      return titleTypes;
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(pokemonUrl);
          setPokemon(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (pokemonUrl) {
        fetchData();
      }
    }, [pokemonUrl]);
  
    useEffect(() => {
      const fetchGradients = async () => {
        try {
          const typeData = await getTypeData(pokemon?.types?.[0]?.type?.name || '');
          const gradients = {};
  
          typeData.double_damage_to.forEach((type) => {
            gradients[type.name] = `bg-gradient-to-t from-black to-${type.name}-500`;
          });
  
          setGradients(gradients);
        } catch (error) {
          console.log(error);
        }
      };
  
      const fetchColor = async () => {
        try {
          const colorData = await getColorData(pokemon?.species?.url || '');
          setColor(colorData.name);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (pokemon) {
        fetchGradients();
        fetchColor();
      }
    }, [pokemon]);  

  return (
    <article>
      <h2>{pokemon?.name}</h2>
      <section className={`${pokeLinearGradients[pokemon?.types?.[0]?.type?.name] || ''} ${gradients[color] || ''}`}>
        <div>
          <img
            src={pokemon?.sprites?.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      <section>
        <h3>{pokemon?.name}</h3>
        <h5>{formatTypesPokemon(pokemon?.types)}</h5>
        <span>Type</span>

        <hr />

        <section>
          {pokemon?.stats?.slice(0, 4)?.map((stat) => (
            <div key={stat.stat.name}>
              <h6>{stat.stat.name}</h6>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </article>
  );
};

export default PokemonCard;
