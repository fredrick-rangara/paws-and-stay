import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import EditPetForm from "../components/EditPetForm";

function MyPets() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/pets")
      .then((res) => res.json())
      .then(setPets);
  }, []);

  // DELETE
  function handleDelete(id) {
    fetch(`http://localhost:5555/pets/${id}`, {
      method: "DELETE"
    }).then(() => {
      setPets(pets.filter((pet) => pet.id !== id));
    });
  }

  // UPDATE
  function handleUpdate(updatedPet) {
    setPets(
      pets.map((pet) =>
        pet.id === updatedPet.id ? updatedPet : pet
      )
    );
  }

  return (
    <div>
      <h1>My Pets</h1>

      {editingPet && (
        <EditPetForm
          pet={editingPet}
          onUpdate={handleUpdate}
          onCancel={() => setEditingPet(null)}
        />
      )}

      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onDelete={handleDelete}
          onEdit={setEditingPet}
        />
      ))}
    </div>
  );
}

export default MyPets;
