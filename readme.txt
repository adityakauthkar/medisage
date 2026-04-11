# 🚀 Medisage - Full Stack Web Application

Medisage is a full-stack web application built using **React.js** for the frontend and **Node.js + Express.js** for the backend, with MongoDB as the database.

---

##  Project Structure
medisage/
│
├── client/ # React frontend
├── server/ # Node + Express backend
└── README.md

## 🚀 Features
Project : 
GET all projects with pagination limit 10 
GET project by project_id 
DELETE Project 

Tech Stack
ReactJS 
TailwindCSS
Node.js
Express.js
MongoDB
Mongoose
CORS
dotenv

Task : 
CREATE Task with status (todo , inprogress  , done) 
DELETE Task 
UPDATE task by task_id 
GET task by status filter 


## Installation & Setup

1. git clone https://github.com/adityakauthkar/medisage.git

2. Install dependencies

3. Create .env file
PORT=4000
MONGO_URI=your_mongodb_connection_string

4. Run server
node index.js

## API Endpoints

Project APIs

Create Project
POST /api/projects/create

Get All Projects (Pagination)
GET /api/projects/projects?page=1&limit=10

Get Project by ID
GET /api/projects/project/:id

Delete Project
DELETE /api/projects/delete/:id

## Task APIs

Create Task
POST /api/tasks/:project_id/tasks

Get Tasks of a Project
GET /api/tasks/:project_id/tasks

Update Task
PUT /api/tasks/tasks/:id

Delete Task
DELETE /api/tasks/tasks/:id


📡 Frontend Integration

Frontend consumes backend APIs using fetch/axios:
axios.get("http://localhost:4000/api/projects/projects")

## 📬 API Testing (Postman)

A Postman collection is included in the repository:


server
👨‍💻 Author
Name: Aditya Kauthkar 


