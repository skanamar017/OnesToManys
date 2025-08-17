import React, { useEffect, useState } from "react";
import {
  getTrainerPokemons,
  addTrainerPokemon,
  updateTrainerPokemon,
  deleteTrainerPokemon,
} from "../api";

export default function TrainerPokemonList({ trainer }) {
  const [pokemons, setPokemons] = useState([]);
  const [form, setForm] = useState({ pokemon_id: "", nickname: "", level: "", current_hp: "" });

  useEffect(() => {
    if (trainer) loadPokemons();
  }, [trainer]);

  async function loadPokemons() {
    setPokemons(await getTrainerPokemons(trainer.id));
  }

  async function handleAdd(e) {
    e.preventDefault();
    await addTrainerPokemon(trainer.id, {
      trainer_id: trainer.id,
      pokemon_id: Number(form.pokemon_id),
      nickname: form.nickname,
      level: Number(form.level),
      current_hp: Number(form.current_hp),
    });
    setForm({ pokemon_id: "", nickname: "", level: "", current_hp: "" });
    loadPokemons();
  }

  async function handleDelete(tpId) {
    await deleteTrainerPokemon(trainer.id, tpId);
    loadPokemons();
  }

  async function handleEdit(tp) {
    const nickname = prompt("New nickname?", tp.nickname || "");
    const level = prompt("New level?", tp.level);
    const current_hp = prompt("New current HP?", tp.current_hp);
    if (!level || !current_hp) return;
    await updateTrainerPokemon(trainer.id, tp.id, {
      trainer_id: trainer.id,
      pokemon_id: tp.pokemon_id,
      nickname,
      level: Number(level),
      current_hp: Number(current_hp),
    });
    loadPokemons();
  }

  if (!trainer) return <div>Select a trainer to view their Pokémon.</div>;

  return (
    <div>
      <h3>{trainer.name}'s Pokémon</h3>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          placeholder="Pokémon ID"
          value={form.pokemon_id}
          onChange={e => setForm(f => ({ ...f, pokemon_id: e.target.value }))}
          required
        />
        <input
          placeholder="Nickname"
          value={form.nickname}
          onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
        />
        <input
          placeholder="Level"
          type="number"
          value={form.level}
          onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
          required
        />
        <input
          placeholder="Current HP"
          type="number"
          value={form.current_hp}
          onChange={e => setForm(f => ({ ...f, current_hp: e.target.value }))}
          required
        />
        <button type="submit">Add Pokémon</button>
      </form>
      <ul>
        {pokemons.map(tp => (
          <li key={tp.id}>
            {tp.nickname || "No Nickname"} (Pokémon ID: {tp.pokemon_id}, Level: {tp.level}, HP: {tp.current_hp})
            <button onClick={() => handleEdit(tp)}>Edit</button>
            <button onClick={() => handleDelete(tp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
