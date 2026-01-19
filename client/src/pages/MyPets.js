import React, { useState, useEffect } from "react";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({ name: "", species: "", image: "", bio: "" });

  useEffect(() => {
    fetch("http://localhost:5555/pets", { credentials: "include" })
      .then((res) => res.json())
      .then(setPets);
  }, []);

  function handleDelete(id) {
    if (window.confirm("Remove this pet?")) {
      fetch(`http://localhost:5555/pets/${id}`, { method: "DELETE", credentials: "include" })
        .then(() => setPets(pets.filter(p => p.id !== id)));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:5555/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then(res => res.json()).then(newPet => setPets([...pets, newPet]));
  }

  return (
    <div style={styles.container}>
      <div style={styles.banner}><h2>Your Pets</h2></div>
      <div style={styles.main}>
        <div style={styles.grid}>
          {pets.map(pet => (
            <div key={pet.id} style={styles.card}>
              <img src={pet.image} style={styles.img} alt={pet.name} />
              <div style={styles.info}>
                <h3>{pet.name}</h3>
                <button onClick={() => handleDelete(pet.id)} style={styles.delBtn}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
           <h3>Add New Pet</h3>
           <input placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
           <input placeholder="Species" onChange={e => setFormData({...formData, species: e.target.value})} />
           <input placeholder="Image URL" onChange={e => setFormData({...formData, image: e.target.value})} />
           <button type="submit" style={styles.addBtn}>Register</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#fcf9f7", minHeight: "100vh" },
  banner: { height: "150px", backgroundColor: "#2c3e50", color: "white", display: "flex", alignItems: "center", justifyContent: "center" },
  main: { maxWidth: "1000px", margin: "0 auto", padding: "40px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  card: { backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  img: { width: "100%", height: "150px", objectFit: "cover" },
  info: { padding: "10px" },
  delBtn: { color: "red", border: "none", background: "none", cursor: "pointer", fontWeight: "bold" },
  form: { marginTop: "40px", display: "flex", flexDirection: "column", gap: "10px", padding: "20px", backgroundColor: "white" },
  addBtn: { backgroundColor: "#ff6b6b", color: "white", padding: "10px", border: "none", borderRadius: "5px" }
};
export default MyPets;