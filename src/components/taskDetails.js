// components/TaskDetailCard.js
import withAuth from "@/pages/withAuth";
import { useState } from "react";
function TaskDetails({ task, onBack }) {
    const [form, setForm] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task._id)
    const res = await fetch(`/api/task/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Task updated successfully");
      onBack(); // Optional callback to update parent UI
    } else {
      alert("Failed to update task");
    }
  };


  return (
    <div className=" card shadow w-75 my-5 mx-auto p-5 ">
    <form onSubmit={handleSubmit}>
    
      <h4 className="mb-3 text-primary text-center fw-bold">Update Task</h4>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control"
          required
          readOnly
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          required
          readOnly
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate.slice(0, 10)}
          onChange={handleChange}
          className="form-control"
          required
          readOnly
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="form-select"
          aria-readonly
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
          value={form.status}
          onChange={handleChange}
          className="form-select"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>
    <div className="text-center">
    <button type="submit" className="btn btn-success me-2">
        Update Task
      </button>
      <button className="btn btn-secondary" onClick={()=>onBack()}>
        View Tasks
      </button>
    </div>
      
    </form>
    </div>
  );
}

export default withAuth(TaskDetails);
