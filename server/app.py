from flask import Flask, request, jsonify, make_response, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession, bcrypt

app = Flask(__name__)
app.secret_key = b'paws_stay_secret_key_123' 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///paws.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

@app.post("/signup")
def signup():
    data = request.get_json()
    try:
        user = User(username=data.get("username"), email=data.get("email"))
        user.password_hash = data.get("password")
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return make_response(user.to_dict(), 201)
    except Exception as e:
        return make_response({"error": str(e)}, 422)

@app.post("/login")
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if user and user.authenticate(data.get("password")):
        session["user_id"] = user.id
        return make_response(user.to_dict(), 200)
    return make_response({"error": "Invalid credentials"}, 401)

@app.get("/check_session")
def check_session():
    user = User.query.get(session.get("user_id"))
    if user:
        return make_response(user.to_dict(), 200)
    return make_response({"error": "No active session"}, 401)

@app.delete("/logout")
def logout():
    session.pop("user_id", None)
    return make_response({}, 204)

@app.get("/pets")
def get_pets():
    user = User.query.get(session.get("user_id"))
    return make_response(jsonify([p.to_dict() for p in user.pets]), 200)

@app.post("/pets")
def create_pet():
    data = request.get_json()
    new_pet = Pet(name=data.get("name"), species=data.get("species"), owner_id=session.get("user_id"))
    db.session.add(new_pet)
    db.session.commit()
    return make_response(new_pet.to_dict(), 201)

if __name__ == '__main__':
    app.run(port=5555, debug=True)