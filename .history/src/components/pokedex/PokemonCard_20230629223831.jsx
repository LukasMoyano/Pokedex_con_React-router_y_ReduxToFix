import { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemon = (types) => {
    const nameTypes = types.map((type) => type.type.name);
    return nameTypes.join("/");
  };

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.log(error));
  }, [pokemonUrl]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <div className="bg-gradient-to-t from-black to-green-500">
        <div>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </div>

      <section>
        <h3>{pokemon?.name}</h3>
        <h5>{formatTypesPokemon(pokemon?.types)}</h5>
        <span>Type</span>

        <hr />

        <section>
          {pokemon?.stats.slice(0, 4).map((stat) => (
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
