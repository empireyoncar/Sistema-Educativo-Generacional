import { Nav } from "../components/Nav.jsx";

export function HomePage({ navigate }) {
  return (
    <main className="page">
      <Nav navigate={navigate} />
      <section className="panel">
        <h1>Home</h1>
        <p>Bienvenido a la plataforma de cartas RPG. Entra a Comunidad Tarjeta para generar tu carta unica.</p>
      </section>
    </main>
  );
}
