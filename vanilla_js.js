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
    // Show all info: name, id, age, gender, occupation
    nameSpan.textContent = `${trainer.name} (id: ${trainer.id})` +
      (trainer.age ? `, Age: ${trainer.age}` : '') +
      (trainer.gender ? `, Gender: ${trainer.gender}` : '') +
      (trainer.occupation ? `, Occupation: ${trainer.occupation}` : '');
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
        // If the deleted trainer is currently selected, clear the TrainerPokemon list and show a message
        const trainerPokemonList = document.getElementById("trainerPokemonList");
        if (trainerPokemonList) {
          trainerPokemonList.innerHTML = "<li>Trainer and their Pokémon have been deleted.</li>";
        }
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
  infoDiv.innerHTML = `<b>Trainer:</b> ${data.trainer.name} (id: ${data.trainer.id})` +
    (data.trainer.age ? `, Age: ${data.trainer.age}` : '') +
    (data.trainer.gender ? `, Gender: ${data.trainer.gender}` : '') +
    (data.trainer.occupation ? `, Occupation: ${data.trainer.occupation}` : '') +
    `<br><b>Pokémon:</b><ul>` +
    (data.pokemon.length ? data.pokemon.map(p => `<li>${p.nickname || 'No Nickname'} (Pokémon ID: ${p.pokemon_id}, Level: ${p.level}, HP: ${p.current_hp})</li>`).join('') : '<li>No Pokémon</li>') + '</ul>';
};

// --- Add Trainer ---
document.getElementById("addTrainer").onclick = async function() {
  const name = document.getElementById("trainerName").value;
  const age = document.getElementById("trainerAge").value;
  const gender = document.getElementById("trainerGender").value;
  const occupation = document.getElementById("trainerOccupation").value;
  if (!name) return alert("Enter a name!");
  const trainerData = { name };
  if (age) trainerData.age = Number(age);
  if (gender) trainerData.gender = gender;
  if (occupation) trainerData.occupation = occupation;
  const res = await fetch(`${apiBase}/Trainers/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(trainerData)
  });
  if (res.ok) {
    alert("Trainer added!");
    document.getElementById("trainerName").value = "";
    document.getElementById("trainerAge").value = "";
    document.getElementById("trainerGender").value = "";
    document.getElementById("trainerOccupation").value = "";
    document.getElementById("loadTrainers").click();
  } else {
    alert("Error adding trainer");
  }
};

// --- Update Trainer ---
async function updateTrainer(trainerId, oldName) {
  // Fetch the current trainer info (optional, but more robust)
  const resGet = await fetch(`${apiBase}/Trainers/${trainerId}`);
  const trainer = resGet.ok ? await resGet.json() : {};
  const name = prompt("Edit name:", trainer.name || oldName || "");
  if (!name) return;
  const ageInput = prompt("Edit age:", trainer.age ?? "");
  const age = ageInput === "" ? null : Number(ageInput);
  const gender = prompt("Edit gender (Male, Female, Other):", trainer.gender ?? "");
  const occupation = prompt("Edit occupation:", trainer.occupation ?? "");
  const trainerData = { name, age, gender, occupation };
  const res = await fetch(`${apiBase}/Trainers/${trainerId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(trainerData)
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
    const trainerPokemon = await res.json();
    const list = document.getElementById("trainerPokemonList");
    list.innerHTML = "";
    if (!Array.isArray(trainerPokemon) || trainerPokemon.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No Pokémon found for this trainer.";
      list.appendChild(li);
    } else {
      // Fetch Pokémon species info for all unique pokemon_id in this trainer's list
      const uniqueIds = [...new Set(trainerPokemon.map(tp => tp.pokemon_id))];
      const speciesMap = {};
      if (uniqueIds.length > 0) {
        // Fetch all species in one go (could be optimized, but fine for small sets)
        const resSpecies = await fetch(`${apiBase}/Pokemon/`);
        const allSpecies = await resSpecies.json();
        uniqueIds.forEach(id => {
          const found = allSpecies.find(p => p.id === id || p.pokedex_number === id);
          if (found) speciesMap[id] = found;
        });
      }
      trainerPokemon.forEach(tp => {
        const li = document.createElement("li");
        const species = speciesMap[tp.pokemon_id];
        li.textContent = `${tp.nickname || "No Nickname"} (Level: ${tp.level})` +
          (species ? ` — Species: #${species.pokedex_number} ${species.name} (Type: ${species.type1}${species.type2 ? '/' + species.type2 : ''})` : '');
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

/* ===========================
   POKÉMON TABLE OPERATIONS
   =========================== */

// Show all Pokémon in the Pokémon table
document.getElementById("showAllPokemon").onclick = async function() {
  const res = await fetch(`${apiBase}/Pokemon/`);
  const pokemon = await res.json();
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";
  if (!pokemon.length) {
    const li = document.createElement("li");
    li.textContent = "No Pokémon found.";
    list.appendChild(li);
    return;
  }
  pokemon.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `#${p.pokedex_number} ${p.name} (Type: ${p.type1}${p.type2 ? '/' + p.type2 : ''}, HP: ${p.base_hp}, Atk: ${p.base_attack}, Def: ${p.base_defense}, Spc: ${p.base_special}, Spd: ${p.base_speed})`;
    list.appendChild(li);
  });
};

// Filter Pokémon by type
document.getElementById("filterPokemonByType").onclick = async function() {
  const typeFilter = document.getElementById("pokemonTypeFilter").value.trim();
  if (!typeFilter) {
    alert("Enter a type to filter by (e.g. Fire, Water, Grass)");
    return;
  }
  const res = await fetch(`${apiBase}/Pokemon/?type=${encodeURIComponent(typeFilter)}`);
  const pokemon = await res.json();
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";
  if (!pokemon.length) {
    const li = document.createElement("li");
    li.textContent = `No Pokémon found for type '${typeFilter}'.`;
    list.appendChild(li);
    return;
  }
  pokemon.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `#${p.pokedex_number} ${p.name} (Type: ${p.type1}${p.type2 ? '/' + p.type2 : ''}, HP: ${p.base_hp}, Atk: ${p.base_attack}, Def: ${p.base_defense}, Spc: ${p.base_special}, Spd: ${p.base_speed})`;
    list.appendChild(li);
  });
};