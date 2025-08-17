// Simple API utility for Trainers and TrainerPokemons
const API_BASE = "http://127.0.0.1:5000";

export async function getTrainers() {
  const res = await fetch(`${API_BASE}/Trainers/`);
  return res.json();
}

export async function getTrainer(id) {
  const res = await fetch(`${API_BASE}/Trainers/${id}`);
  return res.json();
}

export async function createTrainer(trainer) {
  const res = await fetch(`${API_BASE}/Trainers/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trainer)
  });
  return res.json();
}

export async function updateTrainer(id, trainer) {
  const res = await fetch(`${API_BASE}/Trainers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trainer)
  });
  return res.json();
}

export async function deleteTrainer(id) {
  const res = await fetch(`${API_BASE}/Trainers/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getTrainerPokemons(trainerId) {
  const res = await fetch(`${API_BASE}/Trainers/${trainerId}/TrainerPokemon/`);
  return res.json();
}

export async function addTrainerPokemon(trainerId, pokemon) {
  const res = await fetch(`${API_BASE}/Trainers/${trainerId}/TrainerPokemon/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon)
  });
  return res.json();
}

export async function updateTrainerPokemon(trainerId, tpId, pokemon) {
  const res = await fetch(`${API_BASE}/Trainers/${trainerId}/TrainerPokemon/${tpId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pokemon)
  });
  return res.json();
}

export async function deleteTrainerPokemon(trainerId, tpId) {
  const res = await fetch(`${API_BASE}/Trainers/${trainerId}/TrainerPokemon/${tpId}`, { method: "DELETE" });
  return res.json();
}

export async function getAllPokemon(type) {
  let url = `${API_BASE}/Pokemon/`;
  if (type) url += `?type=${encodeURIComponent(type)}`;
  const res = await fetch(url);
  return res.json();
}
