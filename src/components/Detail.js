import React from "react";
import usePokeApi from '../hooks/usePokeApi';

import Summary from "./Summary";

const Detail = ({ selectedPokemon }) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  const [isLoading, , pokemon] = usePokeApi(url, false);

  let content = <p>Loading Detail...</p>;

  if (!isLoading && pokemon.name) {
    content = (
      <Summary
        image={pokemon.image}
        name={pokemon.name}
        height={pokemon.height}
        weight={pokemon.weight}
        type={pokemon.type}
        movesCount={pokemon.movesCount}
      />
    );
  } else if (!isLoading && !pokemon.name) {
    content = <p>Failed to fetch Detail.</p>;
  }
  return content;
};

export default React.memo(Detail, (prevProps, nextProps) => {
  return nextProps.selectedPokemon === prevProps.selectedPokemon;
});
