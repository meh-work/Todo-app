import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignTask,
  fetchUsers,
} from "../../redux/actions/adminActions/todoActions";
import { useNavigate } from "react-router-dom";

const AssignTask = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { users, loading, error } = useSelector((state) => state.users || {});
  const navigate = useNavigate();
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
      dispatch(assignTask(selectedUser, task, token, navigate));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Assign Task to User
        </h2>
        {loading && (
          <p className="text-gray-500 text-center">Loading users...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={loading}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Task:</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              disabled={loading}
              className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter task details..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Assign Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
