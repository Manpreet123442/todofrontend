import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate, useParams } from "react-router-dom";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);

            try {
                const token = JSON.parse(localStorage.user)?.token;
                if (!token) {
                    alert("You are not authorized. Please log in.");
                    navigate("/");
                    return;
                }

                const response = await axios.get("https://todosample-sor2.onrender.com/tasks", {
                    params: { page, size },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTasks(response.data.tasks);
                setTotalPages(Math.ceil(response.data.total / size));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching tasks:", error.response?.data || error.message);
                setLoading(false);

                if (error.response?.status === 401) {
                    alert("Session expired or unauthorized. Redirecting to login...");
                    localStorage.removeItem("user");
                    navigate("/");
                }
            }
        };

        fetchTasks();
    }, [page, size, navigate]);

    const handleCheckboxChange = (taskId) => {
        setSelectedTasks((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    const handleDeleteSelected = async () => {
        if (window.confirm("Are you sure you want to delete the selected tasks?")) {
            try {
                const token = JSON.parse(localStorage.getItem("user"))?.token;
                if (!token) {
                    alert("You are not authorized. Please log in.");
                    return;
                }
    
                await axios.delete(
                    `https://todosample-sor2.onrender.com/tasks/${selectedTasks}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                // Remove deleted tasks from the UI
                setTasks((prev) => prev.filter((task) => !selectedTasks.includes(task.id)));
                setSelectedTasks([]);
            } catch (error) {
                console.error("Error deleting tasks:", error.response?.data || error.message);
                alert("Failed to delete selected tasks. Please try again.");
            }
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="tasklist-div">
            <h1>Task List</h1>
            <main>
                <div className="task-controls">
                    <NavLink to="/addtodo">
                        <button className="add-task">+ Add Task</button>
                    </NavLink>
                    <button className="delete-selected" onClick={handleDeleteSelected}>
                        <DeleteIcon style={{ color: "red", fontSize: "small" }} /> Delete Selected
                    </button>
                </div>
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        setSelectedTasks(checked ? tasks.map((task) => task.id) : []); 
                                    }}
                                    checked={selectedTasks.length === tasks.length && tasks.length > 0}
                                />
                            </th>
                            <th>Task ID</th>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.includes(task.id)}
                                        onChange={() => handleCheckboxChange(task.id)}
                                    />
                                </td>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.priority}</td>
                                <td>{task.status}</td>
                                <td>{task.start_time}</td>
                                <td>{task.end_time}</td>
                                <td>
                                    <NavLink to={`/tasks/edit/${task.id}`}>
                                        <button className="edit-btn">✎</button>
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                        Next
                    </button>
                </div>
            </main>
        </div>
    );
}

export default TaskList;
