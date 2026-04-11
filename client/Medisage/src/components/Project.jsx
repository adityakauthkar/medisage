import React, { useEffect, useState } from "react";
import api from "../Api/axios";

const Project = ({ setSelectedProject, refreshProjects }) => {
  const [projectsList, setProjectList] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const getProjectList = async (currentPage) => {
    try {
      const response = await api.get(
        `/projects/projects?page=${currentPage}&limit=${limit}`
      );

      setProjectList(response.data.projects);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getProjectList(page);
  }, [page, refreshProjects]);

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/delete/${id}`);
      getProjectList(page); // refresh same page
    } catch (error) {
      console.log("Delete error", error);
    }
  };

  return (
    <div>
      <h3 className="m-2 text-xl font-bold">Projects</h3>

      {/* Projects List */}
      {projectsList.length === 0 ? (
        <p>No projects found</p>
      ) : (
        projectsList.map((item) => (
          <div
            key={item._id}
            className="p-5 m-2 border-2 rounded-xl border-black bg-blue-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4
                  onClick={() => setSelectedProject(item._id)}
                  className="cursor-pointer text-blue-700 font-bold"
                >
                  {item.name}
                </h4>
                <p>{item.description}</p>
              </div>

              <button
                onClick={() => deleteProject(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Project;