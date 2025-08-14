from fastapi import FastAPI, HTTPException, Depends
from typing import List
from database import TrainerPokemon, Trainer, PokemonDatabase
app = FastAPI(title="Simple User API", description="A basic user management API", version="1.0.0")


test_db_path = "pokemon.db"
db = PokemonDatabase(test_db_path)


#db = PokemonDatabase()



def get_db():
    return PokemonDatabase()


@app.get("/")
def read_root():
    """Welcome endpoint"""
    return {"message": "Welcome to the Simple User API!"}

# Trainer Endpoints
@app.post("/trainer/", response_model=Trainer)
def create_trainer(trainer: Trainer, db: PokemonDatabase = Depends(get_db)):
    try:
        return db.create_trainer(trainer)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create trainer: {str(e)}")

@app.get("/trainer/{trainer_id}", response_model=Trainer)
def get_trainer(trainer_id: int, db: PokemonDatabase = Depends(get_db)):
    trainer = db.get_trainer(trainer_id)
    if trainer is None:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return trainer

@app.get("/trainer/", response_model=List[Trainer])
def get_all_trainers(db: PokemonDatabase = Depends(get_db)):
    return db.get_all_trainers()

@app.put("/trainer/{trainer_id}", response_model=Trainer)
def update_trainer(trainer_id: int, trainer: Trainer, db: PokemonDatabase = Depends(get_db)):
    updated_trainer = db.update_trainer(trainer_id, trainer)
    if updated_trainer is None:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return updated_trainer

@app.delete("/trainer/{trainer_id}")
def delete_trainer(trainer_id: int, db: PokemonDatabase = Depends(get_db)):
    if not db.delete_trainer(trainer_id):
        raise HTTPException(status_code=404, detail="Trainer not found")
    return {"message": "Trainer deleted successfully"}

# TrainerPokemon Endpoints
@app.post("/trainerpokemon/", response_model=TrainerPokemon)
def create_trainer_pokemon(tp: TrainerPokemon, db: PokemonDatabase = Depends(get_db)):
    try:
        return db.create_trainer_pokemon(tp)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create TrainerPokemon: {str(e)}")

@app.get("/trainerpokemon/{tp_id}", response_model=TrainerPokemon)
def get_trainer_pokemon(tp_id: int, db: PokemonDatabase = Depends(get_db)):
    tp = db.get_trainer_pokemon(tp_id)
    if tp is None:
        raise HTTPException(status_code=404, detail="Trainer not found")
    return tp

@app.get("/trainerpokemon/", response_model=List[TrainerPokemon])
def get_all_trainer_pokemons(db: PokemonDatabase = Depends(get_db)):
    return db.get_all_trainer_pokemons()

@app.put("/trainerpokemon/{tp_id}", response_model=TrainerPokemon)
def update_trainer_pokemon(tp_id: int, tp: TrainerPokemon, db: PokemonDatabase = Depends(get_db)):
    updated_tp = db.update_trainer_pokemon(tp_id, tp)
    if updated_tp is None:
        raise HTTPException(status_code=404, detail="TrainerPokemon not found")
    return updated_tp

@app.delete("/trainerpokemon/{tp_id}")
def delete_trainer_pokemon(tp_id: int, db: PokemonDatabase = Depends(get_db)):
    if not db.delete_trainer_pokemon(tp_id):
        raise HTTPException(status_code=404, detail="TrainerPokemon not found")
    return {"message": "TrainerPokemon deleted successfully"}
