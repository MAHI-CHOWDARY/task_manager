import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";
// import taskDetails from "@/components/taskDetails";
// import taskDetails from "@/components/taskDetails";
import TaskDetails from "@/components/taskDetails";
export default function Viewtask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedtask, setSelectedTask] = useState(null);

  const [filter, setFilter] = useState("All");
  // console.log(filter);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    // Filter tasks based on title or description match
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        task.description.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredTasks(filtered); // Set filtered tasks
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const email = localStorage.getItem("token");
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }

      try {
        const res = await fetch("/api/task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error loading tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedtask]);

  useEffect(() => {
    if (filter === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === filter));
    }
  }, [filter, tasks]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFilteredTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        const data = await res.json();
        alert("Failed to delete task: " + data.message);
      }
    } catch (err) {
      alert("Error deleting task");
      console.error(err);
    }
  };

  return (
    <Layout title={"View Tasks"}>
      {!selectedtask ? (
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fw-bold text-success-emphasis">Task List</h3>
            <input
              type="text"
              className="form-control task-search"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: "40%" }}
            />
            <p style={{ cursor: "pointer", fontSize: "1.5rem" }}>🔽</p>
          </div>
          <hr />
          <ul class="nav justify-content-center" style={{ cursor: "pointer" }}>
            <li class="nav-item">
              <a class="nav-link" onClick={() => setFilter("All")}>
                All
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={() => setFilter("Pending")}>
                Pending
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={() => setFilter("In Progress")}>
                In progress
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" onClick={() => setFilter("Completed")}>
                Completed
              </a>
            </li>
          </ul>
          {/* Your task list below */}
          {loading && (
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          <div className="row gy-2 mt-5 mb-3">
            {filteredTasks?.map((ele) => (
              <div key={ele._id} className="col-12 col-md-6 col-lg-6">
                <div className="card shadow-sm px-2" style={{ width: "400px" }}>
                  <div className="card-body">
                    <div className="text-end">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(ele._id)}
                      >
                        🗑️
                      </button>
                    </div>

                    <h3 className="text-danger-emphasis fw-bold text-center">
                      {ele.title}
                    </h3>
                    <div className="card-text">
                      <div className="row">
                        <div className="col-4">
                          <strong>Assignee</strong>
                        </div>
                        <div className="col-8">
                          <p>{ele.assigneeEmail}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-4">
                          <strong>Creator</strong>
                        </div>
                        <div className="col-8">
                          <p>{ele.creatorEmail}</p>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4">
                          <strong>Due Date</strong>
                        </div>
                        <div className="col-8">
                          <p>{new Date(ele.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-4">
                          <strong>Created At</strong>
                        </div>
                        <div className="col-8">
                          <p>{new Date(ele.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="row mb-2">
                        <div className="col-4">
                          <strong>Priority</strong>
                        </div>
                        <div className="col-8">
                          <p>{ele.priority}</p>
                        </div>
                      </div>
                      <div className=" mb-2 text-center">
                        <button
                          className={`btn ${
                            ele.status === "Pending"
                              ? "btn-danger"
                              : `${
                                  ele.status === "In Progress"
                                    ? "btn-warning"
                                    : "btn-success"
                                }`
                          }`}
                        >
                          {ele.status}
                        </button>

                        <button
                          className="btn btn-secondary mx-2"
                          onClick={() => setSelectedTask(ele)}
                          disabled={ele.status === "Completed"}
                        >
                          Update Task
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center fs-1 text-success">
                No Tasks available
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <TaskDetails
            task={selectedtask}
            onBack={() => setSelectedTask(null)}
          />
        </div>
      )}
      <div
        className="toast position-fixed bottom-0 end-0 m-3"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="deleteToast"
      >
        <div className="toast-header bg-success text-white">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Task deleted successfully!</div>
      </div>
    </Layout>
  );
}
