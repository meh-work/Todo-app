import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const limit = 10; // Number of records per page

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/admin-login");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/todos/admin?page=${page}&limit=${limit}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Response data: ", response.data);

                setTodos(response.data.todos);
                setTotalResults(response.data.total);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        fetchTodos();
    }, [page, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin-login");
    };

    return (
        <div className="dashboard-container">
            <button className="logout" onClick={handleLogout}>Logout</button>
            <h1 className="dashboard-header">Admin Dashboard</h1>

            <table className="todo-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Task</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                {console.log("Todos: ",todos)}
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <tr key={todo._id}>
                                <td>{todo.username || "Unknown"}</td>
                                <td>{todo.task}</td>
                                <td>
                                    {todo.image ? (
                                        <button onClick={() => setSelectedImage(`http://localhost:5000/${todo.image}`)}>View Image</button>
                                    ) : (
                                        "Null"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No tasks available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {Math.ceil(totalResults / limit)}</span>
                <button onClick={() => setPage((prev) => prev + 1)} disabled={page * limit >= totalResults}>
                    Next
                </button>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="image-preview-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="image-preview">
                        <img src={selectedImage} alt="Task Preview" />
                        <button onClick={() => setSelectedImage(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
