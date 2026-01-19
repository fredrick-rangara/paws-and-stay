import React, { useState } from 'react';

function BookingForm() {
    const [formData, setFormData] = useState({
        pet_id: '',
        sitter_id: '1', // Hardcoded to User 1 for now
        daily_rate: '',
        special_instructions: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/stay_sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => alert("Booking Successful!"))
        .catch(err => console.error(err));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📅 Book a Stay</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
                <input 
                    type="number" 
                    placeholder="Pet ID" 
                    onChange={(e) => setFormData({...formData, pet_id: e.target.value})} 
                />
                <input 
                    type="number" 
                    placeholder="Daily Rate" 
                    onChange={(e) => setFormData({...formData, daily_rate: e.target.value})} 
                />
                <textarea 
                    placeholder="Special Instructions" 
                    onChange={(e) => setFormData({...formData, special_instructions: e.target.value})} 
                />
                <button type="submit">Submit Booking</button>
            </form>
        </div>
    );
}

export default BookingForm; // <--- MAKE SURE THIS IS HERE