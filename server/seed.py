from app import app
from models import db, User, Pet, StaySession

with app.app_context():
    print("Clearing and Seeding database...")

    # It's better to delete data rather than drop_all if you're using Flask-Migrate
    StaySession.query.delete()
    Pet.query.delete()
    User.query.delete()

    # Users (Changing 'name' to 'username' and adding 'email')
    users = [
        User(username="Alex", email="alex@paws.com"),
        User(username="Brenda", email="brenda@paws.com"),
        User(username="Chris", email="chris@paws.com"),
        User(username="Diana", email="diana@paws.com"),
        User(username="Evan", email="evan@paws.com")
    ]
    db.session.add_all(users)
    db.session.commit()

    # Pets
    pets = [
        Pet(name="Max", owner_id=users[0].id),
        Pet(name="Bella", owner_id=users[0].id),
        Pet(name="Rocky", owner_id=users[1].id),
        Pet(name="Milo", owner_id=users[1].id),
        Pet(name="Luna", owner_id=users[2].id),
        Pet(name="Charlie", owner_id=users[2].id),
        Pet(name="Coco", owner_id=users[3].id),
        Pet(name="Buddy", owner_id=users[3].id),
        Pet(name="Daisy", owner_id=users[4].id),
        Pet(name="Leo", owner_id=users[4].id),
    ]
    db.session.add_all(pets)
    db.session.commit()

    # Sessions (Many-to-Many connections)
    sessions = [
        StaySession(sitter_id=users[1].id, pet_id=1, daily_rate=20.0, special_instructions="Morning walks"),
        StaySession(sitter_id=users[2].id, pet_id=2, daily_rate=25.0, special_instructions="Wet food only"),
        StaySession(sitter_id=users[3].id, pet_id=3, daily_rate=30.0, special_instructions="Afraid of thunder"),
        StaySession(sitter_id=users[4].id, pet_id=4, daily_rate=18.0, special_instructions="Loves fetch"),
        StaySession(sitter_id=users[0].id, pet_id=5, daily_rate=22.0, special_instructions="Sleeping on couch ok"),
    ]
    db.session.add_all(sessions)
    db.session.commit()

    print("Done seeding!")