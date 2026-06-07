import { logout } from "../api.js";

export function Nav({ navigate }) {
  return (
    <nav className="nav">
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/comunidad-tarjeta")}>Comunidad Tarjeta</button>
      <button onClick={() => navigate("/admin/constructor")}>Constructor RPG</button>
      <button onClick={() => navigate("/admin/combinaciones")}>Admin Combinaciones</button>
      <button onClick={() => navigate("/admin/cartas")}>Admin Cartas</button>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </nav>
  );
}
