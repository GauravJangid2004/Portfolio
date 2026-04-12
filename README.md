# Gaurav Jangid — Personal Portfolio

A full-stack personal portfolio website built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).


## Live Demo: https://gaurav-portfolio-sage-eight.vercel.app
## Backend API: https://gaurav-portfolio-api-6tte.onrender.com


## Tech Stack

**Frontend:** React.js · Vite · Tailwind CSS · Framer Motion · React Router v6  
**Backend:** Node.js · Express.js · Mongoose  
**Database:** MongoDB Atlas  
**Email:** Nodemailer  
**Deploy:** Vercel (frontend) · Render (backend)



## Project Structure

```
portfolio-mern/
├── client/                  # React frontend
│   ├── public/
│   │   ├── profile.jpg      
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── CustomCursor.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── MatrixBackground.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OrbBackground.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Skills.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── server/                  # Express backend
    ├── models/
    │   └── Contact.js        # Mongoose schema
    ├── routes/
    │   ├── contact.js        # POST /api/contact
    │   └── resume.js         # GET /api/resume/pdf|docx
    ├── public/
    │   └── resume/
    │       ├── Gaurav_Jangid_Resume.pdf   
    │       └── Gaurav_Jangid_Resume.docx  
    ├── server.js
    ├── package.json
    └── .env          
```


## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Server health check |
| POST| `/api/contact` | Save contact form to MongoDB |
| GET | `/api/contact` | Fetch all messages (admin) |
| GET | `/api/resume/pdf` | Download resume PDF |
| GET | `/api/resume/docx` | Download resume DOCX |
| GET | `/api/resume/preview` | Preview Resume |



## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/GauravJangid2004/Portfolio
cd gaurav-portfolio
```

### 2. Setup the backend
```bash
cd server
npm install
npm run dev        # Runs on http://localhost:5000
```
### 3. Setup the frontend
```bash
cd client
npm install
npm run dev        # Runs on http://localhost:5173
```


**Gaurav Jangid**  
B.Tech CSE · JK Lakshmipat University (2023–27)  
📧 gauravjangid1911@gmail.com  
☎ +91 9785593133  
🔗 [LinkedIn](https://www.linkedin.com/in/gaurav-jangid-91149a2a8)