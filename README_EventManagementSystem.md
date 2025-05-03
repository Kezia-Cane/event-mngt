
# 📅 Event Management System (MERN Stack)

This is a full-stack **Event Management System** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It is designed to manage events, allow users to RSVP, and let administrators approve events before they are listed.

This README serves as a project overview and guide for the **Augment Code AI assistant** to understand the structure, features, and technologies used.

---

## 🧠 Project Purpose

To allow users to:
- Create, view, edit, and delete events.
- RSVP or register for events.
- Filter events by category or date.

To allow admins to:
- Approve or deny event submissions before they appear to users.

---

## ✨ Features

- **CRUD operations** for events.
- **File uploads** for event banners (using Multer).
- **RSVP system** (users can register for events).
- **Filter events** by category and date.
- **Admin approval system** for event publishing.
- **Calendar integration** (optional).
- **Conditional rendering** in React for user/admin views.

---

## 🧰 Tech Stack

### Frontend
- React.js
- Axios (for API calls)
- React Router DOM
- TailwindCSS or Bootstrap (for styling)
- Optional: React DatePicker, Formik

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Multer (for file uploads)
- JWT (authentication and role-based access)
- dotenv for environment configuration

---

## 📂 Folder Structure

```
event-management-system/
│
├── client/                  # React frontend
│   └── src/components       # Components: EventCard, EventForm, Dashboard, etc.
│
├── server/                  # Node/Express backend
│   ├── routes/              # API endpoints: /events, /auth, /rsvp
│   ├── models/              # Mongoose models: Event, User
│   └── middleware/          # Auth and admin middlewares
│
├── .env
└── README.md
```

---

## 🛠️ API Overview

### Event Routes (`/api/events`)
- `GET /` – Get all approved events
- `POST /` – Create a new event (auth required)
- `PUT /:id` – Edit event
- `DELETE /:id` – Delete event
- `PUT /:id/approve` – Admin approves event

### RSVP Route (`/api/events/:id/rsvp`)
- POST RSVP for an event

### Auth Routes (`/api/auth`)
- `POST /register`
- `POST /login`

---

## 🔐 Roles

- **User**: Can create and RSVP to events.
- **Admin**: Can approve/deny events, manage all content.

---

## 🔄 Future Improvements

- Calendar UI integration for browsing events
- Email notifications on RSVP
- Admin analytics (event popularity)
- Search and pagination for large event datasets

---

## ✅ Development Phases

1. **Set up project structure** (React + Express)
2. **Implement authentication and user roles**
3. **Create event CRUD APIs + RSVP system**
4. **Connect frontend to backend via Axios**
5. **File upload handling (Multer for banners)**
6. **Admin approval logic and dashboard UI**
7. **Filtering by category and date**
8. **Final polish and optional features**

---

This file is intended to help **Augment Code AI** understand the project and assist with coding tasks more effectively.
