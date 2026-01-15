import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const PetForm = () => {
  const navigate = useNavigate();

  // 1️⃣ Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      owner_id: "", // Must be provided (positive integer)
    },

    // 2️⃣ Yup validation
    validationSchema: Yup.object({
      name: Yup.string().required("Pet name is required"),
      age: Yup.number()
        .required("Pet age is required")
        .min(0, "Age cannot be negative"),
      owner_id: Yup.number()
        .required("Owner ID is required")
        .positive("Owner ID must be positive")
        .integer("Owner ID must be an integer"),
    }),

    // 3️⃣ onSubmit sends data to Flask backend
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5000/pets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const err = await response.json();
          alert(`Error: ${err.errors.join(", ")}`);
          return;
        }

        // 4️⃣ Navigate back to home gallery on success
        navigate("/");
      } catch (error) {
        alert("An unexpected error occurred");
        console.error(error);
      }
    },
  });

  return (
    <div className="container">
      <div className="page-header">
        <h1>🐾 Add a New Pet</h1>
        <p>Fill in the details below to add your furry friend</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Pet Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter pet's name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age (years)</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Enter pet's age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="error-message">{formik.errors.age}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="owner_id">Owner ID</label>
          <input
            type="number"
            id="owner_id"
            name="owner_id"
            placeholder="Enter owner's ID"
            value={formik.values.owner_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.owner_id && formik.errors.owner_id ? (
            <div className="error-message">{formik.errors.owner_id}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary btn-submit">
          🐕 Add Pet
        </button>
      </form>
    </div>
  );
};

export default PetForm;
