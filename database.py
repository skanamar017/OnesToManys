
import sqlite3
from typing import Optional, List
from pydantic import BaseModel
import os

class Trainer(BaseModel):
    id: Optional[int] = None
    name: str

class TrainerPokemon(BaseModel):
    id: Optional[int] = None
    trainer_id: int
    pokemon_id: int
    nickname: Optional[str] = None
    level: int
    current_hp: int

class PokemonDatabase:
    def __init__(self, db_path: str = "pokemon.db"):
        self.db_path = db_path
        self.init_db()

    def init_db(self):
        """Initialize the database using create.sql and insert.sql"""
        if not os.path.exists(self.db_path):
            with sqlite3.connect(self.db_path) as conn:
                for sql_file in ["create.sql", "insert.sql"]:
                    with open(sql_file, "r") as f:
                        sql_script = f.read()
                        conn.executescript(sql_script)
                conn.commit()

    def create_trainer(self, trainer: Trainer) -> Trainer:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute(
                "INSERT INTO Trainer (name) VALUES (?)",
                (trainer.name,)
            )
            trainer.id = cursor.lastrowid
            conn.commit()
        return trainer

    def get_trainer(self, trainer_id: int) -> Optional[Trainer]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM Trainer WHERE id = ?", (trainer_id,))
            row = cursor.fetchone()
            if row:
                return Trainer(**dict(row))
        return None

    def get_all_trainers(self) -> List[Trainer]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM Trainer")
            rows = cursor.fetchall()
            return [Trainer(**dict(row)) for row in rows]

    def update_trainer(self, trainer_id: int, trainer: Trainer) -> Optional[Trainer]:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                "UPDATE Trainer SET name = ? WHERE id = ?",
                (trainer.name, trainer_id)
            )
            if conn.total_changes == 0:
                return None
            conn.commit()
            trainer.id = trainer_id
            return trainer

    def delete_trainer(self, trainer_id: int) -> bool:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("DELETE FROM Trainer WHERE id = ?", (trainer_id,))
            deleted = conn.total_changes > 0
            conn.commit()
            return deleted




    def create_trainer_pokemon(self, tp: TrainerPokemon) -> TrainerPokemon:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute(
                "INSERT INTO TrainerPokemon (trainer_id, pokemon_id, nickname, level, current_hp) VALUES (?, ?, ?, ?, ?)",
                (tp.trainer_id, tp.pokemon_id, tp.nickname, tp.level, tp.current_hp)
            )
            tp.id = cursor.lastrowid
            conn.commit()
        return tp

    def get_trainer_pokemon(self, trainer_id: int) -> List[TrainerPokemon]:
        with sqlite3.connect(self.db_path) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.execute("SELECT * FROM TrainerPokemon WHERE trainer_id = ?", (trainer_id,))
            rows = cursor.fetchall()
            return [TrainerPokemon(**dict(row)) for row in rows]

    def update_trainer_pokemon(self, tp_id: int, tp: TrainerPokemon) -> Optional[TrainerPokemon]:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                """UPDATE TrainerPokemon 
                   SET trainer_id = ?, pokemon_id = ?, nickname = ?, level = ?, current_hp = ?
                   WHERE id = ?""",
                (tp.trainer_id, tp.pokemon_id, tp.nickname, tp.level, tp.current_hp, tp_id)
            )
            if conn.total_changes == 0:
                return None
            conn.commit()
            tp.id = tp_id
            return tp

    def delete_trainer_pokemon(self, tp_id: int) -> bool:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("DELETE FROM TrainerPokemon WHERE id = ?", (tp_id,))
            deleted = conn.total_changes > 0
            conn.commit()
            return deleted
