from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    # Do not serialize the password hash for security
    serialize_rules = ('-_password_hash', '-pets.owner', '-stays_as_sitter.sitter')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # Relationships
    pets = db.relationship('Pet', backref='owner', lazy=True)
    stays_as_sitter = db.relationship('StaySession', backref='sitter', lazy=True)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    serialize_rules = ('-owner.pets', '-stays.pet')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String)
    image = db.Column(db.String)
    bio = db.Column(db.String)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    stays = db.relationship('StaySession', backref='pet', lazy=True)

class StaySession(db.Model, SerializerMixin):
    __tablename__ = 'stay_sessions'
    # This rule is key: it lets us see the pet name in the booking list
    serialize_rules = ('-sitter.stays_as_sitter', '-pet.stays')

    id = db.Column(db.Integer, primary_key=True)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    sitter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    daily_rate = db.Column(db.Float, default=25.0)