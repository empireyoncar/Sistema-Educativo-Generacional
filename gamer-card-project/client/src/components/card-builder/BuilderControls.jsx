import { textStyles } from "../../texto";

const assetConfigs = [
  ["Fondos", "Fondo individual", "Carpeta de fondos", "backgroundLibrary", "background", "Fondo seleccionado", "cover"],
  ["Personajes", "Personaje individual", "Carpeta de personajes", "characterLibrary", "character", "Personaje seleccionado", "contain"],
  ["Marcos", "Marco individual", "Carpeta de marcos", "frameLibrary", "frame", "Marco seleccionado", "contain"],
  ["Brillos", "Brillo individual", "Carpeta de brillos", "glowLibrary", "glow", "Brillo seleccionado", "contain"],
  ["Atributos", "Atributo individual", "Carpeta de atributos", "attributeLibrary", "attributeIcon", "Atributo seleccionado", "contain"],
  ["Rangos", "Rango individual", "Carpeta de rangos", "rankLibrary", "rankIcon", "Rango seleccionado", "contain"],
];

export function BuilderControls({
  assetNames,
  assets,
  card,
  cardModels,
  modelText,
  libraries,
  loreOptions,
  rankOptions,
  onApplyModel,
  onNavigateCombinations,
  onResetAssets,
  onSaveCombination,
  onSelectAsset,
  onSelectTemplate,
  onSelectTextStyle,
  onUpdateCard,
  onUpdateModelText,
  onUpdateSkill,
  onUploadAsset,
  onUploadLibraryFolder,
  selectedModelId,
  templateId,
  templates,
  textStyleId,
}) {
  return (
    <aside className="w-full max-w-2xl 2xl:max-w-xl bg-white/5 border border-white/10 rounded-lg p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="font-rpg-title rpg-gold-glow text-2xl">Constructor de cartas</h2>
          <p className="font-rpg-ui text-white/70 text-base">Elige una plantilla, un modelo y sube tus assets.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={onNavigateCombinations} className="rounded-md border border-yellow-200/25 bg-yellow-300/10 px-3 py-2 text-sm text-yellow-50 hover:bg-yellow-300/15">
            Combinaciones
          </button>
          <button onClick={onSaveCombination} className="rounded-md border border-emerald-200/25 bg-emerald-300/10 px-3 py-2 text-sm text-emerald-50 hover:bg-emerald-300/15">
            Guardar combinacion
          </button>
          <button onClick={onResetAssets} className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/15">
            Limpiar assets
          </button>
        </div>
      </div>

      <ControlGroup title="Plantillas visuales">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {templates.map((item) => (
            <button key={item.id} onClick={() => onSelectTemplate(item.id)} className={`rounded-md border p-2 text-left text-sm transition ${templateId === item.id ? `${item.border} bg-white/15` : "border-white/10 bg-black/20 hover:bg-white/10"}`}>
              <span className={`block h-8 rounded ${item.background}`} />
              <span className="mt-2 block text-white">{item.name}</span>
            </button>
          ))}
        </div>
      </ControlGroup>

      <ControlGroup title="Modelos de carta">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cardModels.map((model) => (
            <button key={model.id} onClick={() => onApplyModel(model.id)} className={`rounded-md border p-3 text-left transition ${selectedModelId === model.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10 bg-black/20 hover:bg-white/10"}`}>
              <span className="block text-lg font-black text-white">{model.icon}</span>
              <span className="text-sm text-white/80">{model.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Input label="Titulo modelo" value={modelText.name} onChange={(v) => onUpdateModelText("name", v)} />
          <Input label="Subtitulo modelo" value={modelText.tagline} onChange={(v) => onUpdateModelText("tagline", v)} />
        </div>
      </ControlGroup>

      <ControlGroup title="Estilos de texto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-56 overflow-auto pr-1">
          {textStyles.map((style) => (
            <button key={style.id} onClick={() => onSelectTextStyle(style.id)} className={`rounded-md border bg-black/20 p-2 text-left transition hover:bg-white/10 ${textStyleId === style.id ? "border-yellow-300 bg-yellow-300/15" : "border-white/10"}`}>
              <strong className={`${style.className} block truncate text-xs`}>{style.name}</strong>
              <span className="font-rpg-ui mt-1 block truncate text-xs text-white/60">{style.subtitle}</span>
            </button>
          ))}
        </div>
      </ControlGroup>

      <ControlGroup title="Lore de carta">
        <div className="grid max-h-72 grid-cols-1 gap-2 overflow-auto pr-1">
          {loreOptions.map((lore) => (
            <button
              key={lore.id}
              type="button"
              onClick={() => onUpdateCard("genre", lore.text)}
              className={`rounded-md border bg-black/25 p-3 text-left transition hover:bg-white/10 ${card.genre === lore.text ? "border-yellow-300 bg-yellow-300/15" : "border-white/10"}`}
            >
              <strong className="font-rpg-title block text-sm text-yellow-100">{lore.title}</strong>
              <span className="font-rpg-ui mt-1 block text-sm leading-snug text-white/70">{lore.text}</span>
            </button>
          ))}
        </div>
      </ControlGroup>

      <ControlGroup title="Texto de rango">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {rankOptions.map((rank) => (
            <button
              key={rank}
              type="button"
              onClick={() => onUpdateCard("rank", rank)}
              className={`rounded-md border px-3 py-2 text-center font-rpg-title text-xs transition hover:bg-white/10 ${card.rank === rank ? "border-yellow-300 bg-yellow-300/15 text-yellow-100" : "border-white/10 bg-black/25 text-white/75"}`}
            >
              {rank}
            </button>
          ))}
        </div>
        <p className="font-rpg-ui mt-2 text-sm text-white/55">El escudo se elige en Imagenes &gt; Rangos.</p>
      </ControlGroup>

      <ControlGroup title="Imagenes">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {assetConfigs.map(([label, singleLabel, folderLabel, libraryKey, assetKey, previewAlt, thumbnailMode]) => (
            <LibraryUpload
              key={assetKey}
              label={label}
              singleLabel={singleLabel}
              folderLabel={folderLabel}
              library={libraries[libraryKey]}
              name={assetNames[assetKey]}
              preview={assets[assetKey]}
              previewAlt={previewAlt}
              thumbnailMode={thumbnailMode}
              onSingleFile={(file) => onUploadAsset(assetKey, file)}
              onFolder={(files) => onUploadLibraryFolder(files, libraryKey, assetKey)}
              onSelect={(item) => onSelectAsset(assetKey, item)}
            />
          ))}
        </div>
      </ControlGroup>

      <ControlGroup title="Datos">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(card).map(([key, value]) => key === "skills" ? null : <Input key={key} label={key} value={value} onChange={(v) => onUpdateCard(key, v)} />)}
        </div>
      </ControlGroup>

      <ControlGroup title="Habilidades">
        <div className="grid grid-cols-2 gap-3">
          {card.skills.map((skill, i) => <Input key={i} label={`Habilidad ${i + 1}`} value={skill} onChange={(v) => onUpdateSkill(i, v)} />)}
        </div>
      </ControlGroup>
    </aside>
  );
}

function ControlGroup({ title, children }) {
  return (
    <section className="mb-5">
      <h3 className="font-rpg-title text-xs text-yellow-200/80 mb-2">{title}</h3>
      {children}
    </section>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="font-rpg-ui block text-base text-yellow-100">
      <span className="capitalize">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-md bg-zinc-950 border border-yellow-200/20 p-2 text-white outline-none focus:border-yellow-300" />
    </label>
  );
}

function LibraryUpload({ label, singleLabel, folderLabel, library, name, preview, previewAlt, thumbnailMode, onSingleFile, onFolder, onSelect }) {
  return (
    <div className="font-rpg-ui col-span-2 md:col-span-3 rounded-md border border-yellow-200/15 bg-black/30 p-3 text-base text-yellow-100">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-lg text-yellow-100">{label}</p>
          {name && <p className="mt-1 max-w-sm truncate text-xs text-white/60">{name}</p>}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-white hover:bg-white/10">
            {singleLabel}
            <input type="file" accept="image/*" onChange={(e) => onSingleFile(e.target.files?.[0])} className="hidden" />
          </label>
          <label className="rounded-md border border-yellow-200/25 bg-yellow-300/10 px-3 py-2 text-center text-sm text-yellow-50 hover:bg-yellow-300/15">
            {folderLabel}
            <input type="file" accept="image/*" multiple webkitdirectory="" directory="" onChange={(e) => onFolder(e.target.files)} className="hidden" />
          </label>
        </div>
      </div>
      {preview && (
        <div className="mt-3 h-28 overflow-hidden rounded-md border border-white/10 bg-black/40">
          <img src={preview} alt={previewAlt} className={`h-full w-full ${thumbnailMode === "contain" ? "object-contain" : "object-cover"}`} />
        </div>
      )}
      {library.length > 0 && (
        <div className="mt-3 grid max-h-56 grid-cols-3 gap-2 overflow-auto pr-1 md:grid-cols-5">
          {library.map((item) => (
            <button key={item.url} type="button" onClick={() => onSelect(item)} className={`overflow-hidden rounded-md border bg-black/40 text-left transition hover:border-yellow-200 ${preview === item.url ? "border-yellow-300" : "border-white/10"}`} title={item.path}>
              <img src={item.url} alt={item.name} className={`h-20 w-full ${thumbnailMode === "contain" ? "object-contain" : "object-cover"}`} />
              <span className="block truncate px-2 py-1 text-xs text-white/70">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
