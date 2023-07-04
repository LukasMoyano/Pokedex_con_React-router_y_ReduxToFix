import React, { useEffect, useState } from "react";
import axios from "axios";

const pokeLinearGradients = {
  grass: "border-t border-l border-r border-gray-400 rounded-t-lg bg-gradient-to-b from-teal-400 to-green-400",
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
   
   
   
   
   
<article className="flex flex-col mb-4">
  <section className={`relative h-40 ${pokeLinearGradients[pokemon?.types[0]?.type?.name]}`}>
    <div className="absolute px-12 -bottom-14">
      <img
        src={pokemon?.sprites?.other["official-artwork"].front_default}
        alt={pokemon?.name}
      />
    </div>
  </section>
  {/* Sección inferior */}


  <section>
    <h3 className=" indent-5 capitalize hover:uppercase text-center text-lg mt-14 w-40 h-4 flex flex-col justify-center items-center">
      {/* NOMBRE DEL POKEMON - colocar color */}
      {pokemon?.name}
    </h3>


    {/* Tipo de pokemon - centrado y agrandar letras */}
    <span className="capitalize text-center">Type</span>
    <h5 className="text-center text-lg font-bold">
      {formatTypesPokemon(pokemon?.types)}
    </h5>
    <hr />
  </section>

  <hr />

  <section className="capitalize">
    {/* Generar la lista de stats */}
    {pokemon?.stats?.slice(0, 4)?.map((stat) => (
      <div className="" key={stat.stat.name}>
       
        {/* Tipo de ataque */}
        <h6>{stat.stat.name}</h6>
       
        {/* Fuerza del ataque */}
        <span>{stat.base_stat}</span>

      </div>
    ))}
  </section>


</article>

   
   
   
   
   
   
   
   
   
  );
};

export default PokemonCard;
