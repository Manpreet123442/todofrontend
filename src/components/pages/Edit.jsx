import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditTask() {
  const [task, setTask] = useState({
    title: "",
    priority: 1,
    status: "pending",
    start_time: "",
    end_time: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = JSON.parse(localStorage.user)?.token;
        const response = await axios.get(
          `https://todosample-sor2.onrender.com/tasks/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        setTask(response.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };
  
    fetchTask();
  }, [id]);  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? (checked ? "finished" : "pending") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const token = JSON.parse(localStorage.user)?.token;
      if (!token) {
        alert("You are not authorized. Please log in.");
        navigate("/");
        return;
      }

      await axios.patch(
        `https://todosample-sor2.onrender.com/tasks/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task updated successfully!");
      navigate("/tasklist");
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
      alert("Failed to update task. Please try again.");
    }
  };

//   const handleCancel = () => {
//     navigate("/tasks");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-task-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="titleBox">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="titleBox">Priority</label>
          <input
            type="number"
            name="priority"
            min="1"
            max="5"
            value={task.priority}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="titleBox">Status</label>
          <label className="status-checkbox">
            <input
              type="checkbox"
              name="status"
              checked={task.status === "finished"}
              onChange={handleChange}
            />
            {task.status === "finished" ? "finished" : "pending"}
          </label>
        </div>

        <div className="form-group">
          <label className="titleBox">Start Time</label>
          <input
            type="datetime-local"
            name="start_time"
            value={task.start_time}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="titleBox">End Time</label>
          <input
            type="datetime-local"
            name="end_time"
            value={task.end_time}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-update">
            Update
          </button>
          <button type="button" className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
