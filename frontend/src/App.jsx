import { useEffect, useState } from "react";

const api = "/api/tasks/";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const response = await fetch(api);
    setTasks(await response.json());
  }

  async function createTask(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed })
    });
    setTitle("");
    await loadTasks();
  }

  async function toggleTask(task) {
    await fetch(`${api}${task.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done })
    });
    await loadTasks();
  }

  async function deleteTask(task) {
    await fetch(`${api}${task.id}/`, { method: "DELETE" });
    await loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.heading}>Taskboard</h1>
        <form onSubmit={createTask} style={styles.form}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="New task"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add
          </button>
        </form>
        <div style={styles.list}>
          {tasks.map((task) => (
            <div key={task.id} style={styles.row}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task)}
                />
                <span style={task.done ? styles.doneTitle : styles.title}>
                  {task.title}
                </span>
              </label>
              <button onClick={() => deleteTask(task)} style={styles.delete}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "start center",
    padding: 32,
    background: "#f6f7f9",
    fontFamily: "Inter, system-ui, sans-serif"
  },
  panel: {
    width: "min(720px, 100%)",
    marginTop: 48
  },
  heading: {
    margin: "0 0 20px",
    fontSize: 32
  },
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 16
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #c8ccd2",
    borderRadius: 6,
    fontSize: 16
  },
  button: {
    padding: "10px 14px",
    border: 0,
    borderRadius: 6,
    background: "#2563eb",
    color: "white",
    fontWeight: 700,
    cursor: "pointer"
  },
  list: {
    display: "grid",
    gap: 8
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 12,
    border: "1px solid #d8dce2",
    borderRadius: 6,
    background: "white"
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  title: {
    fontSize: 16
  },
  doneTitle: {
    fontSize: 16,
    color: "#71717a",
    textDecoration: "line-through"
  },
  delete: {
    padding: "8px 10px",
    border: "1px solid #dc2626",
    borderRadius: 6,
    background: "white",
    color: "#dc2626",
    cursor: "pointer"
  }
};
