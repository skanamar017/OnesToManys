
-- Sample Data for Pokemon Table
-- Format: ('Name', 'Type1', 'Type2', HP, Attack, Defense, Special, Speed)
INSERT INTO Pokemon (name, type1, type2, base_hp, base_attack, base_defense, base_special, base_speed) VALUES
('Bulbasaur', 'Grass', 'Poison', 45, 49, 49, 65, 45),
('Ivysaur', 'Grass', 'Poison', 60, 62, 63, 80, 60),
('Venusaur', 'Grass', 'Poison', 80, 82, 83, 100, 80),
('Charmander', 'Fire', NULL, 39, 52, 43, 50, 65),
('Charmeleon', 'Fire', NULL, 58, 64, 58, 65, 80),
('Charizard', 'Fire', 'Flying', 78, 84, 78, 85, 100),
('Squirtle', 'Water', NULL, 44, 48, 65, 50, 43),
('Wartortle', 'Water', NULL, 59, 63, 80, 65, 58),
('Blastoise', 'Water', NULL, 79, 83, 100, 85, 78),
('Caterpie', 'Bug', NULL, 45, 30, 35, 20, 45),
('Metapod', 'Bug', NULL, 50, 20, 55, 25, 30),
('Butterfree', 'Bug', 'Flying', 60, 45, 50, 80, 70),
('Weedle', 'Bug', 'Poison', 40, 35, 30, 20, 50),
('Kakuna', 'Bug', 'Poison', 45, 25, 50, 25, 35),
('Beedrill', 'Bug', 'Poison', 65, 90, 40, 45, 75),
('Pidgey', 'Normal', 'Flying', 40, 45, 40, 35, 56),
('Pidgeotto', 'Normal', 'Flying', 63, 60, 55, 50, 71),
('Pidgeot', 'Normal', 'Flying', 83, 80, 75, 70, 101),
('Rattata', 'Normal', NULL, 30, 56, 35, 25, 72),
('Raticate', 'Normal', NULL, 55, 81, 60, 50, 97),
('Spearow', 'Normal', 'Flying', 40, 60, 30, 31, 70),
('Fearow', 'Normal', 'Flying', 65, 90, 65, 61, 100),
('Ekans', 'Poison', NULL, 35, 60, 44, 40, 55),
('Arbok', 'Poison', NULL, 60, 95, 69, 65, 80),
('Pikachu', 'Electric', NULL, 35, 55, 40, 50, 90),
('Raichu', 'Electric', NULL, 60, 90, 55, 50, 110),
('Sandshrew', 'Ground', NULL, 50, 75, 85, 20, 40),
('Sandslash', 'Ground', NULL, 75, 100, 110, 35, 65),
('Nidoran♀', 'Poison', NULL, 55, 47, 52, 40, 41),
('Nidorina', 'Poison', NULL, 70, 62, 67, 55, 56),
('Nidoqueen', 'Poison', 'Ground', 90, 82, 87, 75, 76),
('Nidoran♂', 'Poison', NULL, 46, 57, 40, 40, 50),
('Nidorino', 'Poison', NULL, 61, 72, 57, 55, 65),
('Nidoking', 'Poison', 'Ground', 81, 102, 76, 85, 85),
('Clefairy', 'Fairy', NULL, 70, 45, 48, 60, 35),
('Clefable', 'Fairy', NULL, 95, 70, 73, 85, 60),
('Vulpix', 'Fire', NULL, 38, 41, 40, 50, 65),
('Ninetales', 'Fire', NULL, 73, 76, 75, 81, 100),
('Jigglypuff', 'Normal', 'Fairy', 115, 45, 20, 25, 20),
('Wigglytuff', 'Normal', 'Fairy', 140, 70, 45, 50, 45),
('Zubat', 'Poison', 'Flying', 40, 45, 35, 30, 40),
('Golbat', 'Poison', 'Flying', 75, 80, 70, 65, 90),
('Oddish', 'Grass', 'Poison', 45, 50, 55, 75, 30),
('Gloom', 'Grass', 'Poison', 60, 65, 70, 85, 40),
('Vileplume', 'Grass', 'Poison', 75, 80, 85, 100, 50),
('Paras', 'Bug', 'Grass', 35, 70, 55, 35, 25),
('Parasect', 'Bug', 'Grass', 60, 95, 80, 60, 30),
('Venonat', 'Bug', 'Poison', 60, 55, 50, 40, 45),
('Venomoth', 'Bug', 'Poison', 70, 65, 60, 90, 90),
('Diglett', 'Ground', NULL, 10, 55, 25, 35, 95),
('Dugtrio', 'Ground', NULL, 35, 80, 50, 70, 120),
('Meowth', 'Normal', NULL, 40, 45, 35, 40, 90),
('Persian', 'Normal', NULL, 65, 70, 60, 65, 115),
('Psyduck', 'Water', NULL, 50, 52, 48, 50, 55),
('Golduck', 'Water', NULL, 80, 82, 78, 80, 85),
('Mankey', 'Fighting', NULL, 40, 80, 35, 35, 70),
('Primeape', 'Fighting', NULL, 65, 105, 60, 60, 95),
('Growlithe', 'Fire', NULL, 55, 70, 45, 50, 60),
('Arcanine', 'Fire', NULL, 90, 110, 80, 80, 95),
('Poliwag', 'Water', NULL, 40, 50, 40, 40, 90),
('Poliwhirl', 'Water', NULL, 65, 65, 65, 50, 90),
('Poliwrath', 'Water', 'Fighting', 90, 95, 95, 70, 70),
('Abra', 'Psychic', NULL, 25, 20, 15, 105, 90),
('Kadabra', 'Psychic', NULL, 40, 35, 30, 120, 105),
('Alakazam', 'Psychic', NULL, 55, 50, 45, 135, 120),
('Machop', 'Fighting', NULL, 70, 80, 50, 35, 35),
('Machoke', 'Fighting', NULL, 80, 100, 70, 50, 45),
('Machamp', 'Fighting', NULL, 90, 130, 80, 65, 55),
('Bellsprout', 'Grass', 'Poison', 50, 75, 35, 70, 40),
('Weepinbell', 'Grass', 'Poison', 65, 90, 50, 85, 55),
('Victreebel', 'Grass', 'Poison', 80, 105, 65, 100, 70),
('Tentacool', 'Water', 'Poison', 40, 40, 35, 50, 70),
('Tentacruel', 'Water', 'Poison', 80, 70, 65, 80, 100),
('Geodude', 'Rock', 'Ground', 40, 80, 100, 30, 20),
('Graveler', 'Rock', 'Ground', 55, 95, 115, 45, 35),
('Golem', 'Rock', 'Ground', 80, 110, 130, 55, 45),
('Ponyta', 'Fire', NULL, 50, 65, 40, 50, 60),
('Rapidash', 'Fire', NULL, 65, 100, 70, 80, 105),
('Slowpoke', 'Water', 'Psychic', 90, 65, 65, 40, 15),
('Slowbro', 'Water', 'Psychic', 95, 75, 110, 80, 30),
('Magnemite', 'Electric', 'Steel', 25, 35, 70, 95, 45),
('Magneton', 'Electric', 'Steel', 50, 60, 95, 120),
('Magneton', 'Electric', 'Steel', 50, 60, 95, 120, 70),
('Farfetchd', 'Normal', 'Flying', 52, 65, 55, 58, 60),
('Doduo', 'Normal', 'Flying', 35, 85, 45, 35, 75),
('Dodrio', 'Normal', 'Flying', 60, 110, 70, 60, 100),
('Seel', 'Water', NULL, 65, 45, 55, 45, 45),
('Dewgong', 'Water', 'Ice', 90, 70, 80, 70, 70),
('Grimer', 'Poison', NULL, 80, 80, 50, 40, 25),
('Muk', 'Poison', NULL, 105, 105, 75, 65, 50),
('Shellder', 'Water', NULL, 30, 65, 100, 45, 40),
('Cloyster', 'Water', 'Ice', 50, 95, 180, 70, 70),
('Gastly', 'Ghost', 'Poison', 30, 35, 30, 100, 80),
('Haunter', 'Ghost', 'Poison', 45, 50, 45, 115, 95),
('Gengar', 'Ghost', 'Poison', 60, 65, 60, 130, 110),
('Onix', 'Rock', 'Ground', 35, 45, 160, 30, 70),
('Drowzee', 'Psychic', NULL, 60, 48, 45, 90, 42),
('Hypno', 'Psychic', NULL, 85, 73, 70, 115, 67),
('Krabby', 'Water', NULL, 30, 105, 90, 25, 50),
('Kingler', 'Water', NULL, 55, 130, 115, 50, 75),
('Voltorb', 'Electric', NULL, 40, 30, 50, 55, 100),
('Electrode', 'Electric', NULL, 60, 50, 70, 80, 150),
('Exeggcute', 'Grass', 'Psychic', 60, 40, 80, 60, 40),
('Exeggutor', 'Grass', 'Psychic', 95, 95, 85, 125, 55),
('Cubone', 'Ground', NULL, 50, 50, 95, 40, 35),
('Marowak', 'Ground', NULL, 60, 80, 110, 50, 45),
('Hitmonlee', 'Fighting', NULL, 50, 120, 53, 35, 87),
('Hitmonchan', 'Fighting', NULL, 50, 105, 79, 35, 76),
('Lickitung', 'Normal', NULL, 90, 55, 75, 60, 30),
('Koffing', 'Poison', NULL, 40, 65, 95, 60, 35),
('Weezing', 'Poison', NULL, 65, 90, 120, 85, 60),
('Rhyhorn', 'Ground', 'Rock', 80, 85, 95, 30, 25),
('Rhydon', 'Ground', 'Rock', 105, 130, 120, 45, 40),
('Chansey', 'Normal', NULL, 250, 5, 5, 105, 50),
('Tangela', 'Grass', NULL, 65, 55, 115, 100, 60),
('Kangaskhan', 'Normal', NULL, 105, 95, 80, 40, 90),
('Horsea', 'Water', NULL, 30, 40, 70, 70, 60),
('Seadra', 'Water', NULL, 55, 65, 95, 95, 85),
('Goldeen', 'Water', NULL, 45, 67, 60, 50, 63),
('Seaking', 'Water', NULL, 80, 92, 65, 80, 68),
('Staryu', 'Water', NULL, 30, 45, 55, 70, 85),
('Starmie', 'Water', 'Psychic', 60, 75, 85, 100, 115),
('Mr. Mime', 'Psychic', 'Fairy', 40, 45, 65, 100, 90),
('Scyther', 'Bug', 'Flying', 70, 110, 80, 55, 105),
('Jynx', 'Ice', 'Psychic', 65, 50, 35, 115, 95),
('Electabuzz', 'Electric', NULL, 65, 83, 57, 95, 105),
('Magmar', 'Fire', NULL, 65, 95, 57, 100, 93),
('Pinsir', 'Bug', NULL, 65, 125, 100, 55, 85),
('Tauros', 'Normal', NULL, 75, 100, 95, 40, 110),
('Magikarp', 'Water', NULL, 20, 10, 55, 20, 80),
('Gyarados', 'Water', 'Flying', 95, 125, 79, 60, 81),
('Lapras', 'Water', 'Ice', 130, 85, 80, 95, 60),
('Ditto', 'Normal', NULL, 48, 48, 48, 48, 48),
('Eevee', 'Normal', NULL, 55, 55, 50, 45, 55),
('Vaporeon', 'Water', NULL, 130, 65, 60, 110, 65),
('Jolteon', 'Electric', NULL, 65, 65, 60, 110, 130),
('Flareon', 'Fire', NULL, 65, 130, 60, 95, 65),
('Porygon', 'Normal', NULL, 65, 60, 70, 75, 40),
('Omanyte', 'Rock', 'Water', 35, 40, 100, 90, 35),
('Omastar', 'Rock', 'Water', 70, 60, 125, 115, 55),
('Kabuto', 'Rock', 'Water', 30, 80, 90, 55, 55),
('Kabutops', 'Rock', 'Water', 60, 115, 105, 70, 80),
('Aerodactyl', 'Rock', 'Flying', 80, 105, 65, 60, 130),
('Snorlax', 'Normal', NULL, 160, 110, 65, 65, 30),
('Articuno', 'Ice', 'Flying', 90, 85, 100, 95, 85),
('Zapdos', 'Electric', 'Flying', 90, 90, 85, 125, 100),
('Moltres', 'Fire', 'Flying', 90, 100, 90, 125, 90),
('Dratini', 'Dragon', NULL, 41, 64, 45, 50, 50),
('Dragonair', 'Dragon', NULL, 61, 84, 65, 70, 70),
('Dragonite', 'Dragon', 'Flying', 91, 134, 95, 100, 80),
('Mewtwo', 'Psychic', NULL, 106, 110, 90, 154, 130),
('Mew', 'Psychic', NULL, 100, 100, 100, 100, 100);






