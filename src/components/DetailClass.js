import React, { Component } from "react";

import Summary from "./Summary";

class DetailClass extends Component {
  state = { loadedPokemon: {}, isLoading: false };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return (
      nextProps.selectedPokemon !== this.props.selectedPokemon ||
      nextState.loadedPokemon.id !== this.state.loadedPokemon.id ||
      nextState.isLoading !== this.state.isLoading
    );
  }

  componentDidUpdate(prevProps) {
    console.log("Component did update");
    if (prevProps.selectedPokemon !== this.props.selectedPokemon) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    console.log(
      `Sending Http request for new pokemon with name ${this.props.selectedPokemon}`
    );
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${this.props.selectedPokemon}`
      );
      const pokeData = await response.json();

      const loadedPokemon = {
        image: `https://img.pokemondb.net/artwork/large/${pokeData.name}.jpg`,
        name: pokeData.name,
        height: pokeData.height,
        weight: pokeData.weight,
        type: pokeData.types[0].type.name,
        movesCount: pokeData.moves.length,
      };
      this.setState({ loadedPokemon: loadedPokemon, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount() {
    console.log("Too soon...");
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
    } else if (!this.state.isLoading && !this.state.loadedPokemon.name) {
      content = <p>Failed to fetch Detail.</p>;
    }
    return content;
  }
}

export default DetailClass;
