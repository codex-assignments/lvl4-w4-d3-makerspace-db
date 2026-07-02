import { useState, useEffect } from "react";

export default function App() {
  const [tools, setTools] = useState([]);
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("3D Printing");
  const [rate, setRate] = useState("");
  const [error, setError] = useState(null);

  //read from flask
  const fetchTools = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tools");
      const data = await res.json();
      if (res.ok) setTools(data);
    } catch {
      setError("Failed to connect to backend.");
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // new tool to flask/supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!toolName || !category || !rate) return;

    try {
      const res = await fetch("http://localhost:5000/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool_name: toolName,
          category: category,
          daily_rental_rate: parseInt(rate),
        }),
      });

      if (res.ok) {
        setToolName("");
        setRate("");
        fetchTools(); // refresh 
      }

    } catch {
      setError("Failed to create new tool.");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Makerspace Tool Inventory Manager</h1>
      {error && <p className="error-message">{error}</p>}

      {/* create tool form */}
      <form onSubmit={handleSubmit} className="tool-form">
        <h3 className="form-title">Add New Tool</h3>

        <div className="form-group">
          <label className="form-label">Tool Name: </label>
          <input
            type="text"
            className="form-input"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category: </label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="3D Printing">3D Printing</option>
            <option value="Laser & CNC">Laser & CNC</option>
            <option value="Woodworking">Woodworking</option>
            <option value="Metalworking">Metalworking</option>
            <option value="Electronics & Textiles">
              Electronics & Textiles
            </option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Daily Rate ($): </label>
          <input
            type="number"
            className="form-input"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Register Tool
        </button>
      </form>

      <h3 className="section-title">Current Inventory Grid</h3>
      <table className="inventory-table">
        <thead>
          <tr className="table-header">
            <th>Tool Name</th>
            <th>Category</th>
            <th>Daily Rate</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tools) &&
            tools.map((tool) => (
              <tr key={tool.id} className="table-row">
                <td>{tool.tool_name}</td>
                <td>{tool.category}</td>
                <td>${tool.daily_rental_rate}/day</td>
              </tr>
            ))}
        </tbody>
x      </table>
    </div>
  );
}