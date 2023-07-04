import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonsList from "../components/pokedex/PokemonsList";



const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  console.log({ pokemons });
  const [namePokemon, setNamePokemon] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  
  const nameTrainer = useSelector((store) => store.nameTrainer);
  
  const pokemonsByName = pokemons.filter((pokemon) =>
  
  pokemon.name.includes(namePokemon)
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.querySelector("#namePokemon").value);
    setCurrentType("");
  };
  
  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
    setNamePokemon("");
  };
  
  useEffect(() => {
  const fetchPokemons = async () => {
    let URL = "https://pokeapi.co/api/v2/pokemon/?limit=40";
  
      if (currentType) {
        URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
      }
  
      try {
        const response = await axios.get(URL);
        setPokemons(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchPokemons();
  }, [currentType]);

  useEffect(() => {
    const fetchTypes = async () => {
      const URL = "https://pokeapi.co/api/v2/type";
      try {
        const response = await axios.get(URL);
        setTypes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTypes();
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
          <input
            id="namePokemon"
            placeholder="Looking for a Pokémon!!!..."
            type="text"
            className=""
          />

          <button
            type="submit"
            className="flex-shrink-0 w-40 h-10 bg-red-600 text-white font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-0 active:scale-95 duration-300"
          >
            Search
          </button>
        </div>

        <select onChange={handleChangeType}>
          <option value="">All</option>
          {types
            ? types.map((type) => (
                <option value={type.name} key={type.name}>
                  {type.name}
                </option>
              ))
            : null}
        </select>
      </form>
      <PokemonsList pokemons={pokemonsByName} />
    </main>
  );
};

export default Pokedex;