INSERT INTO Move (name, type, power, accuracy) VALUES
-- Normal Moves
('Tackle', 'Normal', 40, 100),
('Body Slam', 'Normal', 85, 100),
('Double-Edge', 'Normal', 120, 100),
('Hyper Beam', 'Normal', 150, 90),
('Mega Punch', 'Normal', 80, 85),
('Mega Kick', 'Normal', 120, 75),
('Quick Attack', 'Normal', 40, 100),
('Seismic Toss', 'Normal', NULL, 100),
('Slam', 'Normal', 80, 75),
('Substitute', 'Normal', NULL, NULL),
('Take Down', 'Normal', 90, 85),
('Tail Whip', 'Normal', NULL, 100),
('Growl', 'Normal', NULL, 100),
('Defense Curl', 'Normal', NULL, NULL),
('Soft-Boiled', 'Normal', NULL, NULL),
('Rage', 'Normal', 20, 100),

-- Fire Moves
('Ember', 'Fire', 40, 100),
('Flamethrower', 'Fire', 90, 100),
('Fire Blast', 'Fire', 110, 85),
('Fire Spin', 'Fire', 35, 85),

-- Water Moves
('Water Gun', 'Water', 40, 100),
('Surf', 'Water', 90, 100),
('Hydro Pump', 'Water', 110, 80),
('Bubble', 'Water', 40, 100),
('BubbleBeam', 'Water', 65, 100),
('Mist', 'Water', NULL, NULL),

