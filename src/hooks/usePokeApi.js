import { useState, useEffect, useCallback } from "react";

function usePokeApi(url, isList) {
  const [pokemon, setPokemon] = useState({});
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseDataList = (data) => {
    const parsedPokemonList = data.results.map((pokemon, index) => ({
      name: pokemon.name,
      id: index + 1,
    }));
    return parsedPokemonList;
  }

  const parseDataDetail = (data) => {
    const loadedPokemon = {
      image: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
      name: data.name,
      height: data.height,
      weight: data.weight,
      type: data.types[0].type.name,
      movesCount: data.moves.length,
    };
    return loadedPokemon;
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (isList) {
        const pokemonList = parseDataList(data);
        setPokemonList(pokemonList);
      } else {
        const pokemonDetail = parseDataDetail(data);
        setPokemon(pokemonDetail);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [url, isList]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return [isLoading, pokemonList, pokemon];
}

export default usePokeApi;
