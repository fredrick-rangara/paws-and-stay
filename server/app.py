from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///instance/paws.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
Migrate(app, db)
CORS(app)

# -------- AUTH SIMULATION --------
@app.get("/check_session")
def check_session():
    return jsonify(User.query.first().to_dict())

# -------- USERS --------
@app.get("/users")
def users():
    return jsonify([u.to_dict() for u in User.query.all()])

# -------- PETS (CRUD) --------
@app.get("/pets")
def pets():
    return jsonify([p.to_dict() for p in Pet.query.all()])

@app.post("/pets")
def create_pet():
    pet = Pet(**request.json)
    db.session.add(pet)
    db.session.commit()
    return jsonify(pet.to_dict()), 201

@app.patch("/pets/<int:id>")
def update_pet(id):
    pet = Pet.query.get_or_404(id)
    for k, v in request.json.items():
        setattr(pet, k, v)
    db.session.commit()
    return jsonify(pet.to_dict())

@app.delete("/pets/<int:id>")
def delete_pet(id):
    pet = Pet.query.get_or_404(id)
    db.session.delete(pet)
    db.session.commit()
    return jsonify({"message": "Deleted"})

# -------- STAY SESSIONS (Many-to-Many) --------
@app.post("/stay_sessions")
def create_session():
    session = StaySession(**request.json)
    db.session.add(session)
    db.session.commit()
    return jsonify(session.to_dict()), 201

@app.get("/stay_sessions")
def sessions():
    return jsonify([s.to_dict() for s in StaySession.query.all()])

if __name__ == "__main__":
    app.run(debug=True)
