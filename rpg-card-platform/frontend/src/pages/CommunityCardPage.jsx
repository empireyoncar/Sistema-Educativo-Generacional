import { useEffect, useState } from "react";
import { cardApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";
import { RpgCard } from "../components/RpgCard.jsx";

export function CommunityCardPage({ navigate }) {
  const [card, setCard] = useState(null);
  const [preview, setPreview] = useState(null);
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

  async function generatePreview() {
    setError("");
    try {
      setPreview(await cardApi.preview());
    } catch (err) {
      setError(err.message);
    }
  }

  async function savePreview() {
    if (!preview) return;
    setError("");
    try {
      setCard(await cardApi.claim(preview));
      setPreview(null);
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
        {!loading && !card && !preview && <button onClick={generatePreview}>Generar vista previa</button>}
        {preview && (
          <>
            <div className="card-actions">
              <button onClick={savePreview}>Guardar esta tarjeta</button>
              <button className="ghost" onClick={generatePreview}>Elegir otra combinacion</button>
            </div>
            <RpgCard card={preview} />
          </>
        )}
        {card && !preview && (
          <>
            <button onClick={generatePreview}>Generar nueva vista previa</button>
            <RpgCard card={card} />
          </>
        )}
      </section>
    </main>
  );
}
