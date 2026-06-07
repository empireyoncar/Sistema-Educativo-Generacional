import { useEffect, useState } from "react";
import { adminApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";

const emptyForm = { background: "", character: "", frame: "Ornate Gold", base_lore: "", default_rarity: "" };

export function AdminCombinationsPage({ navigate }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      setItems(await adminApi.listCombinations());
    } catch (err) {
      setError(err.message);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      if (editingId) await adminApi.updateCombination(editingId, form);
      else await adminApi.createCombination(form);
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    await adminApi.deleteCombination(id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="page">
      <Nav navigate={navigate} />
      <section className="panel">
        <h1>Admin Combinaciones</h1>
        {error && <p className="error">{error}</p>}
        <form className="grid-form" onSubmit={save}>
          {Object.keys(emptyForm).map((key) => (
            <input key={key} placeholder={key} value={form[key] || ""} onChange={(event) => setForm({ ...form, [key]: event.target.value })} />
          ))}
          <button>{editingId ? "Actualizar" : "Crear"}</button>
        </form>
        <div className="table-list">
          {items.map((item) => (
            <article key={item.id}>
              <strong>{item.background} x {item.character}</strong>
              <p>{item.base_lore}</p>
              <button onClick={() => { setEditingId(item.id); setForm(item); }}>Editar</button>
              <button onClick={() => remove(item.id)}>Eliminar</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