-- Grass Moves
('Vine Whip', 'Grass', 45, 100),
('Razor Leaf', 'Grass', 55, 95),
('Growth', 'Grass', NULL, NULL),
('Leech Seed', 'Grass', NULL, 90),
('Stun Spore', 'Grass', NULL, 75),
('Sleep Powder', 'Grass', NULL, 75),
('PoisonPowder', 'Grass', NULL, 75),

-- Electric Moves
('Thunder Shock', 'Electric', 40, 100),
('Thunderbolt', 'Electric', 90, 100),
('Thunder Wave', 'Electric', NULL, 90),
('Thunder', 'Electric', 110, 70),

-- Ice Moves
('Ice Beam', 'Ice', 90, 100),
('Blizzard', 'Ice', 110, 70),
('Aurora Beam', 'Ice', 65, 100),
('Wrap', 'Ice', 15, 90),

-- Fighting Moves
('Karate Chop', 'Fighting', 50, 100),
('Low Kick', 'Fighting', NULL, 100),
('Counter', 'Fighting', NULL, 100),
('Submission', 'Fighting', 80, 80),

-- Poison Moves
('Poison Sting', 'Poison', 15, 100),
('Toxic', 'Poison', NULL, 90),
('Acid', 'Poison', 40, 100),
('Smokescreen', 'Poison', NULL, 100),

