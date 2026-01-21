
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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

