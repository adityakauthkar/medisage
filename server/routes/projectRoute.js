const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProjectById,
} = require("../controller/projectController");

// POST : Create new project
router.post("/create", createProject);

// GET :  Get all projects with pagination
router.get("/projects", getAllProjects);

// GET/id : Get project by id
router.get("/project/:id", getProjectById); 

// DELETE  : Delete project by id
router.delete("/delete/:id", deleteProjectById);

module.exports = router;

