import { Nav } from "../components/Nav.jsx";

const builderUrl = import.meta.env.VITE_CARD_BUILDER_URL || "http://localhost:3000";

export function AdminCardBuilderPage({ navigate }) {
  return (
    <main className="page">
      <Nav navigate={navigate} />
      <section className="panel">
        <div className="builder-header">
          <div>
            <h1>Constructor de Cartas RPG</h1>
            <p>Acceso admin al constructor visual de cartas.</p>
          </div>
          <a className="button-link" href={builderUrl} target="_blank" rel="noreferrer">
            Abrir en nueva pestana
          </a>
        </div>
        <iframe className="builder-frame" src={builderUrl} title="Constructor de Cartas RPG" />
      </section>
    </main>
  );
}
