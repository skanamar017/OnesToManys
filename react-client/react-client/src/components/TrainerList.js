import React, { useEffect, useState } from "react";
import {
  getTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from "../api";

export default function TrainerList({ onSelect, onDelete }) {
  const [trainers, setTrainers] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", gender: "", occupation: "" });

  useEffect(() => {
    loadTrainers();
  }, []);

  async function loadTrainers() {
    setTrainers(await getTrainers());
  }

  async function handleAdd(e) {
    e.preventDefault();
    const cleanedTrainer = {
      ...form,
      age: form.age === "" ? null : Number(form.age),
    };
    await createTrainer(cleanedTrainer);
    setForm({ name: "", age: "", gender: "", occupation: "" });
    loadTrainers();
  }

  async function handleDelete(id) {
    // Find the trainer being deleted
    const deletedTrainer = trainers.find(t => t.id === id);
    await deleteTrainer(id);
    loadTrainers();
    if (typeof onSelect === 'function' && typeof onDelete === 'function') {
      onDelete(deletedTrainer);
    }
  }

  async function handleEdit(id) {
    const trainerToUpdate = trainers.find(t => t.id === id);
    if (!trainerToUpdate) return;
    const name = prompt("Edit name:", trainerToUpdate.name);
    if (!name) return;
    const ageInput = prompt("Edit age:", trainerToUpdate.age ?? "");
    const age = ageInput === "" ? null : Number(ageInput);
    const gender = prompt("Edit gender (Male, Female, Other):", trainerToUpdate.gender ?? "");
    const occupation = prompt("Edit occupation:", trainerToUpdate.occupation ?? "");
    const cleanedTrainer = {
      ...trainerToUpdate,
      name,
      age,
      gender,
      occupation,
    };
    await updateTrainer(id, cleanedTrainer);
    loadTrainers();
  }

  return (
    <div>
      <h2>Trainers</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
        />
        <select
          value={form.gender}
          onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          placeholder="Occupation"
          value={form.occupation}
          onChange={e => setForm(f => ({ ...f, occupation: e.target.value }))}
        />
        <button type="submit">Add Trainer</button>
      </form>
      <ul>
        {trainers.map(tr => (
          <li key={tr.id}>
            <span
              style={{ cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}
              onClick={() => onSelect(tr)}
            >
              {tr.name} (id: {tr.id})
              {tr.age && `, Age: ${tr.age}`}
              {tr.gender && `, Gender: ${tr.gender}`}
              {tr.occupation && `, Occupation: ${tr.occupation}`}
            </span>
            <button onClick={() => handleEdit(tr.id)}>Edit</button>
            <button onClick={() => handleDelete(tr.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
