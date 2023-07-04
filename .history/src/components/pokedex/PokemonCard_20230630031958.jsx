import React from 'react';
import PropTypes from 'prop-types';
import pokeLinearGradients from './pokeLinearGradients';

const PokemonCard = ({ name, type }) => {
  const getGradient = () => {
    if (type in pokeLinearGradients) {
      const gradient = pokeLinearGradients[type];
      if (typeof gradient === 'function') {
        return gradient();
      }
      return gradient;
    }
    return '';
  };

  const gradientClass = getGradient();

  return (
    <article>
      <section className={gradientClass}>
        <div className="bg-gradient-to-t from-black to-green-500">
          <div>
            <img
              src={pokemon?.sprites?.other["official-artwork"].front_default}
              alt={pokemon?.name}
            />
          </div>
        </div>
      </section>

      <section>
        <h3>{pokemon?.name}</h3>
        <h5>{formatTypesPokemon(pokemon?.types)}</h5>
        <span>Type</span>

        <hr />

        <section>
          {pokemon?.stats?.slice(0, 4)?.map((stat) => (
            <div key={stat.stat.name}>
              <h6>{stat.stat.name}</h6>
              <span>{stat.base_stat}</span>
            </div>
          ))}
        </section>
      </section>
    </article>
  );
};

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default PokemonCard;
