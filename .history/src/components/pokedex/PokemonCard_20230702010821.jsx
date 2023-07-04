import React, { useEffect, useState } from "react";
import axios from "axios";

const pokeLinearGradients = {
  grass:
    "border-t border-l border-r border-gray-400 rounded-t-lg bg-gradient-to-b from-teal-400 to-green-400",
  fire: "rounded-t-md bg-gradient-to-b from-red-500 via-red-600 to-yellow-500",
  water: "bg-gradient-to-b from-blue-900 to-blue-100",
  bug: "bg-gradient-to-b from-green-500 to-lime-300",
  flying: "bg-gradient-to-l from-red-700 via-pink-600 to-red-900",
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
  ground: "bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-500",
  psychic: "bg-gradient-to-b from-purple-700 via-purple-500 to-pink-500",
  normal: "bg-gradient-to-b from-indigo-700 via-purple-500 to-pink-300",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map((type) => type.type.name);
    const titleTypes = nameTypes.join(" / ");
    return titleTypes;
  };
  

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
<article className="">
  <section className={`relative h-40 ${pokeLinearGradients[pokemon?.types[0]?.type?.name]}`}>
    <div className="absolute p-12 -bottom-20">
      <img
        src={pokemon?.sprites?.other["official-artwork"].front_default}
        alt={pokemon?.name}
      />
    </div>
  </section>
  
  
  
  {/* Sección NOMBRE */}
  <section>
    <h3 className="mx-auto items-center capitalize hover:uppercase text-center font-bold text-3xl my-5">
      {pokemon?.name}
    </h3>


    {/* TYPE */}
    <span className="flex items-center justify-center ">Type</span>
    <h5 className="text-center font-serif text-sm">
      {formatTypesPokemon(pokemon?.types)}
    </h5>
    <hr />
  </section>
  <hr />



  <section className="whitespace-normal">
  {pokemon?.stats.map((stat) => (
    <div
      className="flex flex-col items-center p-2 border border-gray-300 rounded-lg w-1/2 max-w-xs"
      key={stat.stat.name}
      style={{ backgroundColor: pokeLinearGradients[pokemon?.types[0]?.type?.name] }}
    >
      {/* Tipo de ataque */}
      <h6 className="px-1 bg-gray-800 text-white text-xs w-full text-center">
        {stat.stat.name}
      </h6>
      {/* Fuerza del ataque */}
      <span className="py-0.5 px-1 rounded bg-gray-500 text-white text-xs w-full text-center">
        {stat.base_stat}
      </span>
    </div>
  ))}
</section>



</article>



);
};

export default PokemonCard;
