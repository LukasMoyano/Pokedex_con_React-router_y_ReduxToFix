import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import PokemonComponent from './PokemonComponent';


function getRandomColors() {
  const colors = [
    "red",
    "yellow",
    "blue",
    "green",
    "purple",
    "pink",
    "indigo",
    "teal",
    "gray",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex];
  return `from-${randomColor}-500 to-${randomColor}-300`;
}

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleTypes = nameTypes.join("/");
    return titleTypes;
  };

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((response) => {
        if (response.data) {
          setPokemon(response.data);
        }
      })
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
            src={pokemon?.sprites?.other["official-artwork"].front_default}
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

PokemonCard.propTypes = {
  pokemonUrl: PropTypes.string.isRequired,
};

export default PokemonCard;
