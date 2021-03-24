import React, { useLayoutEffect, useState } from 'react';
import { random } from './utils/fns';
import './App.css';

import * as AppStyles from './styles';
import DetailClass from './components/DetailClass';
import Detail from './components/Detail';
import PokemonList from './components/PokemonList'

function App() {
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

  const TEAMS = {
    BLUE: 'blue',
    RED: 'red',
  };

  const [selectedPokemon, setSelectedPokemon] = useState('eevee');
  const [team, setTeam] = useState(TEAMS.BLUE);
  const [closed, setClosed] = useState(false);

  const selectPokemon = name => {
    setSelectedPokemon(name);
  };

  const closePokedex = () => {
    setClosed(true);
  };

  const changeTeam = () => {
    const newTeam = team === TEAMS.BLUE ? TEAMS.RED : TEAMS.BLUE;
    setTeam(newTeam);
  }

  return (
    <>
      {
        !closed
        ?
        <AppStyles.BodyContainer>
          <AppStyles.Title>
            Pokemon
          </AppStyles.Title>
          <AppStyles.Container>
            <PokemonList selectPokemon={selectPokemon} team={team}/>
            <DetailClass selectedPokemon={selectedPokemon} />
            <Detail selectedPokemon={selectedPokemon} />
          </AppStyles.Container>
          <AppStyles.Container>
            <button className="action-button" onClick={changeTeam}>Change team!</button>
            <button className="action-button" onClick={closePokedex}>Close pokedex</button>
            <p>You are now part of the <strong className={`team-${team}`}>{team}</strong> team!!!</p>
          </AppStyles.Container>
        </AppStyles.BodyContainer>
        :
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
