import { useState } from "react";
import { BuilderControls } from "./components/card-builder/BuilderControls";
import { CombinationsPage } from "./components/card-builder/CombinationsPage";
import { CardPreview } from "./components/card-builder/CardPreview";
import { cardModels, loreOptions, rankOptions, templates } from "./cardBuilderData";
import { useCardAssets } from "./hooks/useCardAssets";
import { getAdminToken, saveCombination, setAdminToken } from "./lib/combinationsApi";
import { defaultTextStyle, textStyles } from "./texto";

export default function EmpireyoncarCardBuilder() {
  const [selectedModelId, setSelectedModelId] = useState(cardModels[0].id);
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [textStyleId, setTextStyleId] = useState(defaultTextStyle.id);
  const [card, setCard] = useState(cardModels[0].card);
  const [view, setView] = useState("builder");
  const [modelText, setModelText] = useState({
    name: cardModels[0].name,
    tagline: cardModels[0].tagline,
  });

  const {
    assets,
    assetNames,
    libraries,
    resetAssets,
    restoreAssets,
    selectLibraryItem,
    uploadAsset,
    uploadLibraryFolder,
  } = useCardAssets();

  const selectedModel = cardModels.find((model) => model.id === selectedModelId) ?? cardModels[0];
  const previewModel = { ...selectedModel, ...modelText };
  const template = templates.find((item) => item.id === templateId) ?? templates[0];
  const textStyle = textStyles.find((item) => item.id === textStyleId) ?? defaultTextStyle;

  function applyModel(modelId) {
    const model = cardModels.find((item) => item.id === modelId);
    if (!model) return;
    setSelectedModelId(model.id);
    setModelText({ name: model.name, tagline: model.tagline });
    setCard(model.card);
  }

  function updateCard(key, value) {
    setCard((prev) => ({ ...prev, [key]: value }));
  }

  function updateSkill(index, value) {
    setCard((prev) => {
      const skills = [...prev.skills];
      skills[index] = value;
      return { ...prev, skills };
    });
  }

  async function handleSaveCombination() {
    let token = getAdminToken();
    if (!token) {
      token = window.prompt("Token admin para guardar combinacion") || "";
      if (!token.trim()) return;
      setAdminToken(token.trim());
    }

    const name = window.prompt("Nombre de la combinacion", `${card.name} - ${selectedModel.name}`) || `${card.name} - ${selectedModel.name}`;

    try {
      await saveCombination({
        name,
        card,
        assets,
        assetNames,
        modelText,
        selectedModelId,
        templateId,
        textStyleId,
      });
      window.alert("Combinacion guardada.");
    } catch (error) {
      window.alert(error.message);
    }
  }

  function loadCombination(item) {
    setSelectedModelId(item.selectedModelId || cardModels[0].id);
    const model = cardModels.find((entry) => entry.id === item.selectedModelId) ?? cardModels[0];
    setModelText(item.modelText || { name: model.name, tagline: model.tagline });
    setTemplateId(item.templateId || templates[0].id);
    setTextStyleId(item.textStyleId || defaultTextStyle.id);
    setCard(item.card || cardModels[0].card);
    restoreAssets(item.assets, item.assetNames);
    setView("builder");
  }

  if (view === "combinations") {
    return <CombinationsPage onBack={() => setView("builder")} onLoadCombination={loadCombination} />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_8%,rgba(120,53,15,.42),transparent_35%),radial-gradient(circle_at_16%_78%,rgba(88,28,135,.22),transparent_28%),linear-gradient(135deg,#050505_0%,#18181b_48%,#111827_100%)] text-yellow-100 p-4 lg:p-6 flex flex-col 2xl:flex-row gap-6 items-center justify-center">
      <CardPreview assets={assets} card={card} selectedModel={previewModel} template={template} textStyle={textStyle} />

      <BuilderControls
        assetNames={assetNames}
        assets={assets}
        card={card}
        cardModels={cardModels}
        modelText={modelText}
        loreOptions={loreOptions}
        libraries={libraries}
        rankOptions={rankOptions}
        onApplyModel={applyModel}
        onNavigateCombinations={() => setView("combinations")}
        onResetAssets={resetAssets}
        onSaveCombination={handleSaveCombination}
        onSelectAsset={selectLibraryItem}
        onSelectTemplate={setTemplateId}
        onSelectTextStyle={setTextStyleId}
        onUpdateCard={updateCard}
        onUpdateModelText={(key, value) => setModelText((prev) => ({ ...prev, [key]: value }))}
        onUpdateSkill={updateSkill}
        onUploadAsset={uploadAsset}
        onUploadLibraryFolder={uploadLibraryFolder}
        selectedModelId={selectedModelId}
        templateId={templateId}
        templates={templates}
        textStyleId={textStyleId}
      />

      <style>{`
        @keyframes shine {
          0%, 55% { transform: translateX(-200px) rotate(12deg); opacity: 0; }
          75% { opacity: 1; }
          100% { transform: translateX(720px) rotate(12deg); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
