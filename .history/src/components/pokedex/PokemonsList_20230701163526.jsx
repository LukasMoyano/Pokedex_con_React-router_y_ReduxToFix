import PokemonCard from "./PokemonCard";
import { Responsive, WidthProvider } from "react-grid-layout";
import PokemonCard from "./PokemonCard";

const ResponsiveGridLayout = WidthProvider(Responsive);


const PokemonsList = ({ pokemons }) => {

  const layouts = {
    lg: [
      { i: "a", x: 0, y: 0, w: 4, h: 4, static: true },
      { i: "b", x: 4, y: 0, w: 4, h: 4, static: true },
      // Agregar más elementos de la cuadrícula según sea necesario
    ],
  };


  return (
    <section>
      <ResponsiveGridLayout className="layout" layouts={layouts} breakpoints={{ lg: 1200 }}>
        {pokemons.map((pokemon, index) => (
          <div key={pokemon.url} data-grid={{ x: (index % 8) % 4, y: Math.floor(index / 8), w: 4, h: 4 }}>
            <PokemonCard pokemonUrl={pokemon.url} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
};

export default PokemonsList;
