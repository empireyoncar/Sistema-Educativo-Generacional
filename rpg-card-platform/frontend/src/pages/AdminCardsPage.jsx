import { useEffect, useState } from "react";
import { adminApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";
import { RpgCard } from "../components/RpgCard.jsx";

export function AdminCardsPage({ navigate }) {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      setCards(await adminApi.listCards());
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateField(key, value) {
    const updated = await adminApi.updateCard(selected.id, { [key]: value });
    setSelected(updated);
    setCards(cards.map((card) => (card.id === updated.id ? updated : card)));
  }

  async function deleteSelectedCard() {
    if (!selected) return;
    if (!window.confirm(`Eliminar la tarjeta de ${selected.name}? El usuario podra crear una nueva.`)) return;

    try {
      await adminApi.deleteCard(selected.id);
      setCards(cards.filter((card) => card.id !== selected.id));
      setSelected(null);
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
        <h1>Admin Cartas</h1>
        {error && <p className="error">{error}</p>}
        <div className="admin-grid">
          <div className="table-list">
            {cards.map((card) => (
              <button key={card.id} onClick={() => setSelected(card)}>
                {card.name} - {card.rarity}
              </button>
            ))}
          </div>
          <div>
            {selected && (
              <>
                <RpgCard card={selected} />
                <div className="grid-form">
                  {["rarity", "lore", "attribute", "experience", "level"].map((key) => (
                    <input key={key} placeholder={key} value={selected[key] || ""} onChange={(event) => updateField(key, event.target.value)} />
                  ))}
                </div>
                <button className="danger-button" onClick={deleteSelectedCard}>
                  Eliminar tarjeta
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
