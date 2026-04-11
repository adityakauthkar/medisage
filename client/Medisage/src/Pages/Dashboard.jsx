import React, { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import Project from "../components/Project";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [refreshProjects, setRefreshProjects] = useState(false);

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      <div>
        <ProjectForm setRefreshProjects={setRefreshProjects} />
        <Project
          setSelectedProject={setSelectedProject}
          refreshProjects={refreshProjects}
        />
      </div>

      <div>
        {selectedProject && (
          <>
            <TaskForm projectId={selectedProject} />
            <TaskList projectId={selectedProject} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;