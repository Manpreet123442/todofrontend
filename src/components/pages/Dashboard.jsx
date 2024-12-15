import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [summary, setSummary] = useState({});
    const [pendingTask, setPendingTask] = useState({});
    const [pendingCopy, setPendingCopy] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.user)?.token;
        if (!token) {
            alert("You are not authorized. Please log in.");
            navigate("/");
            return;
        }

        // Fetching summary data
        axios.get("https://todosample-sor2.onrender.com/tasks/task-stats", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setSummary(response.data);
            })
            .catch((error) => console.log(error));

        // Fetching pending tasks
        axios.get("https://todosample-sor2.onrender.com/tasks/pending-tasks", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setPendingTask(response.data);
            })
            .catch((error) => console.log(error));

        // Fetching tasks by priority
        axios.get("https://todosample-sor2.onrender.com/tasks/tasks-by-priority", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setPendingCopy(response.data);
                console.log(pendingCopy)
            })
            .catch((error) => console.log(error));

    }, [navigate]);


    return (
        <div>
            <main>
                <h1>Dashboard</h1>
                <section className="summary">
                    <h2>Summary</h2>
                    <div className="summary-stats">
                        <div>
                            <h3>{summary.totalTasks}</h3>
                            <p>Total tasks</p>
                        </div>
                        <div>
                            <h3>{summary.tasksCompletedPercentage}</h3>
                            <p>Tasks completed</p>
                        </div>
                        <div>
                            <h3>{summary.tasksPendingPercentage}</h3>
                            <p>Tasks pending</p>
                        </div>
                        <div>
                            <h3>{summary.averageTimePerCompletedTask}</h3>
                            <p>Average time per completed task</p>
                        </div>
                    </div>
                </section>

                <section className="pending-summary">
                    <h2>Pending task summary</h2>
                    <div className="pending-stats">
                        <div>
                            <h3>{pendingTask.pendingTasksCount}</h3>
                            <p>Pending tasks</p>
                        </div>
                        <div>
                            <h3>{Number.parseInt(pendingTask.totalTimeLapsedHours).toFixed(2)}</h3>
                            <p>Total time lapsed</p>
                        </div>
                        <div>
                            <h3>{Number.parseInt(pendingTask.totalEstimatedTimeHours).toFixed(2)}</h3>
                            <p>Total time to finish <br /><small>estimated based on end time</small></p>
                        </div>
                    </div>
                </section>

                <section className="priority-table">
                    <h2>Task Priority Summary</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Task Priority</th>
                                <th>Pending Tasks</th>
                                <th>Time Lapsed (hrs)</th>
                                <th>Time to Finish (hrs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(pendingCopy.tasksByPriority) && pendingCopy.tasksByPriority.length > 0 ? (
                                pendingCopy.tasksByPriority.map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.priority}</td>
                                        <td>{task.pendingTasks}</td>
                                        <td>{Number.parseInt(task.totalTimeLapsedHours).toFixed(2)}</td>
                                        <td>{Number.parseInt(task.totalEstimatedTimeHours).toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
