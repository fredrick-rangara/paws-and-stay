import React from 'react';

function Home() {
  return (
    <div className="home-page">
      <h1>🏠 Paws & Stay Home</h1>
      <p>Welcome to the pet sitting management app!</p>
      <div style={{ marginTop: "20px" }}>
        <p>Use the navigation bar above to:</p>
        <ul>
          <li>View your <strong>Dashboard</strong></li>
          <li>Manage <strong>My Pets</strong></li>
          <li><strong>Book</strong> a new stay session</li>
        </ul>
      </div>
    </div>
  );
}

export default Home; // <--- This line is the most important!