import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function BookingForm() {
  const [pets, setPets] = useState([]);
  const [sitters, setSitters] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetching data from our stable backend routes
    fetch('/pets').then(res => res.json()).then(setPets);
    fetch('/sitters').then(res => res.json()).then(setSitters);
  }, []);

  const formik = useFormik({
    initialValues: { 
        pet_id: '', 
        sitter_id: '', 
        appointment_date: '', 
        notes: '' 
    },
    validationSchema: Yup.object({
      pet_id: Yup.string().required("Please select a pet"),
      sitter_id: Yup.string().required("Please select a sitter"),
      appointment_date: Yup.string().required("Date is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      .then(res => {
        if (res.ok) {
          setStatus("Booking confirmed! 🐾");
          resetForm();
          setTimeout(() => setStatus(""), 3000);
        } else {
          setStatus("Error creating booking. Please try again.");
        }
      });
    },
  });

  return (
    <div className="container">
      <h1>Schedule a Stay</h1>
      
      {status && (
        <div style={{ 
          padding: '10px', 
          background: '#d4edda', 
          color: '#155724', 
          borderRadius: '8px', 
          marginBottom: '15px',
          textAlign: 'center' 
        }}>
          {status}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit} className="form-card">
        <section>
          <label>Select Your Pet</label>
          <select name="pet_id" {...formik.getFieldProps('pet_id')}>
            <option value="">-- Choose a Pet --</option>
            {pets.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.species})
              </option>
            ))}
          </select>
          {formik.touched.pet_id && formik.errors.pet_id ? (
            <div className="error">{formik.errors.pet_id}</div>
          ) : null}
        </section>

        <section>
          <label>Select a Sitter</label>
          <select name="sitter_id" {...formik.getFieldProps('sitter_id')}>
            <option value="">-- Choose a Sitter --</option>
            {sitters.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} - ${s.hourly_rate}/hr
              </option>
            ))}
          </select>
          {formik.touched.sitter_id && formik.errors.sitter_id ? (
            <div className="error">{formik.errors.sitter_id}</div>
          ) : null}
        </section>

        <section>
          <label>Appointment Date</label>
          <input 
            type="date" 
            name="appointment_date" 
            {...formik.getFieldProps('appointment_date')} 
          />
        </section>

        <section>
          <label>Notes for the Sitter</label>
          <textarea 
            name="notes" 
            placeholder="Dietary needs, exercise routines, etc."
            {...formik.getFieldProps('notes')} 
          />
        </section>

        <button type="submit" className="submit-btn">Finalize Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;