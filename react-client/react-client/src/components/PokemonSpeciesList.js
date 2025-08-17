import React, { useEffect, useState } from "react";
import { getAllPokemon } from "../api";

export default function PokemonSpeciesList() {
  const [pokemon, setPokemon] = useState([]);
  const [type, setType] = useState("");

  async function loadAll() {
    setPokemon(await getAllPokemon());
  }

  async function filterByType() {
    if (!type.trim()) return;
    setPokemon(await getAllPokemon(type.trim()));
  }

  return (
    <div>
      <h3>Pokémon Species List</h3>
      <input
        placeholder="Type (e.g. Fire)"
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <button onClick={loadAll}>Show All Pokémon</button>
      <button onClick={filterByType}>Filter by Type</button>
      <ul>
        {pokemon.length === 0 && <li>No Pokémon found.</li>}
        {pokemon.map(p => (
          <li key={p.id || p.pokedex_number}>
            #{p.pokedex_number} {p.name} (Type: {p.type1}{p.type2 ? '/' + p.type2 : ''}, HP: {p.base_hp}, Atk: {p.base_attack}, Def: {p.base_defense}, Spc: {p.base_special}, Spd: {p.base_speed})
          </li>
        ))}
      </ul>
    </div>
  );
}
