import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(({ data }) => {
        setPokemonList(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePokemonClick = async (pokemonUrl) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(pokemonUrl);
      setSelectedPokemon(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
  
          <section>
            {/* Generar la lista de Stats */}
            {pokemon?.stats.map((stat, index) => (
              <div key={`${stat.stat.name}-${index}`}>
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