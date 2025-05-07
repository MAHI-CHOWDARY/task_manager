import Layout from "@/components/layout";
import { useState } from "react";
import { useEffect } from "react";
import withAuth from "./withAuth";
function Createtask() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignee: "",
  });
  useEffect(() => {
    fetch("/api/userdetails") // 🔁 Adjust endpoint based on your backend
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = localStorage.getItem("token");
    const response = await fetch("/api/taskDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        assigneeEmail: task.assignee, // Assignee email
        creatorEmail: email, // Creator's email (logged-in user)
      }),
    });
    if (response.ok) {
      setShowForm(false);
      setLoading(false);
      // setSuccess(true);
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
        assignee: "",
      });
    } else {
      setLoading(false);
      alert("Failed to save task");
      // console.log(response.error)
    }
   
  };
  return (
    <Layout title={"CreateTask"}>
      <div>
        <h1 className="text-center fw-bold text-primary-emphasis">
          Task Management System
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? "Hide Form" : "Create Task"}
        </button>
        {loading ? (
          <div className="text-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          ""
        )}
        
        {showForm && (
          <div className="w-75 mx-auto">
            <h3 className="fw-bold text-info text-center">Assign A Task</h3>
            <form
              onSubmit={handleSubmit}
              className="my-3 border p-4 rounded bg-light shadow"
            >
              {/* <form> */}
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={task.dueDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Assign To</label>
                <select
                  name="assignee"
                  value={task.assignee}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user._id} value={user.email}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "submitting" : "Submit Task"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default withAuth(Createtask);
