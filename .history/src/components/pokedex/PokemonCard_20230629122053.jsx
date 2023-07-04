import React, { useState, useEffect } from "react";
import axios from "axios";

const getStats = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/stats");
  return response.data;
};

const pokeLineGradient = {
  grass:
  "border-radius: 4px 4px 0px 0px; background: linear-gradient(179deg, #F96D6F 9.38%, #E35825 27.08%, #E8AE1B 60.42%);",
  fire:
  // Agrega los colores para los demás estados de los Pokémon aquí
};

const PokemonCard = ({ pokemon }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <article>
      {/* Sección superior */}
      <section
        className="bg-gradient-to-t from-black to-green-400"
        style={{
          width: "261px",
          height: "128px",
          flexShrink: 0,
          borderRadius: "4px 4px 0px 0px",
          ...(pokemon && pokeLineGradient[pokemon.state]),
        }}
      >
        <div>
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        </div>
      </section>

      {/* Sección inferior */}
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
