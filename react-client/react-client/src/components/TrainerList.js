import React, { useEffect, useState } from "react";
import {
  getTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from "../api";

export default function TrainerList({ onSelect }) {
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
    await createTrainer(form);
    setForm({ name: "", age: "", gender: "", occupation: "" });
    loadTrainers();
  }

  async function handleDelete(id) {
    await deleteTrainer(id);
    loadTrainers();
  }

  async function handleEdit(id) {
    const name = prompt("New name?");
    if (!name) return;
    await updateTrainer(id, { ...form, name });
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
