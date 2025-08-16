'''
import pytest
import os
from fastapi.testclient import TestClient
from main import app, get_db
from database import PokemonDatabase

client = TestClient(app)

def test_db():
    """Create a test database that gets cleaned up after each test"""
    test_db_path = "test_pokemon.db"
    db = PokemonDatabase(test_db_path)
    # Cleanup
    if os.path.exists(test_db_path):
        os.remove(test_db_path)

def test_root_endpoint():
    """Test the welcome endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Simple User API!"}


'''
def test_create_trainer():

    trainer_data = {"name": "Ash"}
    response = client.post("/trainer/", json=trainer_data)
    assert response.status_code == 200
    trainer = response.json()
    assert trainer["name"] == "Ash"
    assert "id" in trainer
'''

def test_create_trainer():
    
    test_db_path = "test_pokemon.db"
    test_db = PokemonDatabase(test_db_path)

    app.dependency_overrides[get_db] = lambda: test_db
    
    trainer_data = {"name": "Ash"}
    response = client.post("/Trainers/", json=trainer_data)
    assert response.status_code == 200

def test_get_trainer():
    trainer_data = {"name": "Misty"}
    create_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = create_response.json()["id"]

    response = client.get(f"/Trainers/{trainer_id}")
    assert response.status_code == 200
    trainer = response.json()
    assert trainer["name"] == "Misty"
    assert trainer["id"] == trainer_id


def test_get_all_trainers():
    trainer_names = ["Ash", "Misty", "Brock"]
    for name in trainer_names:
        client.post("/Trainers/", json={"name": name})

    response = client.get("/Trainers/")
    assert response.status_code == 200

    trainers = response.json()
    returned_names = [trainer["name"] for trainer in trainers]

    for name in trainer_names:
        assert name in returned_names


def test_update_trainer():
    trainer_data = {"name": "Gary"}
    create_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = create_response.json()["id"]

    updated_data = {"name": "Professor Oak"}
    response = client.put(f"/Trainers/{trainer_id}", json=updated_data)
    assert response.status_code == 200
    updated_trainer = response.json()
    assert updated_trainer["name"] == "Professor Oak"

def test_delete_trainer():
    trainer_data = {"name": "Tracey"}
    create_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = create_response.json()["id"]

    response = client.delete(f"/Trainers/{trainer_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Trainer deleted successfully"

    get_response = client.get(f"/Trainers/{trainer_id}")
    assert get_response.status_code == 404

def test_create_trainer_pokemon():
    test_db_path = "test_pokemon.db"
    test_db = PokemonDatabase(test_db_path)

    app.dependency_overrides[get_db] = lambda: test_db

    trainer_data = {"name": "Red"}
    trainer_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = trainer_response.json()["id"]

    tp_data = {
        "trainer_id": trainer_id,
        "pokemon_id": 25,
        "nickname": "Pikachu",
        "level": 50,
        "current_hp": 120
    }
    response = client.post(f"/Trainers/{trainer_id}/TrainerPokemon", json=tp_data)
    assert response.status_code == 200
    tp = response.json()
    assert tp["nickname"] == "Pikachu"
    assert "id" in tp

def test_get_trainer_pokemon():
    trainer_data = {"name": "Blue"}
    trainer_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = trainer_response.json()["id"]

    tp_data = {
        "trainer_id": trainer_id,
        "pokemon_id": 1,
        "nickname": "Bulbasaur",
        "level": 30,
        "current_hp": 100
    }
    client.post(f"/Trainers/{trainer_id}/TrainerPokemon", json=tp_data)

    
    tp_response = client.post(f"/Trainers/{trainer_id}/TrainerPokemon", json=tp_data)
    tp_id = tp_response.json()["id"]

    response = client.get(f"/Trainers/{trainer_id}/TrainerPokemon")
    assert response.status_code == 200


def test_get_all_trainer_pokemon():
    # Create a trainer
    trainer_response = client.post("/Trainers/", json={"name": "Red"})
    trainer_id = trainer_response.json()["id"]

    # Create trainer-pokemon entries
    tp_data_list = [
        {"trainer_id": trainer_id, "pokemon_id": 25, "nickname": "Pikachu", "level": 50, "current_hp": 120},
        {"trainer_id": trainer_id, "pokemon_id": 1, "nickname": "Bulbasaur", "level": 30, "current_hp": 100}
    ]

    for tp_data in tp_data_list:
        client.post(f"/Trainers/{trainer_id}/TrainerPokemon", json=tp_data)

    # Fetch all trainer-pokemon entries
    response = client.get(f"/Trainers/{trainer_id}/TrainerPokemon")
    assert response.status_code == 200

    tp_list = response.json()
    nicknames = [tp["nickname"] for tp in tp_list]

    # Check that all created nicknames are in the response
    for tp_data in tp_data_list:
        assert tp_data["nickname"] in nicknames


def test_update_trainer_pokemon():
    trainer_data = {"name": "Green"}
    trainer_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = trainer_response.json()["id"]

    tp_data = {
        "trainer_id": trainer_id,
        "pokemon_id": 4,
        "nickname": "Charmander",
        "level": 20,
        "current_hp": 80
    }
    tp_response = client.post(f"/Trainers/{trainer_id}/TrainerPokemon", json=tp_data)
    tp_id = tp_response.json()["id"]

    updated_tp_data = {
        "trainer_id": trainer_id,
        "pokemon_id": 4,
        "nickname": "Charmeleon",
        "level": 35,
        "current_hp": 110
    }
    response = client.put(f"/Trainers/{trainer_id}/TrainerPokemon/{tp_id}", json=updated_tp_data)
    assert response.status_code == 200
    updated_tp = response.json()
    assert updated_tp["nickname"] == "Charmeleon"
    assert updated_tp["level"] == 35

def test_delete_trainer_pokemon():
    trainer_data = {"name": "Yellow"}
    trainer_response = client.post("/Trainers/", json=trainer_data)
    trainer_id = trainer_response.json()["id"]

    tp_data = {
        "trainer_id": trainer_id,
        "pokemon_id": 7,
        "nickname": "Squirtle",
        "level": 25,
        "current_hp": 90
    }
    tp_response = client.post(f"/Trainers/{trainer_id}/TrainerPokemon/", json=tp_data)
    tp_id = tp_response.json()["id"]

    response = client.delete(f"/Trainers/{trainer_id}/TrainerPokemon/{tp_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "TrainerPokemon deleted successfully"
'''