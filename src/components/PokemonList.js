import React from "react";
import usePokeApi from "../hooks/usePokeApi";

import "./PokemonList.css";

const PokemonList = (props) => {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=145";
  const [isLoading, , pokemonList] = usePokeApi(url, true);

  let content = <p>Loading pokemon list...</p>;

  if (!isLoading && pokemonList && pokemonList.length > 0) {
    content = (
      <div className={`list-container`}>
        {pokemonList.map((pokemon) => (
          <button
            className={`menu-button`}
            key={pokemon.id}
            value={pokemon.id}
            onClick={() => {
              props.selectPokemon(pokemon.name);
            }}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    );
  } else if (!isLoading && (!pokemonList || pokemonList.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default PokemonList;
