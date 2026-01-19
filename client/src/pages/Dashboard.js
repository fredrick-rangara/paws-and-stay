import React, { useState, useEffect } from "react";

function Dashboard({ user }) {
  const [availablePets, setAvailablePets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        fetch("http://localhost:5555/available_pets", { credentials: "include" }),
        fetch("http://localhost:5555/my_bookings", { credentials: "include" })
      ]);
      setAvailablePets(await res1.json());
      setMyBookings(await res2.json());
    } finally {
      setLoading(false);
    }
  };

  function handleBook(petId) {
    fetch("http://localhost:5555/book_stay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pet_id: petId }),
    }).then(() => {
      alert("Booking confirmed! 🐾");
      fetchData();
    });
  }

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1>Hi, {user?.username}! 🦴</h1>
          <p>Find a furry friend to look after today.</p>
        </div>
      </div>
      <div style={styles.content}>
        <h2>Your Sitting Schedule 📅</h2>
        <div style={styles.whiteCard}>
          {myBookings.length > 0 ? myBookings.map(b => (
            <div key={b.id} style={styles.bookingItem}>
              <span>🐕 <strong>{b.pet?.name}</strong></span>
              <span style={styles.status}>Confirmed • $25/day</span>
            </div>
          )) : <p>No stays booked yet.</p>}
        </div>
        <h2 style={{marginTop: "40px"}}>Available Pets 🐾</h2>
        <div style={styles.grid}>
          {availablePets.map(pet => (
            <div key={pet.id} style={styles.card}>
              <img src={pet.image} alt={pet.name} style={styles.petImg} />
              <div style={styles.cardBody}>
                <h3>{pet.name} ({pet.species})</h3>
                <p>{pet.bio}</p>
                <button onClick={() => handleBook(pet.id)} style={styles.bookBtn}>Book Stay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#fcf9f7", minHeight: "100vh" },
  hero: { height: "250px", backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", color: "white" },
  heroOverlay: { backgroundColor: "rgba(0,0,0,0.4)", padding: "20px", borderRadius: "15px", textAlign: "center" },
  content: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  whiteCard: { backgroundColor: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  bookingItem: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" },
  status: { color: "#27ae60", fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "25px" },
  card: { backgroundColor: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  petImg: { width: "100%", height: "180px", objectFit: "cover" },
  cardBody: { padding: "15px" },
  bookBtn: { width: "100%", padding: "10px", backgroundColor: "#ff6b6b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" },
  loading: { textAlign: "center", padding: "100px", color: "#ff6b6b" }
};
export default Dashboard;