const Project = require("../model/projectModel");

// POST : create new project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Project name is required",
      });
    }

    const newProject = await Project.create({ name, description });

    return res.status(201).json({
      success: true,
      message: "New project created successfull",
      data: newProject,
    });
  } catch (error) {
    console.log("Error creating new project ", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET : Get all projects
const getAllProjects = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    // total count
    const total = await Project.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      projects,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.log("Error getting projects ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
// GET : Get project by id
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found ",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
      message: "Project fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE : Delete project by id
const deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProjectById,
};
