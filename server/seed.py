from app import app
from models import db, User, Pet, StaySession

with app.app_context():
    print("🗑️ Clearing database...")
    StaySession.query.delete()
    Pet.query.delete()
    User.query.delete()

    print("👤 Creating users...")
    # Create an Owner
    fred = User(
        username="Fred",
        email="fred@gmail.com"
    )
    fred.password_hash = "password123" # This triggers the @password_hash.setter in models.py

    # Create a Sitter
    sara = User(
        username="SaraSitter",
        email="sara@gmail.com"
    )
    sara.password_hash = "password123"

    db.session.add_all([fred, sara])
    db.session.commit()

    print("🐾 Creating pets...")
    buddy = Pet(name="Buddy", species="Golden Retriever", owner_id=fred.id)
    mittens = Pet(name="Mittens", species="Tabby Cat", owner_id=fred.id)
    
    db.session.add_all([buddy, mittens])
    db.session.commit()

    print("📅 Creating stay sessions...")
    # Sara is sitting for Buddy
    session1 = StaySession(
        pet_id=buddy.id,
        sitter_id=sara.id,
        daily_rate=25.0
    )

    db.session.add(session1)
    db.session.commit()

    print("✅ Database successfully seeded!")