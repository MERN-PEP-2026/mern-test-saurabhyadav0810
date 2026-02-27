import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
    
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");

    if (!token) {
      navigate("/");
      return;
    }

    if (name) setUserName(name);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete task");
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      await API.put(`/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>📋 Task Dashboard</h1>
          <p className="welcome">Welcome, {userName || "User"}!</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form className="task-form" onSubmit={handleAddTask}>
        <h3>Add New Task</h3>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task description (optional)"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          rows="3"
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </form>

      <div className="tasks-container">
        <h3>Your Tasks ({tasks.length})</h3>
        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length > 0 ? (
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task._id} className="task-card">
                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </div>
                {task.description && <p className="task-description">{task.description}</p>}
                <div className="task-actions">
                  <button
                    className="status-btn"
                    onClick={() => handleStatusChange(task._id, task.status)}
                  >
                    {task.status === "pending" ? "✓ Mark Complete" : "↻ Mark Pending"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tasks">No tasks yet. Create one to get started! 🚀</p>
        )}
      </div>
    </div>
  );
}