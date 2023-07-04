import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../components/pokedex/PokemonsList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const [namePokemon, setNamePokemon] = useState("")

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const pokemonsByName = pokemons.filter((pokemon) => pokemon.name.includes(namePokemon))


const handleSubmit = (e) => {
  e.preventDefault()
  setNamePokemon(e.target.namePokemon.value)
}

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/pokemon/?limit=40";
    axios
      .get(URL)
      .then(({ data }) => setPokemons(data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Header />
      <p>
        <span>Welcome {nameTrainer}</span>, here you can find your favorite
        Pokemon.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <input id="namePokemon"
            placeholder="Looking for a Pokémon!!!..."
            type="text"
            className=""
          />

          <button className="flex-shrink-0 w-40 h-10 bg-red-600 text-white font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-0 active:scale-95 duration-300">
            Search
          </button>
        </div>

        <select>
          <option value="">All</option>
        </select>
      </form>
      <PokemonsList pokemons={pokemonsByName} />
    </main>
  );
};

export default Pokedex;
