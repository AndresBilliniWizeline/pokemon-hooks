import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import PokemonDetailClass from './components/PokemonClass';
import PokemonDetail from './components/PokemonDetail';
import PokemonList from './components/PokemonList';
import { random } from './utils/fns';
import * as AppStyles from './styles';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState('eevee');
  const [closed, setClosed] = useState(false);

  const selectPokemon = name => {
    setSelectedPokemon(name);
  };

  const closePokedex = () => {
    setClosed(true);
  };

  useLayoutEffect(() => {
    const { body } = document;

    const rotateBackground = () => {
      const xPercent = random(100);
      const yPercent = random(100);
      body.style.setProperty('--bg-position', `${xPercent}% ${yPercent}%`);
    };

    const intervalId = setInterval(rotateBackground, 3000);
    body.addEventListener('click', rotateBackground);

    return () => {
      clearInterval(intervalId);
      body.removeEventListener('click', rotateBackground);
    };
  }, []);

  return (
    <>
      {
        !closed ?
          <AppStyles.BodyContainer>
            <AppStyles.Title>
              Pokemon
            </AppStyles.Title>
            <AppStyles.Container>
              <PokemonList selectPokemon={selectPokemon}/>
              <PokemonDetailClass selectedPokemon="jolteon" />
              <PokemonDetail selectedPokemon={selectedPokemon} />
            </AppStyles.Container>
            <AppStyles.Container>
              <button className="action-button" onClick={closePokedex}>Close pokedex</button>
            </AppStyles.Container>
          </AppStyles.BodyContainer> :
          <AppStyles.Container>
            <AppStyles.Title>
              Pokedex closed!
            </AppStyles.Title>
          </AppStyles.Container>
      }
    </>
  );
}

export default App;
