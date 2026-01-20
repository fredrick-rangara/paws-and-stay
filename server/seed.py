from config import app, db
from models import User, Pet, Sitter, Booking

with app.app_context():
    print("Clearing database...")
    Booking.query.delete()
    Pet.query.delete()
    Sitter.query.delete()
    User.query.delete()

    u1 = User(username="Freddy")
    db.session.add(u1)
    db.session.commit()

    s1 = Sitter(name="Alice Smith", hourly_rate=25.0, bio="Dog expert.")
    s2 = Sitter(name="Bob Jones", hourly_rate=20.0, bio="Cat lover.")
    db.session.add_all([s1, s2])

    p1 = Pet(name="Buddy", species="Dog", age=3, user_id=u1.id)
    p2 = Pet(name="Luna", species="Cat", age=2, user_id=u1.id)
    db.session.add_all([p1, p2])

    db.session.commit()
    print("Database seeded! 🐾")