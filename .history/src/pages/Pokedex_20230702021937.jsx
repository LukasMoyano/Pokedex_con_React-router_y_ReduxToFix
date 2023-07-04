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
  
  <button className="relative inline-flex items-center justify-center p-1 mb-0 mr-2 overflow-hidden text-sm font-medium text-blue-500 rounded-lg group bg-gradient-to-br from-blue-600 to-blue-900 hover:text-white active:scale-95 duration-300">
    <span className="relative px-6 py-4 transition-all ease-in duration-200 bg-white rounded-md group-hover:bg-opacity-0">
      Gradient
    </span>
  </button>
</div>





          <input placeholder="Loking for a Pokemin..." type="text" className=""/>
          <button>Search</button>
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
