import { useState } from "react";
import { authApi, setToken } from "../api.js";

export function RegisterPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "", skills: ["", "", "", ""] });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await authApi.register({ ...form, skills: form.skills.map((item) => item.trim()).filter(Boolean) });
      setToken(result.access_token);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-page">
      <form className="panel auth-form" onSubmit={submit}>
        <h1>Registro</h1>
        {["name", "email", "password", "country"].map((field) => (
          <input key={field} type={field === "password" ? "password" : "text"} placeholder={field} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />
        ))}
        <div className="skills-registration-group">
          <div>
            <strong>Habilidades:</strong>
            <p>Por favor recomendamos llene 4 habilidades.</p>
          </div>
          {form.skills.map((skill, index) => (
            <input
              key={index}
              placeholder={`Habilidad ${index + 1}`}
              value={skill}
              onChange={(event) => {
                const skills = [...form.skills];
                skills[index] = event.target.value;
                setForm({ ...form, skills });
              }}
            />
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button>Crear cuenta</button>
        <button type="button" className="ghost" onClick={() => navigate("/login")}>Ya tengo cuenta</button>
      </form>
    </main>
  );
}
