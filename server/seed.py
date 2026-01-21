from config import app, db
from models import User, Pet, Sitter, Booking

with app.app_context():
    print("Clearing database...")
    Booking.query.delete()
    Pet.query.delete()
    Sitter.query.delete()
    User.query.delete()

    print("Creating users...")
    u1 = User(username="Freddy")
    # This triggers the @password_hash.setter to encrypt the password
    u1.password_hash = "password123" 
    
    db.session.add(u1)
    db.session.commit() # Commit to get u1.id

    print("Creating sitters...")
    s1 = Sitter(name="Alice Smith", hourly_rate=25.0, bio="Dog expert.")
    s2 = Sitter(name="Bob Jones", hourly_rate=20.0, bio="Cat lover.")
    db.session.add_all([s1, s2])
    db.session.commit()

    print("Creating pets...")
    p1 = Pet(name="Buddy", species="Dog", age=3, user_id=u1.id)
    p2 = Pet(name="Luna", species="Cat", age=2, user_id=u1.id)
    db.session.add_all([p1, p2])
    db.session.commit()

    print("Creating sample bookings...")
    # This proves your Many-to-Many relationship works!
    b1 = Booking(
        appointment_date="2026-05-01", 
        notes="Buddy needs a long walk.", 
        pet_id=p1.id, 
        sitter_id=s1.id
    )
    db.session.add(b1)
    db.session.commit()

    print("Database seeded! 🐾")