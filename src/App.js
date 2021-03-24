import React from 'react';
import './App.css';
import PokemonDetailClass from './components/PokemonClass';
// import PokemonDetail from './components/PokemonDetail';

import * as AppStyles from './styles';

function App() {

  return (
    <AppStyles.BodyContainer>
      <AppStyles.Title>
        Pokemon
      </AppStyles.Title>
      <AppStyles.Container>
        <PokemonDetailClass selectedPokemon="eevee" />
        {/*<PokemonDetail selectedPokemon="eevee" />*/}
      </AppStyles.Container>
      <AppStyles.Container>

      </AppStyles.Container>
    </AppStyles.BodyContainer>
  );
}

export default App;
