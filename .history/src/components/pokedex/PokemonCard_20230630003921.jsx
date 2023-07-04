
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";


fetch('https://pokeapi.co/api/v2/pokemon/?limit=40')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes asignar los valores de la API al objeto 'pokemon'
    pokemon = data;
    console.log(pokemon?.types[0]?.type.name);
  })
  .catch(error => {
    // Manejo de errores en caso de que la solicitud falle
    console.log(error);
  });



console.log(pokemon?.types[0]?.type.name)




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

const pokeLinearGradients = {
  grass: "rounded-tl-xl rounded-tr-xl bg-gradient-to-b from-blue-900 to-blue-300",
  fire: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-red-500 via-orange-500 to-yellow-400",
  water: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-blue-900 to-blue-300",
  bug: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-green-500 to-lime-300",
  flying: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-pink-700 via-red-600 to-red-700",
  fighting: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-brown-700 to-red-500",
  poison: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-indigo-700 via-purple-500 to-pink-300",
  ghost: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-indigo-900 via-blue-900 to-indigo-700",
  rock: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-gray-500 via-gray-600 to-gray-200",
  dark: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-black via-gray-900 to-gray-500",
  ice: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-blue-300 via-blue-400 to-blue-100",
  steel: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-gray-600 via-gray-700 to-gray-400",
  dragon: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-teal-700 via-teal-500 to-teal-300",
  fairy: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-red-700 via-pink-500 to-pink-300",
  electric: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-blue-900 via-blue-900 to-blue-300",
  ground: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-brown-600 via-brown-400 to-gold-500",

  psychic: () => {
    const colors = ["purple-700", "purple-500", "pink-500"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    return `rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-${randomColor}`;
  },

  normal: () => {
    const randomColor = getRandomColors();
    return `rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b ${randomColor}`;
  },
};

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
<div className={pokeLinearGradients[pokemon?.types[0]?.type.name]()}>
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