-- Ground Moves
('Dig', 'Ground', 80, 100),
('Earthquake', 'Ground', 100, 100),

-- Flying Moves
('Gust', 'Flying', 40, 100),
('Fly', 'Flying', 90, 95),
('Wing Attack', 'Flying', 60, 100),

-- Psychic Moves
('Confusion', 'Psychic', 50, 100),
('Psychic', 'Psychic', 90, 100),
('Hypnosis', 'Psychic', NULL, 60),
('Psywave', 'Psychic', NULL, 100),
('Teleport', 'Psychic', NULL, NULL),

-- Bug Moves
('String Shot', 'Bug', NULL, 95),
('Leech Life', 'Bug', 80, 100),
('Twineedle', 'Bug', 25, 100),
('Bug Bite', 'Bug', 60, 100),

-- Rock Moves
('Rock Throw', 'Rock', 50, 90),
('Rock Slide', 'Rock', 75, 90),
('Self-Destruct', 'Rock', 200, 100),
('Explosion', 'Rock', 250, 100),

-- Ghost Moves
('Lick', 'Ghost', 30, 100),
('Night Shade', 'Ghost', NULL, 100),

-- Dragon Moves
('Dragon Rage', 'Dragon', NULL, 100),
('Dragon Breath', 'Dragon', 60, 100);





