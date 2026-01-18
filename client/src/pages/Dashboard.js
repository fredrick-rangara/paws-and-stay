import React, { useState, useEffect } from 'react';

function Dashboard() {
    const [userContext, setUserContext] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetching from the /dashboard route we fixed in Flask
        fetch("/dashboard")
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setUserContext(data);
                        setIsLoading(false);
                    });
                } else {
                    console.error("Failed to fetch dashboard");
                }
            });
    }, []);

    if (isLoading) return <div className="loading">Loading Dashboard...</div>;

    return (
        <main style={{ padding: "20px" }}>
            <h1>Welcome back, {userContext.user.username}!</h1>
            
            <div style={{ display: "flex", gap: "40px" }}>
                
                {/* Section 1: Owned Pets (One-to-Many) */}
                <section style={{ flex: 1 }}>
                    <h2>My Pets</h2>
                    <div className="pet-list">
                        {userContext.owned_pets.map(pet => (
                            <div key={pet.id} className="card">
                                <h3>🐾 {pet.name}</h3>
                                <p>Species: {pet.species || "Unknown"}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Sitting Schedule (Many-to-Many via StaySessions) */}
                <section style={{ flex: 1 }}>
                    <h2>Sitting Schedule</h2>
                    <p><em>Pets I am watching for others:</em></p>
                    <div className="sitting-list">
                        {userContext.sitting_for.length > 0 ? (
                            userContext.sitting_for.map((pet, index) => (
                                <div key={index} className="card sitting-card" style={{ borderLeft: "5px solid #4CAF50" }}>
                                    <h3>🐕 {pet.name}</h3>
                                    <p>Owner ID: {pet.owner_id}</p>
                                </div>
                            ))
                        ) : (
                            <p>No upcoming stays booked.</p>
                        )}
                    </div>
                </section>

            </div>
        </main>
    );
}

export default Dashboard;