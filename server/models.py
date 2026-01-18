from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # Relationships
    pets = db.relationship('Pet', backref='owner', lazy=True)
    stay_sessions = db.relationship('StaySession', backref='sitter', lazy=True)

    serialize_rules = ('-pets.owner', '-stay_sessions.sitter', '-_password_hash')

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    sessions = db.relationship('StaySession', backref='pet', lazy=True)
    serialize_rules = ('-owner.pets', '-sessions.pet')

class StaySession(db.Model, SerializerMixin):
    __tablename__ = 'stay_sessions'
    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    sitter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    daily_rate = db.Column(db.Float)
    
    serialize_rules = ('-pet.sessions', '-sitter.stay_sessions')