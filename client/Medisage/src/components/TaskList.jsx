import React, { useEffect, useState } from "react";
import api from "../Api/axios";

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const fetchTasks = async () => {
    try {
      const response = await api.get(
        `/tasks/${projectId}/tasks?status=${status}`,
      );

      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId, status]);

  // delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/tasks/${id}`);
    fetchTasks();
  };

  // Update task
  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditStatus(task.status);
  };

  const updateTask = async () => {
    try {
      await api.put(`/tasks/tasks/${editingTask._id}`, {
        title: editTitle,
        status: editStatus,
      });

      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="m-2 font-bold text-xl">Tasks</h3>

      <select
        onChange={(e) => setStatus(e.target.value)}
        className="border-2 m-2"
      >
        <option value="">All</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* /edit tasks */}
      {editingTask && (
        <div className="border p-3 m-3 bg-yellow-100 rounded-lg">
          <h3 className="font-bold">Edit Task</h3>

          <input
            className="border p-1 m-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <select
            className="border p-1 m-1"
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <button
            onClick={updateTask}
            className="bg-green-600 text-white px-3 py-1 m-1 rounded"
          >
            Save
          </button>

          <button
            onClick={() => setEditingTask(null)}
            className="bg-gray-400 text-white px-3 py-1 m-1 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {tasks.map((task) => (
        <div key={task._id} className="border-2 m-3 p-3 bg-gray-50 rounded-lg ">
          <p className="font-bold text-blue-500">{task.title}</p>
          <p className="text-red-500">{task.status}</p>

          <button
            onClick={() => deleteTask(task._id)}
            className="border-2 m-1 bg-red-500 text-white p-1.5 cursor-pointer rounded-lg "
          >
            Delete
          </button>

          <button
            onClick={() => handleEditClick(task)}
            className="border-2 m-1 px-4 bg-green-500 text-white p-1.5 rounded-lg"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
