# Contacts API

A full stack contact management web application, built as the final project of a postgraduate program in **Full Stack Development and Cloud Computing**. The project focuses on **quality assurance**: the application was developed together with a formal test plan, manual and automated functional and API tests, and post-deployment validation in a cloud environment.

**Live demo:** https://contacts-api-nkeu.onrender.com

> The app runs on Render's free tier. The first request after a period of inactivity may take a few seconds while the instance starts.

## Features

- User registration and login with JWT authentication (tokens expire after 1 hour)
- Passwords stored only as bcrypt hashes
- Create, list, edit and delete contacts (name, email, phone and category)
- Contact routes protected by token verification middleware
- Single-page web interface with contact search and inline delete confirmation
- Input validation on the backend (Mongoose schemas) and in the contact form

## Tech stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JSON Web Token (jsonwebtoken), bcrypt |
| Frontend | React (loaded via CDN, no build step) |
| Manual API testing | Postman |
| Test automation | Cypress |
| Hosting | Render |

## Project structure

```
contacts-api/
├── cypress/
│   ├── e2e/            # Automated tests (API and UI)
│   └── support/
├── docs/               # Test plan
├── middleware/         # JWT verification
├── models/             # Mongoose schemas (Contact, User)
├── public/             # Web interface (index.html)
├── routes/             # Auth and contact routes
├── .env.example        # Required environment variables (no real values)
├── cypress.config.js
├── package.json
└── server.js
```

## Getting started

### Prerequisites

- Node.js (version 24 was used in development)
- A MongoDB Atlas cluster (or any MongoDB connection string)

### Installation

```bash
git clone https://github.com/Lyasmin/contacts-api.git
cd contacts-api
npm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your own values:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The `.env` file is listed in `.gitignore` and must never be committed.

### Running the app

```bash
node server.js
```

The app is available at http://localhost:3000.

## API endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register a new user |
| POST | `/auth/login` | No | Log in and receive a JWT |
| POST | `/contacts` | Yes | Create a contact |
| GET | `/contacts` | Yes | List contacts |
| PUT | `/contacts/:id` | Yes | Update a contact |
| DELETE | `/contacts/:id` | Yes | Delete a contact |

Protected routes expect the header `Authorization: Bearer <token>`. Requests without a token return `401`; requests with an invalid or expired token return `403`.

## Testing

### Test plan

The formal test plan is available in [`docs/Test_Plan_ContactsAPI_EN.xlsx`](docs/Test_Plan_ContactsAPI_EN.xlsx). It defines **16 test cases** (11 API and 5 UI), linked to 8 functional requirements, each with preconditions, steps, expected result, actual result and status. All 16 cases were executed and passed.

### Automated tests (Cypress)

| Spec file | Test cases | Layer |
|---|---|---|
| `contacts_api.cy.js` | TC-01, TC-07 | API |
| `contacts_negative.cy.js` | TC-06, TC-09, TC-10 | API (negative scenarios) |
| `login.cy.js` | TC-14 | UI |
| `api_contact_flow.cy.js` | TC-17 | API, against the deployed app |

TC-17 is a complementary scenario outside the 16-case plan. It runs the full API flow against the public Render URL and deletes the test data at the end.

To run the tests, start the server in one terminal:

```bash
node server.js
```

Then, in a second terminal:

```bash
npx cypress run
```

The tests use a test user that must already exist in the database. Register it first with `POST /auth/register`, using the credentials found in the spec files.

## Known limitations

- Contacts are not linked to the user who created them, so every authenticated user can see all contacts.
- Test credentials are written directly in the Cypress spec files.
- Registering a duplicate email returns the raw MongoDB error message instead of a user-friendly message.
- The token expiration scenario was validated with an invalid token, which triggers the same error-handling code path.
- MongoDB Atlas network access is open to all IP addresses, which is acceptable for a study project but not for production.

## Author

**Larissa Yasmin Carvalho de Souza**
