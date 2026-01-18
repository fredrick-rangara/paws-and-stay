import React, { useState, useEffect } from "react";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5555/pets", { credentials: "include" })
      .then((res) => res.json())
      .then(setPets);
  }, []);

  function handleAddPet(e) {
    e.preventDefault();
    fetch("http://localhost:5555/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, species: "Dog" }),
    }).then((res) => res.json().then((newPet) => setPets([...pets, newPet])));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Pets</h2>
      <ul>{pets.map(p => <li key={p.id}>{p.name}</li>)}</ul>
      <form onSubmit={handleAddPet}>
        <input placeholder="New Pet Name" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default MyPets;