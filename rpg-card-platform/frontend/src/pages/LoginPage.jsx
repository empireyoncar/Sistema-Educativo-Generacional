import { useState } from "react";
import { authApi, setToken } from "../api.js";

export function LoginPage({ navigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await authApi.login(form);
      setToken(result.access_token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="panel auth-form" onSubmit={submit}>
        <h1>Login</h1>
        <input placeholder="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input type="password" placeholder="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
        {error && <p className="error">{error}</p>}
        <button>Entrar</button>
        <button type="button" className="ghost" onClick={() => navigate("/register")}>Crear cuenta</button>
      </form>
    </main>
  );
}
