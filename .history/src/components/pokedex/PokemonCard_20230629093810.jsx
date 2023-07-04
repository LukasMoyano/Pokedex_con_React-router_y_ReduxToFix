import React, { useState, useEffect } from "react";
import axios from "axios";

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
  }, []);

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
          background: "linear-gradient(180deg, #7EC6C5 0%, #ABDAC6 47.92%, #CAE099 100%)"
        }}
      >
        {/* Contenido de la sección */}
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
