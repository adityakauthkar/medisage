const mongoose = require("mongoose");
const Task = require("../model/taskModel");
const Project = require("../model/projectModel");

// POST : Create new task
const createTask = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { title, description, status, priority, due_date } = req.body;

    // Validate project_id
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Check if project exists
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project does not  exist ",
      });
    }

    // Title validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const newTask = await Task.create({
      project_id,
      title,
      description,
      status: status || "todo", //todo / in-progress / done
      priority: priority || "medium", // low/med/high
      due_date,
    });

    return res.status(201).json({
      success: true,
      message: "New task created successfully",
      data: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET : Get all tasks by project id
const getAllTaskByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { status, sort = "asc" } = req.query; //status: todo / in-progress / done

    // Validate proj id
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Check if project exists
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(400).json({
        success: false,
        message: "Project does not  exist ",
      });
    }

    // Find task based on project id
    const filter = { project_id };
    if (status) {
      filter.status = status; // todo / in-progress / done
    }

    const tasks = await Task.find(filter).sort({
      due_date: sort === "desc" ? -1 : 1,
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT : Update task
const updateTaskByTaskId = async (req, res) => {
  try {
    const { id } = req.params; //task_id

    //validate task id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // if task id not found in db
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE : Delete task by id
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params; //task_id

    const deletedTask = await Task.findByIdAndDelete(id);

    // Task id not found in db
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task id not found in db ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTaskByProjectId,
  updateTaskByTaskId,
  deleteTaskById,
};
