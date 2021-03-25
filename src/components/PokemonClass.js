import React from 'react';
import Summary from "./Summary";

class PokemonDetailClass extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      loadedPokemon: {},
      isLoading: false,
    };
  }

  fetchData = async () => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.props.selectedPokemon}`
      );
      const pokeData = await response.json()

      const loadedPokemon = { 
        image: `https://img.pokemondb.net/artwork/large/${pokeData.name}.jpg`,
        name: pokeData.name,
        height: pokeData.height,
        weight: pokeData.weight,
        type: pokeData.types[0].type.name,
        movesCount: pokeData.moves.length,
      }
      this.setState({ loadedPokemon, isLoading: false })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPokemon !== this.props.selectedPokemon) {
      this.fetchData()
    }
  }

  componentWillUnmount() {
    console.log('Unmount component')
  }

  render() {
    let content = <p>Loading Detail...</p>;
    if (!this.state.isLoading && this.state.loadedPokemon.name) {
      content = (
        <Summary
          image={this.state.loadedPokemon.image}
          name={this.state.loadedPokemon.name}
          height={this.state.loadedPokemon.height}
          weight={this.state.loadedPokemon.weight}
          type={this.state.loadedPokemon.type}
          movesCount={this.state.loadedPokemon.movesCount}
        />
      );
    }
    return content;
  }
}

export default PokemonDetailClass;