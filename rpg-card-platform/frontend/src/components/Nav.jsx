import { isAdmin, logout } from "../api.js";

export function Nav({ navigate }) {
  const userIsAdmin = isAdmin();

  return (
    <nav className="nav">
      <button onClick={() => navigate("/home")}>Home</button>
      <button onClick={() => navigate("/comunidad-tarjeta")}>Comunidad Tarjeta</button>
      {userIsAdmin && <button onClick={() => navigate("/admin/constructor")}>Constructor RPG</button>}
      {userIsAdmin && <button onClick={() => navigate("/admin/combinaciones")}>Admin Combinaciones</button>}
      {userIsAdmin && <button onClick={() => navigate("/admin/cartas")}>Admin Cartas</button>}
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
