import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const pokeLinearGradients = async () => {
    try {
      const colorData = await axios.get('https://pokeapi.co/api/v2/pokemon-color/black');
      const colors = colorData.data.pokemon_species.map((species) => species.name);
      
      const gradients = {};
      colors.forEach((color) => {
        gradients[color] = `bg-gradient-to-t from-black to-${color}-500`;
      });
      
      return gradients;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleTypes = nameTypes.join(" / ");
    return titleTypes;
  };

  useEffect(() => {
    axios.get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    pokeLinearGradients()
      .then((gradients) => {
        // Actualiza el estado con los fondos según el tipo de Pokémon
        setGradients(gradients);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <article>
      <h2>{pokemon?.name}</h2>
      <section className={`${gradients[pokemon?.types?.[0]?.type?.name] || ''}`}>
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
