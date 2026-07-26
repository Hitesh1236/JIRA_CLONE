import "./AddTask.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/useAuth.jsx";
import api from "../services/api";

export default function AddTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await api.post(`/tasks/projects/${id}`, {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      navigate(`/projects/${id}`);
    } catch (error) {
      setErr(
        error.response?.data?.message ||
          error.message ||
          "Failed to add task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      <h2>Create Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>

        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}