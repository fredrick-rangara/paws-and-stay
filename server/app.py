from flask import Flask, request, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, User, Pet, StaySession

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

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
        return make_response({"errors": [str(e)]}, 400)

if __name__ == '__main__':
    app.run(port=5555, debug=True)