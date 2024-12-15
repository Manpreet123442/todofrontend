import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState(false);
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const taskData = {
            title,
            priority: parseInt(priority, 5),
            status: status ? "finished" : "pending",
            start_time: new Date(start_time).toISOString(),
            end_time: new Date(end_time).toISOString(),
            user_id: JSON.parse(localStorage.getItem("user"))?.id,
        };
    
        console.log("Task Data:", taskData);
    
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
    
            if (!token) {
                alert("You are not authorized. Please log in.");
                navigate("/");
                return;
            }
    
            const response = await axios.post(
                "https://todosample-sor2.onrender.com/tasks",
                taskData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            alert("Task added successfully!");
            navigate("/tasklist");
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Error adding task. Please try again.");
        }
    };
    

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handlePriority(e) {
        setPriority(e.target.value);
    }

    function handleStatus(e) {
        setStatus(e.target.checked);
    }

    function handleStartTime(e) {
        setStartTime(e.target.value);
    }

    function handleEndTime(e) {
        setEndTime(e.target.value);
    }

    const taskData = {
        title,
        priority : parseInt(priority),
        status: status ? "Finished" : "Pending",
        start_time,
        end_time,
    };

    return (
        <div className="edit-task-container">
            <h2>Add new Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="titleBox">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={title}
                        onChange={handleTitle}
                    />
                </div>

                <div className="form-group">
                    <label className="titleBox">Priority</label>
                    <input
                        type="number"
                        name="priority"
                        min="1"
                        max="5"
                        className="form-input"
                        value={priority}
                        onChange={handlePriority}
                    />
                </div>

                <div className="form-group">
                    <label className="titleBox">Status</label>
                    <label className="status-checkbox">
                        <input
                            type="checkbox"
                            checked={status}
                            onChange={handleStatus}
                        />
                        {status ? "Finished" : "Pending"}
                    </label>
                </div>

                <div className="form-group">
                    <label className="titleBox">Start Time</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        className="form-input"
                        value={start_time}
                        onChange={handleStartTime}
                    />
                </div>

                <div className="form-group">
                    <label className="titleBox">End Time</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        className="form-input"
                        value={end_time}
                        onChange={handleEndTime}
                    />
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-update">
                        Add Task
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => alert("Edit cancelled.")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTask;
