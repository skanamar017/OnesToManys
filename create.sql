CREATE TABLE PokemonType (
    type_name VARCHAR(20) PRIMARY KEY
);

INSERT INTO PokemonType (type_name) VALUES
('Normal'), ('Fire'), ('Water'), ('Grass'), ('Electric'),
('Ice'), ('Fighting'), ('Poison'), ('Ground'), ('Flying'),
('Psychic'), ('Bug'), ('Rock'), ('Ghost'), ('Dragon');

CREATE TABLE Pokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    type1 VARCHAR(20) NOT NULL,
    type2 VARCHAR(20),
    base_hp INT NOT NULL CHECK (base_hp >= 0),
    base_attack INT NOT NULL CHECK (base_attack >= 0),
    base_defense INT NOT NULL CHECK (base_defense >= 0),
    base_special INT NOT NULL CHECK (base_special >= 0),
    base_speed INT NOT NULL CHECK (base_speed >= 0),
    FOREIGN KEY (type1) REFERENCES PokemonType(type_name),
    FOREIGN KEY (type2) REFERENCES PokemonType(type_name)
);

CREATE TABLE Move (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    power INT,
    accuracy INT CHECK (accuracy >= 0 AND accuracy <= 100),
    FOREIGN KEY (type) REFERENCES PokemonType(type_name)
);

CREATE TABLE PokemonMove (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pokemon_id INT NOT NULL,
    move_id INT NOT NULL,
    level_learned INT,
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(id),
    FOREIGN KEY (move_id) REFERENCES Move(id)
);

CREATE TABLE Trainer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE TrainerPokemon (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trainer_id INT NOT NULL,
    pokemon_id INT NOT NULL,
    nickname VARCHAR(50),
    level INT CHECK (level BETWEEN 1 AND 100),
    FOREIGN KEY (trainer_id) REFERENCES Trainer(id),
    FOREIGN KEY (pokemon_id) REFERENCES Pokemon(id)
);
