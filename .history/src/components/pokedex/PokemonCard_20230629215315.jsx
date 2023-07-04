import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleType = nameTypes.join("/");
    return titleType;
  };

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, [pokemonUrl]);
  
  if (!pokemon) {
    return <div>Cargando...</div>;
  }

  return (
    <article>
      <section className="bg-gradient-to-t from-black to-green-400">
        <div>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      <section>
        <h3>{pokemon?.name}</h3>
        <h5>{formatTypesPokemon(pokemon?.types)}</h5>
        <span>Type</span>

        <hr />

        {pokemon?.stats.slice(0, 4).map((stat, index) => (
          <div key={`${stat.stat.name}-${index}`}>
            <h6>{stat.stat.name}</h6>
            <span>{stat.base_stat}</span>
          </div>
        ))}
      </section>
    </article>
  );
};

export default PokemonCard;
