from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-pets.owner', '-stay_sessions.sitter',)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, nullable=False)
    pets = db.relationship('Pet', backref='owner', lazy=True)
    stay_sessions = db.relationship('StaySession', backref='sitter', lazy=True)

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    serialize_rules = ('-owner.pets', '-sessions.pet',)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String)
    age = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sessions = db.relationship('StaySession', backref='pet', lazy=True)

class StaySession(db.Model, SerializerMixin):
    __tablename__ = 'stay_sessions'
    serialize_rules = ('-pet.sessions', '-sitter.stay_sessions',)
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    sitter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    special_instructions = db.Column(db.String)
    daily_rate = db.Column(db.Float)