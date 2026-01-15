from app import app, db
from models import db, User, Pet, StaySession

with app.app_context():
    print("Seeding database...")

    db.drop_all()
    db.create_all()

    # Users
    users = [
        User(name="Alex"),
        User(name="Brenda"),
        User(name="Chris"),
        User(name="Diana"),
        User(name="Evan")
    ]
    db.session.add_all(users)
    db.session.commit()

    # Pets
    pets = [
        Pet(name="Max", owner_id=1),
        Pet(name="Bella", owner_id=1),
        Pet(name="Rocky", owner_id=2),
        Pet(name="Milo", owner_id=2),
        Pet(name="Luna", owner_id=3),
        Pet(name="Charlie", owner_id=3),
        Pet(name="Coco", owner_id=4),
        Pet(name="Buddy", owner_id=4),
        Pet(name="Daisy", owner_id=5),
        Pet(name="Leo", owner_id=5),
    ]
    db.session.add_all(pets)
    db.session.commit()

    # Sessions
    sessions = [
        StaySession(sitter_id=2, pet_id=1, daily_rate=20),
        StaySession(sitter_id=3, pet_id=2, daily_rate=25),
        StaySession(sitter_id=4, pet_id=3, daily_rate=30),
        StaySession(sitter_id=5, pet_id=4, daily_rate=18),
        StaySession(sitter_id=1, pet_id=5, daily_rate=22),
    ]
    db.session.add_all(sessions)
    db.session.commit()

    print("Done seeding ")