INSERT INTO Trainers (trainer_id, name)
VALUES
('Ash'),
('Misty'),
('Brock'),
('Lt. Surge'),
('Erika'),
('Koga'),
('Sabrina'),
('Blaine'),
('Giovanni'),
('Lorelei');


INSERT INTO TrainerPokemon (trainer_id, pokemon_id, nickname, level, current_hp)
VALUES
-- Ash's Pokémon
(1, 25, 'Sparky', 10, 35),      -- Pikachu
(1, 1, 'Leafy', 8, 45),         -- Bulbasaur
(1, 4, 'Flare', 9, 39),          -- Charmander
(1, 7, 'Bubbles', 8, 44),        -- Squirtle

-- Misty's Pokémon
(2, 120, 'Sting', 12, 38),       -- Staryu
(2, 121, 'Shelly', 14, 50),      -- Starmie
(2, 54, 'Quackers', 10, 40),     -- Psyduck

-- Brock's Pokémon
(3, 95, 'Onixy', 15, 90),        -- Onix
(3, 74, 'Geodude', 12, 40),      -- Geodude
(3, 111, 'Zubats', 10, 30),      -- Zubat (if he caught one)

-- Lt. Surge's Pokémon
(4, 26, 'Bolt', 20, 50),         -- Raichu
(4, 25, 'Sparky Jr.', 18, 45),   -- Pikachu

-- Erika's Pokémon
(5, 71, 'Vile', 16, 60),         -- Victreebel
(5, 69, 'Oddy', 14, 45),         -- Oddish

-- Koga's Pokémon
(6, 109, 'Weezy', 17, 55),       -- Weezing
(6, 110, 'Muk', 18, 65),         -- Muk
(6, 43, 'Venonat', 12, 40),      -- Venonat

-- Sabrina's Pokémon
(7, 64, 'Alak', 20, 55),         -- Alakazam
(7, 65, 'Kadabra', 18, 50),      -- Kadabra

-- Blaine's Pokémon
(8, 59, 'Magmy', 18, 50),        -- Magmar
(8, 60, 'Ponyta', 16, 55),       -- Ponyta

-- Giovanni's Pokémon
(9, 95, 'Rokky', 22, 90),        -- Rhydon
(9, 92, 'Nido', 20, 65),         -- Nidoking

-- Lorelei's Pokémon
(10, 121, 'Stary', 18, 50),      -- Starmie
(10, 122, 'Cloy', 16, 45);       -- Cloyster

