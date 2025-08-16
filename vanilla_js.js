const apiBase = "http://127.0.0.1:5000";

// Load Trainers
document.getElementById("loadTrainers").onclick = async function() {
  const res = await fetch(`${apiBase}/Trainers/`);
  const trainers = await res.json();
  const list = document.getElementById("trainersList");
  list.innerHTML = "";
  trainers.forEach(trainer => {
    const li = document.createElement("li");
    li.textContent = trainer.name + " (id: " + trainer.id + ")";
    li.onclick = () => loadTrainerPokemon(trainer.id);
    // Add Edit and Delete buttons
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      updateTrainer(trainer.id, trainer.name);
    };
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      if (confirm("Delete this trainer?")) {
        await deleteTrainer(trainer.id);
        document.getElementById("loadTrainers").click();
      }
    };
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
};

// Add Trainer
document.getElementById("addTrainer").onclick = async function() {
  const name = document.getElementById("trainerName").value;
  if (!name) return alert("Enter a name!");
  const res = await fetch(`${apiBase}/Trainers/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name})
  });
  if (res.ok) {
    alert("Trainer added!");
    document.getElementById("trainerName").value = "";
    document.getElementById("loadTrainers").click();
  } else {
    alert("Error adding trainer");
  }
};

// Update Trainer
async function updateTrainer(trainerId, oldName) {
  const name = prompt("Enter new name:", oldName);
  if (!name) return;
  const res = await fetch(`${apiBase}/Trainers/${trainerId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name})
  });
  if (res.ok) {
    alert("Trainer updated!");
    document.getElementById("loadTrainers").click();
  } else {
    alert("Error updating trainer");
  }
}

// Delete Trainer
async function deleteTrainer(trainerId) {
  const res = await fetch(`${apiBase}/Trainers/${trainerId}`, {
    method: "DELETE"
  });
  if (!res.ok) alert("Error deleting trainer");
}

// Load Trainer's Pokémon
async function loadTrainerPokemon(trainerId) {
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/`);
  const pokemon = await res.json();
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";
  pokemon.forEach(tp => {
    const li = document.createElement("li");
    li.textContent = `${tp.nickname || "No Nickname"} (Level: ${tp.level})`;
    // Edit and Delete buttons for TrainerPokemon
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = (e) => {
      e.stopPropagation();
      updateTrainerPokemon(trainerId, tp.id, tp);
    };
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async (e) => {
      e.stopPropagation();
      if (confirm("Delete this Pokémon?")) {
        await deleteTrainerPokemon(trainerId, tp.id);
        loadTrainerPokemon(trainerId);
      }
    };
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  // Add button to add new Pokémon
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Pokémon";
  addBtn.onclick = () => addTrainerPokemon(trainerId);
  list.appendChild(addBtn);
}

// Add Trainer Pokémon
async function addTrainerPokemon(trainerId) {
  const pokemon_id = prompt("Enter Pokémon ID (from Pokédex):");
  const nickname = prompt("Enter Nickname (optional):");
  const level = prompt("Enter Level:");
  const current_hp = prompt("Enter Current HP:");
  if (!pokemon_id || !level || !current_hp) return alert("All fields except nickname are required!");
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      trainer_id: trainerId,
      pokemon_id: Number(pokemon_id),
      nickname: nickname || null,
      level: Number(level),
      current_hp: Number(current_hp)
    })
  });
  if (res.ok) {
    alert("Pokémon added!");
    loadTrainerPokemon(trainerId);
  } else {
    alert("Error adding Pokémon");
  }
}

// Update Trainer Pokémon
async function updateTrainerPokemon(trainerId, tpId, tp) {
  const nickname = prompt("Enter new nickname:", tp.nickname || "");
  const level = prompt("Enter new level:", tp.level);
  const current_hp = prompt("Enter new current HP:", tp.current_hp);
  if (!level || !current_hp) return alert("Level and HP are required!");
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/${tpId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      trainer_id: trainerId,
      pokemon_id: tp.pokemon_id,
      nickname: nickname || null,
      level: Number(level),
      current_hp: Number(current_hp)
    })
  });
  if (res.ok) {
    alert("Pokémon updated!");
    loadTrainerPokemon(trainerId);
  } else {
    alert("Error updating Pokémon");
  }
}

// Delete Trainer Pokémon
async function deleteTrainerPokemon(trainerId, tpId) {
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/${tpId}`, {
    method: "DELETE"
  });
  if (!res.ok) alert("Error deleting Pokémon");
}