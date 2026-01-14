from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession  # Ensure all are imported

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

# --- MEMBER 3 ROUTE START ---

@app.route('/stay_sessions', methods=['POST'])
def create_stay_session():
    # 1. Get the data sent from the React form
    data = request.get_json()
    
    try:
        # 2. Create a new instance of the StaySession model
        # The fields here must match the keys sent from your Formik form
        new_session = StaySession(
            pet_id=data.get('pet_id'),
            sitter_id=data.get('sitter_id'),
            daily_rate=float(data.get('daily_rate')),
            special_instructions=data.get('special_instructions')
        )
        
        # 3. Add and commit to the database
        db.session.add(new_session)
        db.session.commit()
        
        # 4. Return the new object as JSON with a 201 (Created) status
        return make_response(new_session.to_dict(), 201)
    
    except Exception as e:
        # 5. If something goes wrong (e.g. invalid ID), return the error
        db.session.rollback()
        return make_response({"errors": [str(e)]}, 400)

# --- MEMBER 3 ROUTE END ---

if __name__ == '__main__':
    app.run(port=5555, debug=True)