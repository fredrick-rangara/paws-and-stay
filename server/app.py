from flask import request, make_response
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from config import app, db, api
from models import User, Pet, Sitter, Booking

class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(username=data.get('username'))
            user.password_hash = data.get('password')
            db.session.add(user)
            db.session.commit()
            return {"message": "User created successfully"}, 201
        except Exception as e:
            db.session.rollback()
            return {"errors": [str(e)]}, 400

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()
        if user and user.authenticate(data.get('password')):
            token = create_access_token(identity=user.id)
            return {"token": token, "user": user.to_dict()}, 200
        return {"error": "Invalid credentials"}, 401

class CheckSession(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user = User.query.filter_by(id=user_id).first()
        return user.to_dict(), 200

class Pets(Resource):
    def get(self):
        return [p.to_dict() for p in Pet.query.all()], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_jwt_identity()
        try:
            new_pet = Pet(name=data['name'], species=data['species'], age=data['age'], user_id=user_id)
            db.session.add(new_pet)
            db.session.commit()
            return new_pet.to_dict(), 201
        except Exception as e:
            return {"errors": [str(e)]}, 400

class Sitters(Resource):
    def get(self):
        return [s.to_dict() for s in Sitter.query.all()], 200

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Pets, '/pets')
api.add_resource(Sitters, '/sitters')

if __name__ == '__main__':
    app.run(port=5555, debug=True)