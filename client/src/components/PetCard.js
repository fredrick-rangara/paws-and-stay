export default function PetCard({ pet, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>{pet.name}</h3>
      <p>
        {pet.species} | Age {pet.age}
      </p>
      {onEdit && <button onClick={() => onEdit(pet)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(pet.id)}>Delete</button>}
    </div>
  );
}
