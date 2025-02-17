import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/adminActions/todoActions";

const AssignTask = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { users, loading, error } = useSelector((state) => state.users || {});

  const [selectedUser, setSelectedUser] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser && task) {
      console.log("Task assigned to:", selectedUser, "Task:", task);
      // dispatch(assignTask(selectedUser, task));
    }
  };

  return (
    <div className="assign-task-container">
      <h2>Assign Task to User</h2>

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          disabled={loading}
        >
          <option value="">Select a User</option>
          {users && users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))
          ) : (
            <option disabled>No users found</option>
          )}
        </select>

        <label>Task:</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default AssignTask;
