# Paws & Stay

A full-stack pet-sitting application built with **Flask** (backend) and **React** (frontend).  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Team Members & Roles

| Member |
| Fredrick Rangara | 
| Sharon Njoroge
| Carl Kiprono |
| Sumeya Hirsi | 

---

## Tech Stack

- **Frontend:** React, Formik/Yup, React Router
- **Backend:** Flask, SQLAlchemy, Flask-Migrate
- **Database:** SQLite (development)
- **Styling:** Tailwind CSS / Bootstrap (optional)
- **Testing:** Jest (frontend), Pytest (backend)

---

## Getting Started (Local Development)

### Backend
```bash
cd server
source venv/bin/activate
pip install -r requirements.txt
python app.py
````

Runs on **[http://localhost:5555](http://localhost:5555)**

### Frontend

```bash
cd client
npm install       # first time only
npm start
```

Runs on **[http://localhost:3000](http://localhost:3000)**

**API Base URL:** `http://localhost:5555`

**Tip:** Always run `git pull origin main` before starting work.

---

## Available Scripts (React)

* `npm start` — Runs the app in development mode
* `npm test` — Runs test suite in interactive mode
* `npm run build` — Builds production-ready files
* `npm run eject` — Ejects CRA config (one-way operation)

Learn more: [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

---

## Project Features by Member

### Member 1: Architect & User Lead

* Repo setup, folder structure
* Flask DB models & migration
* React BrowserRouter & NavBar skeleton

### Member 2: Pet Registrar

* Add pets with backend integration
* Formik/Yup validation
* Redirect to Home after submission

### Member 3: Booking Coordinator

* Create StaySessions (user ↔ pet)
* Form with dropdowns for pet & sitter
* Submit special instructions & daily rate

### Member 4: Records Manager

* Edit/Delete pets
* Fetch current data in forms
* Update React state after delete

### Member 5: Dashboard & Data Lead

* Seed initial data (users, pets, sessions)
* Dashboard with “Pets I Own” & “Pets I am Sitting For”
* Styling and error handling

---

## Git Workflow

1. Clone the repo:

```bash
git clone git@github.com:fredrick-rangara/Paws_and_Stay.git
```

2. Create a feature branch:

```bash
git checkout -b feature/add-pet-form
```

3. Work on your assigned slice (based on member role)
4. Push and open a Pull Request for Member 1 review

---

## Notes / Tips

* Run `npm install` first time in `client/`
* Backend and frontend run on **different ports**; set up CORS if needed
* Always fetch fresh data after CRUD operations to update the UI

```

---
