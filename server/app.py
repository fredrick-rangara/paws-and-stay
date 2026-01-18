from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

# --- MEMBER 3 ROUTE START ---

@app.route('/stay_sessions', methods=['POST'])
def create_stay_session():

    data = request.get_json()
    
    try:
        new_session = StaySession(
            pet_id=data.get('pet_id'),
            sitter_id=data.get('sitter_id'),
            daily_rate=float(data.get('daily_rate')),
            special_instructions=data.get('special_instructions')
        )
        
        db.session.add(new_session)
        db.session.commit()
        
        return make_response(new_session.to_dict(), 201)
    
    except Exception as e:
        db.session.rollback()
        return make_response({"errors": [str(e)]}, 400)

# --- MEMBER 3 ROUTE END ---


# -------- MEMBER 5 ROUTES START --------

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


@app.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    return jsonify([p.to_dict() for p in pets])


@app.route('/dashboard', methods=['GET'])
def dashboard():

    user = User.query.first()

    if not user:
        return make_response({"error": "No users in system"}, 404)

    owned_pets = Pet.query.filter_by(owner_id=user.id).all()

    sitting_sessions = StaySession.query.filter_by(sitter_id=user.id).all()

    sitting_pets = [session.pet for session in sitting_sessions]

    return jsonify({
        "user": user.to_dict(),
        "owned_pets": [pet.to_dict() for pet in owned_pets],
        "sitting_for": [pet.to_dict() for pet in sitting_pets]
    })


@app.route('/check_session', methods=['GET'])
def check_session():
    user = User.query.first()

    if user:
        return jsonify(user.to_dict())
    return make_response({"error": "No active session"}, 401)

# -------- MEMBER 5 ROUTES END --------


if __name__ == '__main__':
    app.run(port=5555, debug=True)
