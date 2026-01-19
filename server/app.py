from flask import Flask, request, jsonify, make_response, session
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession, bcrypt

app = Flask(__name__)
app.secret_key = b'paws_stay_secret_key_123' 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///paws.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Ensure cookies work on localhost
app.config.update(
    SESSION_COOKIE_SAMESITE='Lax',
    SESSION_COOKIE_SECURE=False,
)

db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)

# FIX: Explicitly allow localhost:3000 with credentials for session support
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

@app.get("/check_session")
def check_session():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        if user:
            return make_response(user.to_dict(), 200)
    return make_response({"error": "No active session"}, 401)

@app.post("/login")
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get("username")).first()
    if user and user.authenticate(data.get("password")):
        session["user_id"] = user.id
        return make_response(user.to_dict(), 200)
    return make_response({"error": "Invalid credentials"}, 401)

@app.delete("/logout")
def logout():
    session.pop("user_id", None)
    return make_response({}, 204)

# FIX: Added the missing /pets route for MyPets.js
@app.get("/pets")
def get_my_pets():
    user_id = session.get("user_id")
    if not user_id:
        return make_response({"error": "Unauthorized"}, 401)
    
    # Fetch only pets owned by the logged-in user
    user_pets = Pet.query.filter_by(owner_id=user_id).all()
    return make_response(jsonify([p.to_dict() for p in user_pets]), 200)

@app.get("/available_pets")
def get_available_pets():
    user_id = session.get("user_id")
    booked_pet_ids = [s.pet_id for s in StaySession.query.all()]
    # Pets not owned by user and not currently booked
    pets = Pet.query.filter(Pet.owner_id != user_id, ~Pet.id.in_(booked_pet_ids)).all()
    return make_response(jsonify([p.to_dict() for p in pets]), 200)

@app.get("/my_bookings")
def get_my_bookings():
    user_id = session.get("user_id")
    bookings = StaySession.query.filter_by(sitter_id=user_id).all()
    return make_response(jsonify([b.to_dict() for b in bookings]), 200)

@app.post("/book_stay")
def book_stay():
    user_id = session.get("user_id")
    data = request.get_json()
    new_session = StaySession(pet_id=data.get("pet_id"), sitter_id=user_id)
    db.session.add(new_session)
    db.session.commit()
    return make_response(new_session.to_dict(), 201)

if __name__ == '__main__':
    app.run(port=5555, debug=True)