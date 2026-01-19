from app import app
from models import db, User, Pet, StaySession

with app.app_context():
    print("🗑️ Clearing database...")
    StaySession.query.delete()
    Pet.query.delete()
    User.query.delete()

    print("👤 Creating users...")
    fred = User(username="Fred", email="fred@gmail.com")
    fred.password_hash = "password123"
    sara = User(username="SaraSitter", email="sara@gmail.com")
    sara.password_hash = "password123"
    db.session.add_all([fred, sara])
    db.session.commit()

    print("🐾 Creating pets...")
    buddy = Pet(
        name="Buddy", species="Dog", 
        image="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800",
        bio="A friendly Golden Retriever who loves long walks.", owner_id=fred.id
    )
    mittens = Pet(
        name="Mittens", species="Cat", 
        image="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800",
        bio="A sophisticated calico who enjoys sunny spots.", owner_id=fred.id
    )
    tabby = Pet(
        name="Tabby", species="Cat", 
        image="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800",
        bio="Energetic orange tabby. Playful and vocal!", owner_id=fred.id
    )
    
    db.session.add_all([buddy, mittens, tabby])
    db.session.commit()
    print("✅ Database successfully seeded!")