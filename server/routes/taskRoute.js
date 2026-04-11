const express = require("express");
const router = express.Router();
const {createTask  , getAllTaskByProjectId , deleteTaskById , updateTaskByTaskId } = require('../controller/taskController') ; 

// Create task 
router.post('/:project_id/tasks'  , createTask) ;   

// Get tasks 
router.get('/:project_id/tasks' , getAllTaskByProjectId)  ;   

// Update task 
router.put('/tasks/:id' , updateTaskByTaskId)  ; 

// Delete task 
router.delete('/tasks/:id'  , deleteTaskById) ; 

module.exports = router;

