from flask import request, make_response
from config import app, db, api
from models import User, Pet, Sitter, Booking
from flask_restful import Resource

class Pets(Resource):
    def get(self):
        return make_response([p.to_dict() for p in Pet.query.all()], 200)

    def post(self):
        data = request.get_json()
        try:
            new_pet = Pet(
                name=data['name'], 
                species=data['species'], 
                age=data['age'], 
                user_id=1
            )
            db.session.add(new_pet)
            db.session.commit()
            return make_response(new_pet.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"errors": [str(e)]}, 400)

class PetsById(Resource):
    def patch(self, id):
        pet = Pet.query.filter_by(id=id).first()
        if not pet:
            return make_response({"error": "Pet not found"}, 404)
        data = request.get_json()
        for attr in data:
            setattr(pet, attr, data[attr])
        db.session.commit()
        return make_response(pet.to_dict(), 200)

    def delete(self, id):
        pet = Pet.query.filter_by(id=id).first()
        if not pet:
            return make_response({"error": "Pet not found"}, 404)
        db.session.delete(pet)
        db.session.commit()
        return make_response({}, 204)

class Sitters(Resource):
    def get(self):
        return make_response([s.to_dict() for s in Sitter.query.all()], 200)

class Bookings(Resource):
    def post(self):
        data = request.get_json()
        try:
            booking = Booking(
                appointment_date=data['appointment_date'],
                notes=data.get('notes', ''),
                pet_id=data['pet_id'],
                sitter_id=data['sitter_id']
            )
            db.session.add(booking)
            db.session.commit()
            return make_response(booking.to_dict(), 201)
        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)

api.add_resource(Pets, '/pets')
api.add_resource(PetsById, '/pets/<int:id>')
api.add_resource(Sitters, '/sitters')
api.add_resource(Bookings, '/bookings')

if __name__ == '__main__':
    app.run(port=5555, debug=True)