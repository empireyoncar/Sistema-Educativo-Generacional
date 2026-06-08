import { useEffect, useState } from "react";
import { adminApi } from "../api.js";
import { Nav } from "../components/Nav.jsx";

export function AdminBuilderCombinationsPage({ navigate }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      setItems(await adminApi.listBuilderCombinations());
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
        <h1>Combinaciones para usuarios</h1>
        <p className="muted-text">Estas son las combinaciones del Constructor RPG que copycard puede copiar y asignar a un usuario.</p>
        {error && <p className="error">{error}</p>}
        <div className="builder-combination-grid">
          {items.map((item) => (
            <article key={item.id || item.name} className="builder-combination-card">
              <PreviewStrip visual={item.visual} />
              <h2>{item.name}</h2>
              <p>{item.visual?.lore || "Sin lore guardado"}</p>
              <dl>
                <dt>Modelo</dt>
                <dd>{item.modelText?.name || "-"}</dd>
                <dt>Fondo</dt>
                <dd>{item.assetNames?.background || "-"}</dd>
                <dt>Personaje</dt>
                <dd>{item.assetNames?.character || "-"}</dd>
                <dt>Marco</dt>
                <dd>{item.assetNames?.frame || "-"}</dd>
              </dl>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PreviewStrip({ visual }) {
  const assets = visual?.visual_assets || {};
  const srcs = [assets.background, assets.character, assets.frame, assets.glow, assets.attributeIcon, assets.rankIcon].filter(Boolean);

  return (
    <div className="builder-preview-strip">
      {srcs.map((src) => (
        <span key={src}>
          <img src={src} alt="" />
        </span>
      ))}
    </div>
  );
}
