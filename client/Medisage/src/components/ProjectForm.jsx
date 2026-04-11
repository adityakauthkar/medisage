import React, { useState } from "react";
import api from "../Api/axios";

const ProjectForm = ({ setRefreshProjects }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createProject = async () => {
    try {
      await api.post("/projects/create", {
        name,
        description,
      });

      setName("");
      setDescription("");

      // trigger refresh
      setRefreshProjects((prev) => !prev);

    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      <h3 className="m-2 font-bold text-xl">Create Project</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className=" m-2 p-1 border-2 border-500-black rounded"
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
         className="m-2 p-1 border-2 border-500-black rounded"
      />

      <button onClick={createProject} className="px-3  py-1 m-2 border-2 border-500-black bg-blue-400 rounded-lg cursor-pointer text-white">Create</button>
    </div>
  );
};

export default ProjectForm;