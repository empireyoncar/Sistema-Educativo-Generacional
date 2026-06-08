import { useEffect, useState } from "react";
import { deleteCombination, listCombinations, setAdminToken, updateCombination } from "../../lib/combinationsApi";

export function CombinationsPage({ onBack, onLoadCombination }) {
  const [tokenInput, setTokenInput] = useState("");
  const [combinations, setCombinations] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      setCombinations(await listCombinations());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function unlock() {
    setAdminToken(tokenInput.trim());
    load();
  }

  async function remove(id) {
    if (!window.confirm("Eliminar esta combinacion?")) return;
    await deleteCombination(id);
    setCombinations((items) => items.filter((item) => item.id !== id));
  }

  async function saveName(item) {
    const updated = await updateCombination(item.id, { name: editingName });
    setCombinations((items) => items.map((entry) => (entry.id === item.id ? updated : entry)));
    setEditingId("");
    setEditingName("");
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#050505,#18181b_48%,#111827)] p-4 text-yellow-100 lg:p-6">
      <section className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-3 border-b border-yellow-200/15 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-rpg-title rpg-gold-glow text-3xl">Combinaciones</h1>
            <p className="font-rpg-ui text-white/65">Gestion admin de fondos, personajes, marcos, lore y brillo.</p>
          </div>
          <button onClick={onBack} className="rounded-md border border-yellow-200/25 bg-yellow-300/10 px-4 py-2 font-rpg-ui text-sm text-yellow-50 hover:bg-yellow-300/15">
            Volver al constructor
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-rose-300/30 bg-rose-950/30 p-4">
            <p className="font-rpg-ui text-rose-100">{error}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input value={tokenInput} onChange={(event) => setTokenInput(event.target.value)} placeholder="Token admin" className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-yellow-300" />
              <button onClick={unlock} className="rounded-md border border-yellow-200/25 bg-yellow-300/10 px-4 py-2 text-yellow-50">
                Entrar como admin
              </button>
            </div>
          </div>
        )}

        {isLoading ? <p className="font-rpg-ui text-white/70">Cargando combinaciones...</p> : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {combinations.map((item) => (
            <article key={item.id} className="rounded-lg border border-yellow-200/15 bg-black/35 p-4 shadow-xl">
              {editingId === item.id ? (
                <div className="mb-3 flex gap-2">
                  <input value={editingName} onChange={(event) => setEditingName(event.target.value)} className="min-w-0 flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-white outline-none focus:border-yellow-300" />
                  <button onClick={() => saveName(item)} className="rounded-md bg-yellow-300 px-3 py-2 text-sm font-bold text-black">Guardar</button>
                </div>
              ) : (
                <h2 className="font-rpg-title text-xl text-yellow-100">{item.name}</h2>
              )}

              <p className="font-rpg-ui mt-1 text-sm text-white/55">{new Date(item.updatedAt).toLocaleString()}</p>
              <PreviewStrip item={item} />
              <p className="font-rpg-ui mt-3 line-clamp-3 text-sm text-white/70">{item.card?.genre}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => onLoadCombination(item)} className="rounded-md border border-emerald-200/25 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-50 hover:bg-emerald-300/15">
                  Cargar
                </button>
                <button onClick={() => { setEditingId(item.id); setEditingName(item.name); }} className="rounded-md border border-cyan-200/25 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-50 hover:bg-cyan-300/15">
                  Editar nombre
                </button>
                <button onClick={() => remove(item.id)} className="col-span-2 rounded-md border border-rose-200/25 bg-rose-300/10 px-3 py-2 text-sm text-rose-50 hover:bg-rose-300/15">
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function PreviewStrip({ item }) {
  const assets = ["background", "character", "frame", "glow", "attributeIcon", "rankIcon"]
    .map((key) => item.assets?.[key])
    .filter(Boolean);

  return (
    <div className="mt-4 grid grid-cols-6 gap-2">
      {assets.length === 0 ? (
        <div className="col-span-6 rounded border border-white/10 bg-black/40 px-3 py-4 text-center font-rpg-ui text-sm text-white/55">
          Sin imagenes guardadas
        </div>
      ) : null}
      {assets.map((src) => (
        <div key={src} className="h-16 overflow-hidden rounded border border-white/10 bg-black/40">
          <img src={src} alt="" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
