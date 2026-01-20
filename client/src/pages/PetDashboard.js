import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function PetDashboard() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetch('/pets').then(res => res.json()).then(setPets);
  }, []);

  const formik = useFormik({
    initialValues: { name: '', species: '', age: '' },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      species: Yup.string().required("Required"),
      age: Yup.number().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      fetch('/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      .then(res => res.json())
      .then(newPet => {
        setPets([...pets, newPet]);
        resetForm();
      });
    },
  });

  const handleDelete = (id) => {
    fetch(`/pets/${id}`, { method: 'DELETE' })
      .then(() => setPets(pets.filter(p => p.id !== id)));
  };

  const handleUpdate = (id, newName) => {
    fetch(`/pets/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName }),
    })
    .then(res => res.json())
    .then(updated => {
      setPets(pets.map(p => p.id === id ? updated : p));
      setEditingPet(null);
    });
  };

  return (
    <div className="container">
      <h1>My Pets</h1>
      <form onSubmit={formik.handleSubmit} className="form-card">
        <input name="name" placeholder="Name" {...formik.getFieldProps('name')} />
        <input name="species" placeholder="Species" {...formik.getFieldProps('species')} />
        <input name="age" type="number" placeholder="Age" {...formik.getFieldProps('age')} />
        <button type="submit">Add Pet</button>
      </form>

      <div className="list-container">
        {pets.map(pet => (
          <div key={pet.id} className="list-item">
            {editingPet === pet.id ? (
              <>
                <input id={`edit-${pet.id}`} defaultValue={pet.name} />
                <button onClick={() => handleUpdate(pet.id, document.getElementById(`edit-${pet.id}`).value)}>Save</button>
                <button onClick={() => setEditingPet(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span><strong>{pet.name}</strong> ({pet.species})</span>
                <div>
                  <button onClick={() => setEditingPet(pet.id)}>Edit</button>
                  <button onClick={() => handleDelete(pet.id)} className="delete">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PetDashboard;