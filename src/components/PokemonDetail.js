import React from 'react';
import usePokeApi from '../hooks/usePokeApi';
import Summary from "./Summary";

const PokemonDetail = ({ selectedPokemon }) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`;
  const [isLoading, loadedPokemon] = usePokeApi(url, false)

  return (
    <>
      { 
        isLoading ?
        <p>Loading Detail...</p> :
        <Summary
          image={loadedPokemon.image}
          name={loadedPokemon.name}
          height={loadedPokemon.height}
          weight={loadedPokemon.weight}
          type={loadedPokemon.type}
          movesCount={loadedPokemon.movesCount}
        />
      }
    </>
  )
}

export default PokemonDetail;