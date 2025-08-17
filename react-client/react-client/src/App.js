import React, { useState } from "react";
import TrainerList from "./components/TrainerList";
import TrainerPokemonList from "./components/TrainerPokemonList";
import PokemonSpeciesList from "./components/PokemonSpeciesList";
import "./App.css";

function App() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
    <div style={{ maxWidth: 700, margin: "2em auto", fontFamily: "sans-serif" }}>
      <h1>Pokémon Trainer Management (React)</h1>
      <TrainerList onSelect={setSelectedTrainer} />
      <hr />
      <TrainerPokemonList trainer={selectedTrainer} />
      <hr />
      <PokemonSpeciesList />
    </div>
  );
}

export default App;
