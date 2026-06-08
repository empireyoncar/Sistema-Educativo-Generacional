import { useState } from "react";
import { authApi, setToken } from "../api.js";

export function RegisterPage({ navigate }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", country: "", skills: ["", "", "", ""] });
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      const result = await authApi.register({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email,
        password: form.password,
        country: form.country,
        skills: form.skills.map((item) => item.trim()).filter(Boolean),
      });
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
        <input placeholder="Nombre" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} />
        <input placeholder="Apellido" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} />
        {["email", "password", "country"].map((field) => (
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
