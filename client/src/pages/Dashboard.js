import React, { useState, useEffect } from "react";

function Dashboard({ user }) {
  const [availablePets, setAvailablePets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const API_BASE = "https://paws-and-stay.onrender.com";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [res1, res2] = await Promise.all([
      fetch(`${API_BASE}/available_pets`, { credentials: "include" }),
      fetch(`${API_BASE}/my_bookings`, { credentials: "include" })
    ]);
    if (res1.ok) setAvailablePets(await res1.json());
    if (res2.ok) setMyBookings(await res2.json());
  };

  function handleBook(petId) {
    fetch(`${API_BASE}/book_stay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pet_id: petId }),
    }).then(() => {
      alert("Booked! 🐕");
      fetchData();
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.username}!</h1>
      <section>
        <h2>Your Schedule</h2>
        {myBookings.map(b => <p key={b.id}>Sitting for: {b.pet?.name}</p>)}
      </section>
      <section>
        <h2>Available Pets</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
          {availablePets.map(pet => (
            <div key={pet.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <img src={pet.image} alt={pet.name} style={{ width: "100%" }} />
              <h3>{pet.name}</h3>
              <button onClick={() => handleBook(pet.id)}>Book Stay</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;