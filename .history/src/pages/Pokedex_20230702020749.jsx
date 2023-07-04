import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../components/pokedex/PokemonsList";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const nameTrainer = useSelector((store) => store.nameTrainer);

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

      <form>
        <div>
        <div className="flex items-center space-x-3">
    <button
        className="w-fit rounded-lg py-2 px-8 active:scale-95
      shadow-md text-sm duration-300 bg-[#1a5cff] active:bg-opacity-80
      ease-in-out bg-transparent font-medium md:text-sm text-white hover:bg-transparent border border-[#1a5cff] hover:text-[#1a5cff]">
        Active
    </button>
    <button
        className="w-fit rounded-lg py-2 px-8 active:scale-95
    shadow-md text-sm duration-300 border border-[#1a5cff] active:bg-opacity-80
    ease-in-out bg-transparent font-medium md:text-sm text-[#1a5cff] hover:bg-[#1a5cff] hover:text-white">
        Border
    </button>
  </div>
        </div>

        <select>
          <option value="">All</option>
        </select>
      </form>
      <PokemonsList pokemons={pokemons} />
    </main>
  );
};

export default Pokedex;
