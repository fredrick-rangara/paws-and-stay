from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    # Rules: Stop the loop before it goes back to User
    serialize_rules = ('-pets.owner', '-stay_sessions.sitter',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, nullable=False)

    # Relationships
    pets = db.relationship('Pet', back_populates='owner', cascade='all, delete-orphan')
    stay_sessions = db.relationship('StaySession', back_populates='sitter')

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    
    # Rules: Stop the loop before it goes back to Pet
    serialize_rules = ('-owner.pets', '-sessions.pet',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String)
    age = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    owner = db.relationship('User', back_populates='pets')
    sessions = db.relationship('StaySession', back_populates='pet')

class StaySession(db.Model, SerializerMixin):
    __tablename__ = 'stay_sessions'
    
    # Rules: Prevent deep nesting
    serialize_rules = ('-pet.sessions', '-sitter.stay_sessions',)

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    sitter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    special_instructions = db.Column(db.String)
    daily_rate = db.Column(db.Float)

    # Relationships
    pet = db.relationship('Pet', back_populates='sessions')
    sitter = db.relationship('User', back_populates='stay_sessions')