import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectPage.css";
import { useAuth } from "../Context/useAuth.jsx";
import api from "../services/api";

export default function ProjectPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteTask = async (e, key) => {
    e.preventDefault();
    try {
      await api.delete(`/tasks/${key}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== key));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to delete task."
      );
    }
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.get(`/projects/${id}`),
          api.get(`/tasks/projects/${id}`),
        ]);
        setProject(projectRes.data);
        setTasks(tasksRes.data ?? []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load project.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="project-page">
        <p>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-page">
        <button onClick={() => navigate("/dashboard")}>← Back</button>
        <p className="project-error">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-page">
        <button onClick={() => navigate("/dashboard")}>← Back</button>
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div className="project-page">
      <button onClick={() => navigate("/dashboard")}>← Back</button>

      <h1>{project.name}</h1>
      <p>{project.description}</p>

      <button onClick={() => navigate(`/projects/${id}/tasks/create`)}>
        + Add Task
      </button>

      <h2>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No Tasks Yet</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <button className="create-btn" onClick={(e) => deleteTask(e, task._id)}>
              Delete Task
            </button>
          </div>
        ))
      )}
    </div>
  );
}
