import { useEffect, useState } from "react";
import { cardApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";
import { RpgCard } from "../components/RpgCard.jsx";

export function CommunityCardPage({ navigate }) {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCard() {
    setLoading(true);
    try {
      setCard(await cardApi.me());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setError("");
    try {
      setCard(await cardApi.generate());
    } catch (err) {
      setError(err.message);
    }
  }

  async function regenerate() {
    if (!window.confirm("Reemplazar esta tarjeta por una combinacion guardada en el constructor?")) return;
    setError("");
    try {
      setCard(await cardApi.regenerate());
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadCard();
  }, []);

  return (
    <main className="page">
      <Nav navigate={navigate} />
      <section className="panel">
        <h1>Comunidad Tarjeta</h1>
        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !card && <button onClick={generate}>Crear tarjeta</button>}
        {card && (
          <>
            <button onClick={regenerate}>Reemplazar con combinacion del constructor</button>
            <RpgCard card={card} />
          </>
        )}
      </section>
    </main>
  );
}
