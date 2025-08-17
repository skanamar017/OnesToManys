const apiBase = "http://127.0.0.1:5000";

/* ===========================
   TRAINER CRUD OPERATIONS
   =========================== */

// --- Load Trainers ---
document.getElementById("loadTrainers").onclick = async function() {
  const res = await fetch(`${apiBase}/Trainers/`);
  const trainers = await res.json();
  const list = document.getElementById("trainersList");
  list.innerHTML = "";
  trainers.forEach(trainer => {
    console.log('[DEBUG] Rendering trainer:', trainer);
    const li = document.createElement("li");
    // Create a clickable span for the trainer name
    const nameSpan = document.createElement("span");
    nameSpan.textContent = trainer.name + " (id: " + trainer.id + ")";
    nameSpan.className = "clickable-trainer";
    nameSpan.style.cursor = "pointer";
    nameSpan.onclick = () => loadTrainerPokemon(trainer.id);
    li.appendChild(nameSpan);
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
  // Populate dropdown for trainer selection in Get Trainer & Pokémon Info
  const select = document.createElement('select');
  select.id = 'trainerSelectWithPokemon';
  trainers.forEach(trainer => {
    const option = document.createElement('option');
    option.value = trainer.id;
    option.textContent = trainer.name + ` (id: ${trainer.id})`;
    select.appendChild(option);
  });
  const container = document.getElementById('getTrainerWithPokemonContainer');
  if (container) container.innerHTML = '';
  else {
    const newDiv = document.createElement('div');
    newDiv.id = 'getTrainerWithPokemonContainer';
    document.getElementById('loadTrainers').parentNode.appendChild(newDiv);
  }
  document.getElementById('getTrainerWithPokemonContainer').appendChild(select);
};
// --- Get Trainer & Pokémon Info ---
document.getElementById("getTrainerWithPokemon").onclick = async function() {
  const select = document.getElementById('trainerSelectWithPokemon');
  if (!select) return alert('Load trainers first!');
  const trainerId = select.value;
  if (!trainerId) return alert('Select a trainer!');
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/WithPokemon`);
  if (!res.ok) {
    alert('Error fetching trainer and Pokémon info');
    return;
  }
  const data = await res.json();
  const infoDiv = document.getElementById('trainerWithPokemonInfo');
  infoDiv.innerHTML = `<b>Trainer:</b> ${data.trainer.name} (id: ${data.trainer.id})<br><b>Pokémon:</b><ul>` +
    (data.pokemon.length ? data.pokemon.map(p => `<li>${p.nickname || 'No Nickname'} (Pokémon ID: ${p.pokemon_id}, Level: ${p.level}, HP: ${p.current_hp})</li>`).join('') : '<li>No Pokémon</li>') + '</ul>';
};

// --- Add Trainer ---
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

// --- Update Trainer ---
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

// --- Delete Trainer ---
async function deleteTrainer(trainerId) {
  const res = await fetch(`${apiBase}/Trainers/${trainerId}`, {
    method: "DELETE"
  });
  if (!res.ok) alert("Error deleting trainer");
}

/* ===========================
   TRAINER POKÉMON CRUD OPERATIONS
   =========================== */

// --- Load Trainer's Pokémon ---
async function loadTrainerPokemon(trainerId) {
  try {
    const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/`);
    if (!res.ok) {
      console.error('Failed to fetch trainer\'s Pokémon:', res.status, res.statusText);
      alert(`Error: Could not fetch trainer's Pokémon. Status: ${res.status}`);
      return;
    }
    const pokemon = await res.json();
    const list = document.getElementById("pokemonList");
    list.innerHTML = "";
    if (!Array.isArray(pokemon) || pokemon.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No Pokémon found for this trainer.";
      list.appendChild(li);
    } else {
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
    }
    // Always add the Add Pokémon button
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Pokémon";
    addBtn.onclick = () => addTrainerPokemon(trainerId);
    list.appendChild(addBtn);
  } catch (err) {
    console.error('Error fetching trainer\'s Pokémon:', err);
    alert('Error: Could not fetch trainer\'s Pokémon. See console for details.');
  }
}

// --- Add Trainer Pokémon ---
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

// --- Update Trainer Pokémon ---
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

// --- Delete Trainer Pokémon ---
async function deleteTrainerPokemon(trainerId, tpId) {
  const res = await fetch(`${apiBase}/Trainers/${trainerId}/TrainerPokemon/${tpId}`, {
    method: "DELETE"
  });
  if (!res.ok) alert("Error deleting Pokémon");
}