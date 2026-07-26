import "./Dashboard.css";
import api from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/useAuth.jsx";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects", { timeout: 5000 });
        setProjects(res.data ?? []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load projects.",
        );
      }
    };

    fetchProjects();
  }, [isAuthenticated, navigate]);

  const handleCreateProject = () => {
    navigate("/projects/create");
  };

  const deleteProject = async (key) => {
    try {
      await api.delete(`/projects/${key}`);


      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== key),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete project.",
      );
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Jira Clone</h1>
        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <h2>My Projects</h2>

        <button className="create-btn" onClick={handleCreateProject}>
          + Create Project
        </button>

        {error && <p className="dashboard-error">{error}</p>}

        {!error && projects.length === 0 && (
          <p className="dashboard-empty">No projects have been created yet.</p>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div
              className="project-card"
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(project._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
