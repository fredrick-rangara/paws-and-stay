from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///paws.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False # Makes JSON more readable in the browser

db.init_app(app)
Migrate(app, db)
CORS(app)

# -------- AUTH / SESSION --------
@app.get("/check_session")
def check_session():
    # In a real app, you'd use session.get('user_id')
    user = User.query.first()
    if user:
        return jsonify(user.to_dict()), 200
    return make_response(jsonify({"error": "No active session"}), 401)

# -------- DASHBOARD (Many-to-Many logic) --------
@app.route('/dashboard', methods=['GET'])
def dashboard():
    user = User.query.first() 
    if not user:
        return make_response(jsonify({"error": "No users in system"}), 404)

    # One-to-Many: Pets owned by this user
    owned_pets = Pet.query.filter_by(owner_id=user.id).all()
    
    # Many-to-Many: StaySessions where this user is the sitter
    sitting_sessions = StaySession.query.filter_by(sitter_id=user.id).all()
    
    # Extract the Pet objects from those sessions
    # Using a list comprehension ensures we handle cases with no sessions gracefully
    sitting_pets = [session.pet for session in sitting_sessions if session.pet]

    return jsonify({
        "user": user.to_dict(),
        "owned_pets": [pet.to_dict() for pet in owned_pets],
        "sitting_for": [pet.to_dict() for pet in sitting_pets]
    }), 200

# -------- PETS (CRUD) --------
@app.get("/pets")
def get_pets():
    pets = Pet.query.all()
    return jsonify([p.to_dict(only=('id', 'name', 'species')) for p in pets]), 200

@app.post("/pets")
def create_pet():
    data = request.get_json()
    try:
        # Basic validation: ensure name and owner_id exist
        if not data.get('name') or not data.get('owner_id'):
            return make_response(jsonify({"errors": ["Missing name or owner_id"]}), 400)
            
        pet = Pet(
            name=data.get('name'),
            species=data.get('species'),
            owner_id=data.get('owner_id')
        )
        db.session.add(pet)
        db.session.commit()
        return jsonify(pet.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({"errors": [str(e)]}), 400)

# -------- STAY SESSIONS --------
@app.post("/stay_sessions")
def create_stay_session():
    data = request.get_json()
    try:
        # Validate required fields
        required = ['pet_id', 'sitter_id', 'daily_rate']
        if not all(k in data for k in required):
            return make_response(jsonify({"errors": ["Missing required booking fields"]}), 400)

        new_session = StaySession(
            pet_id=data.get('pet_id'),
            sitter_id=data.get('sitter_id'),
            daily_rate=float(data.get('daily_rate')),
            special_instructions=data.get('special_instructions', "")
        )
        db.session.add(new_session)
        db.session.commit()
        return make_response(jsonify(new_session.to_dict()), 201)
    except Exception as e:
        db.session.rollback()
        return make_response(jsonify({"errors": [str(e)]}), 400)

if __name__ == '__main__':
    app.run(port=5555, debug=True)