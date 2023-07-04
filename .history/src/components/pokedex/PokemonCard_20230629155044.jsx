import React, { useState, useEffect } from "react";
import axios from "axios";

// Función para generar colores aleatorios
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
  grass: "rounded-tl-4xl rounded-tr-4xl bg-gradient-to-b from-green-300 to-yellow-200",
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
      {/* Seccion superior */}
      <section
        className="bg-gradient-to-t from-black to-green-400"
        style={{
          width: "261px",
          height: "128px",
          flexShrink: 0,
          borderRadius: "4px 4px 0px 0px",
          background:
            "linear-gradient(180deg, #7EC6C5 0%, #ABDAC6 47.92%, #CAE099 100%)",
        }}
      >
        <div>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      {/* Seccion inferior */}
      <section>
        <h3>{pokemon?.name}</h3>
        <h5>{formatTypesPokemon(pokemon?.types)}</h5>
        <span>Type</span>

        <hr />

        {/* Generar la lista de Stats */}
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