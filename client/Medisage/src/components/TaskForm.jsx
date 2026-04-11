import React, { useState } from "react";
import api from "../Api/axios";

const TaskForm = ({ projectId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async () => {
    try {
      await api.post(`/tasks/${projectId}/tasks`, {
        title,
        description,
        status: "todo",
        priority: "medium",
      });

      setTitle("");
      setDescription("");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="m-2 text-xl font-bold ">Create Task</h3>

      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          className=" m-2 p-1 border-2 border-500-black rounded"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
          className=" m-2 p-1 border-2 border-500-black rounded"
      />

      <button onClick={createTask} className="px-3  py-1 m-2 border-2 border-500-black bg-blue-400 rounded-lg cursor-pointer text-white">Add Task</button>
    </div>
  );
};

export default TaskForm;