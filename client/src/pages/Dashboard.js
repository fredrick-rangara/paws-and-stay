import React, { useState, useEffect } from "react";

function Dashboard({ user }) {
  const [availablePets, setAvailablePets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("http://localhost:5555/available_pets", { credentials: "include" }),
          fetch("http://localhost:5555/my_bookings", { credentials: "include" })
        ]);
        const available = await res1.json();
        const bookings = await res2.json();
        setAvailablePets(available);
        setMyBookings(bookings);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleBook(petId) {
    fetch("http://localhost:5555/book_stay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pet_id: petId, daily_rate: 25.0 }),
    }).then((res) => {
      if (res.ok) {
        alert("Booking confirmed! 🐾");
        window.location.reload(); 
      }
    });
  }

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1>Hi, {user?.username}! 🦴</h1>
          <p>Ready for some pet sitting today?</p>
        </div>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2>Your Schedule 📅</h2>
          <div style={styles.whiteCard}>
            {myBookings.length > 0 ? myBookings.map(b => (
              <div key={b.id} style={styles.bookingItem}>
                <span>🐕 <strong>{b.pet?.name}</strong></span>
                <span style={styles.status}>Confirmed • ${b.daily_rate}/day</span>
              </div>
            )) : <p style={styles.muted}>No upcoming stays booked.</p>}
          </div>
        </section>

        <section style={styles.section}>
          <h2>Find New Work 🐾</h2>
          <div style={styles.grid}>
            {availablePets.map(pet => (
              <div key={pet.id} style={styles.card}>
                <img src={pet.image || "https://placedog.net/400/300"} alt={pet.name} style={styles.petImg} />
                <div style={styles.cardBody}>
                  <h3>{pet.name}</h3>
                  <p style={styles.bio}>{pet.bio}</p>
                  <button onClick={() => handleBook(pet.id)} style={styles.bookBtn}>Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#fcf9f7", minHeight: "100vh" },
  hero: { height: "250px", backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200')", backgroundSize: "cover", display: "flex", alignItems: "center", justifyContent: "center", color: "white" },
  heroOverlay: { backgroundColor: "rgba(0,0,0,0.4)", padding: "20px", borderRadius: "15px", textAlign: "center" },
  content: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" },
  section: { marginBottom: "40px" },
  whiteCard: { backgroundColor: "white", padding: "20px", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  bookingItem: { display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #eee" },
  status: { color: "#27ae60", fontWeight: "bold", fontSize: "13px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "25px" },
  card: { backgroundColor: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  petImg: { width: "100%", height: "180px", objectFit: "cover" },
  cardBody: { padding: "15px" },
  bookBtn: { width: "100%", padding: "10px", backgroundColor: "#ff6b6b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  loading: { textAlign: "center", padding: "100px", color: "#ff6b6b" },
  muted: { color: "#999", fontStyle: "italic" }
};

export default Dashboard;