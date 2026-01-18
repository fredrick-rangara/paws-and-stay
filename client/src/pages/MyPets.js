import React, { useState, useEffect } from "react";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: "",
    bio: ""
  });

  useEffect(() => {
    fetch("http://localhost:5555/pets", { credentials: "include" })
      .then((res) => res.json())
      .then(setPets);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5555/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newPet) => {
          setPets([...pets, newPet]);
          setFormData({ name: "", species: "", image: "", bio: "" });
        });
      }
    });
  }

  return (
    <div style={styles.container}>
      {/* 🐾 Animal Banner Section */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <h2>Your Furry Family</h2>
          <p>Manage your pets and keep their profiles up to date for sitters.</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* 🐕 Pet Gallery */}
        <div style={styles.grid}>
          {pets.map((pet) => (
            <div key={pet.id} style={styles.card}>
              <img 
                src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80"} 
                alt={pet.name} 
                style={styles.petImg} 
              />
              <div style={styles.cardInfo}>
                <h3 style={styles.petName}>{pet.name}</h3>
                <span style={styles.speciesLabel}>{pet.species}</span>
                <p style={styles.petBio}>{pet.bio || "No bio yet. Add one to help sitters get to know them!"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 📝 Add Pet Form */}
        <div style={styles.formSection}>
          <h3 style={styles.formTitle}>Add a New Family Member</h3>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <input 
                style={styles.input} 
                placeholder="Pet Name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
              <input 
                style={styles.input} 
                placeholder="Species (e.g. Dog)" 
                value={formData.species} 
                onChange={(e) => setFormData({...formData, species: e.target.value})} 
                required 
              />
            </div>
            <input 
              style={styles.input} 
              placeholder="Image URL (e.g. https://images.com/dog.jpg)" 
              value={formData.image} 
              onChange={(e) => setFormData({...formData, image: e.target.value})} 
            />
            <textarea 
              style={styles.textarea} 
              placeholder="Tell us about their personality, diet, or quirks..." 
              value={formData.bio} 
              onChange={(e) => setFormData({...formData, bio: e.target.value})} 
            />
            <button type="submit" style={styles.addBtn}>Register Pet</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#fcf9f7", minHeight: "100vh" },
  banner: {
    height: "250px",
    backgroundImage: "url('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    padding: "0 60px",
    color: "white"
  },
  bannerContent: { backgroundColor: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "15px", backdropFilter: "blur(4px)" },
  mainContent: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px", marginBottom: "50px" },
  card: { backgroundColor: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" },
  petImg: { width: "100%", height: "200px", objectFit: "cover" },
  cardInfo: { padding: "20px" },
  petName: { margin: "0 0 5px 0", color: "#2c3e50" },
  speciesLabel: { backgroundColor: "#ffeaa7", color: "#d35400", padding: "3px 10px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold" },
  petBio: { fontSize: "14px", color: "#7f8c8d", marginTop: "15px", lineHeight: "1.4" },
  
  formSection: { backgroundColor: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" },
  formTitle: { marginTop: "0", marginBottom: "25px", color: "#2c3e50" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "flex", gap: "15px" },
  input: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #eee", fontSize: "14px" },
  textarea: { padding: "12px", borderRadius: "10px", border: "1px solid #eee", fontSize: "14px", minHeight: "100px", fontFamily: "inherit" },
  addBtn: { backgroundColor: "#ff6b6b", color: "white", border: "none", padding: "15px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }
};

export default MyPets;