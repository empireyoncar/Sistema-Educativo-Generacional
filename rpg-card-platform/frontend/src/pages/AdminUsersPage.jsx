import { useEffect, useState } from "react";
import { adminApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";

export function AdminUsersPage({ navigate }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      setUsers(await adminApi.listUsers());
    } catch (err) {
      setError(err.message);
    }
  }

  function selectUser(user) {
    setSelected(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      country: user.country || "",
      role: user.role || "user",
      skills: [...(user.skills || []), "", "", "", ""].slice(0, 4),
      password: "",
    });
  }

  async function save() {
    if (!selected || !form) return;
    const payload = {
      name: form.name,
      email: form.email,
      country: form.country,
      role: form.role,
      skills: form.skills.map((skill) => skill.trim()).filter(Boolean),
      ...(form.password.trim() ? { password: form.password.trim() } : {}),
    };

    try {
      const updated = await adminApi.updateUser(selected.id, payload);
      setUsers(users.map((user) => (user.id === updated.id ? updated : user)));
      selectUser(updated);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove() {
    if (!selected) return;
    if (!window.confirm(`Eliminar la cuenta de ${selected.email}? Tambien se eliminara su tarjeta.`)) return;

    try {
      await adminApi.deleteUser(selected.id);
      setUsers(users.filter((user) => user.id !== selected.id));
      setSelected(null);
      setForm(null);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="page">
      <Nav navigate={navigate} />
      <section className="panel">
        <h1>Admin Usuarios</h1>
        {error && <p className="error">{error}</p>}
        <div className="admin-grid">
          <div className="table-list">
            {users.map((user) => (
              <button key={user.id} onClick={() => selectUser(user)}>
                {user.name} - {user.email}
              </button>
            ))}
          </div>

          {form && (
            <div className="admin-user-editor">
              <input placeholder="Nombre" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
              <input placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
              <input placeholder="Pais" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} />
              <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <input type="password" placeholder="Nueva contrasena opcional" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
              <div className="skills-registration-group">
                <strong>Habilidades:</strong>
                {form.skills.map((skill, index) => (
                  <input
                    key={index}
                    placeholder={`Habilidad ${index + 1}`}
                    value={skill}
                    onChange={(event) => {
                      const skills = [...form.skills];
                      skills[index] = event.target.value;
                      setForm({ ...form, skills });
                    }}
                  />
                ))}
              </div>
              <div className="admin-user-actions">
                <button onClick={save}>Guardar cambios</button>
                <button className="danger-button" onClick={remove}>Eliminar cuenta</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
