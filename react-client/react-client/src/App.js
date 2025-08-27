import React, { useState } from "react";
import TrainerList from "./components/TrainerList";
import TrainerPokemonList from "./components/TrainerPokemonList";
import PokemonSpeciesList from "./components/PokemonSpeciesList";
import "./App.css";

function App() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainerDeletedMsg, setTrainerDeletedMsg] = useState("");

  // Handler to be called when a trainer is deleted
  const handleTrainerDelete = (deletedTrainer) => {
    if (selectedTrainer && deletedTrainer && selectedTrainer.id === deletedTrainer.id) {
      setSelectedTrainer(null);
      setTrainerDeletedMsg("Trainer and their Pokémon have been deleted.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "2em auto", fontFamily: "sans-serif" }}>
      <h1>Pokémon Trainer Management (React)</h1>
      <TrainerList
        onSelect={tr => {
          setSelectedTrainer(tr);
          setTrainerDeletedMsg(""); // Clear the message when a new trainer is selected
        }}
        onDelete={handleTrainerDelete}
      />
      <hr />
      {trainerDeletedMsg ? (
        <div style={{ color: 'red', marginBottom: 12 }}>{trainerDeletedMsg}</div>
      ) : (
        <TrainerPokemonList trainer={selectedTrainer} />
      )}
      <hr />
      <PokemonSpeciesList />
    </div>
  );
}

export default App;
