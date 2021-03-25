import { useState, useEffect, useCallback } from 'react';

const usePokeApi = (url, isList) => {
  const [loadedPokemon, setLoadedPokemon] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [pokemonList, setPokemonList] = useState([])

  const parseDetail = (data) => {
    const loadedPokemon = { 
      image: `https://img.pokemondb.net/artwork/large/${data.name}.jpg`,
      name: data.name,
      height: data.height,
      weight: data.weight,
      type: data.types[0].type.name,
      movesCount: data.moves.length,
    }
    return loadedPokemon;
  }

  const parseList = (data) => {
    const list = data.results.map((pokemon, index) => ({
      name: pokemon.name,
      id: index + 1
    }))
    return list
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await fetch(url);
      const data = await response.json()
      if (!isList) {
        const loadedPokemon = parseDetail(data)
        setLoadedPokemon(loadedPokemon)
      } else {
        const pokemonList = parseList(data)
        setPokemonList(pokemonList)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [url, isList])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [isLoading, loadedPokemon, pokemonList];
}

export default usePokeApi;
