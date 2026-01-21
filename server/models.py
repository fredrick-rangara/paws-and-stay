from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('username')
    def validate_username(self, key, username):
        if not username or len(username) < 3:
            raise ValueError("Username must be at least 3 characters.")
        return username

    pets = db.relationship('Pet', back_populates='user', cascade='all, delete-orphan')
    serialize_rules = ('-pets.user', '-_password_hash',)

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    @validates('age')
    def validate_age(self, key, age):
        if not (0 <= int(age) <= 30):
            raise ValueError("Age must be between 0 and 30.")
        return age

    user = db.relationship('User', back_populates='pets')
    bookings = db.relationship('Booking', back_populates='pet', cascade='all, delete-orphan')
    sitters = association_proxy('bookings', 'sitter')
    serialize_rules = ('-user.pets', '-bookings.pet',)

class Sitter(db.Model, SerializerMixin):
    __tablename__ = 'sitters'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    hourly_rate = db.Column(db.Float)
    bio = db.Column(db.String)

    bookings = db.relationship('Booking', back_populates='sitter', cascade='all, delete-orphan')
    pets = association_proxy('bookings', 'pet')
    serialize_rules = ('-bookings.sitter',)

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.String, nullable=False)
    notes = db.Column(db.String)
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable=False)
    sitter_id = db.Column(db.Integer, db.ForeignKey('sitters.id'), nullable=False)

    pet = db.relationship('Pet', back_populates='bookings')
    sitter = db.relationship('Sitter', back_populates='bookings')
    serialize_rules = ('-pet.bookings', '-sitter.bookings',)