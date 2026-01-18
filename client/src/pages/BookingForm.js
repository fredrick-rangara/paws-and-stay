import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function BookingForm() {
    const [pets, setPets] = useState([]);
    const [sitters, setSitters] = useState([]);

// Load dropdown data on component mount
useEffect(() => {
    fetch('http://localhost:5555/pets').then(r => r.json()).then(setPets);
    fetch('http://localhost:5555/users').then(r => r.json()).then(setSitters);
}, []);

const schema = yup.object().shape({
    pet_id: yup.string().required("Please select a pet"),
    sitter_id: yup.string().required("Please select a sitter"),
    daily_rate: yup.number().required("Rate is required").positive(),
    special_instructions: yup.string().min(5, "Give the sitter more detail!")
});

const formik = useFormik({
    initialValues: { pet_id: '', sitter_id: '', daily_rate: '', special_instructions: '' },
    validationSchema: schema,
    onSubmit: (values) => {
        fetch('http://localhost:5555/stay_sessions', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
        .then(res => {
            if (res.ok) alert("Booking Successful!");
        });
    }
});

return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <h2>Book a Stay</h2>

        <label>Select Pet</label>
        <select name="pet_id" value={formik.values.pet_id} onChange={formik.handleChange}>
            <option value="">-- Choose Pet --</option>
            {pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <label>Select Sitter</label>
        <select name="sitter_id" value={formik.values.sitter_id} onChange={formik.handleChange}>
            <option value="">-- Choose Sitter --</option>
            {sitters.map(s => <option key={s.id} value={s.id}>{s.username}</option>)}
        </select>

        <label>Daily Rate ($)</label>
        <input name="daily_rate" type="number" onChange={formik.handleChange} value={formik.values.daily_rate} />

        <label>Instructions</label>
        <textarea name="special_instructions" onChange={formik.handleChange} value={formik.values.special_instructions} />

        <button type="submit">Confirm Booking</button>
    </form>
);
}

export default BookingForm;