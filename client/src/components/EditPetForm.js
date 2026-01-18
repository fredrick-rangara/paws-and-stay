import { Formik, Form, Field } from "formik";

function EditPetForm({ pet, onUpdate, onCancel }) {
  return (
    <Formik
      initialValues={{
        name: pet.name,
        age: pet.age
      }}
      onSubmit={(values) => {
        fetch(`http://localhost:5555/pets/${pet.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })
          .then((res) => res.json())
          .then((updatedPet) => {
            onUpdate(updatedPet);
            onCancel();
          });
      }}
    >
      <Form>
        <h3>Edit Pet</h3>

        <Field name="name" placeholder="Pet name" />
        <Field name="age" type="number" />

        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}

export default EditPetForm;
