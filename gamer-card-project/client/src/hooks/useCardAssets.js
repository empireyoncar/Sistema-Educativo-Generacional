import { useEffect, useState } from "react";
import { emptyAssets } from "../cardBuilderData";

const localLibraries = [
  ["backgrounds", "backgroundLibrary", "background"],
  ["characters", "characterLibrary", "character"],
  ["attributes", "attributeLibrary", "attributeIcon"],
  ["ranks", "rankLibrary", "rankIcon"],
  ["frames", "frameLibrary", "frame"],
  ["glows", "glowLibrary", "glow"],
];

export function useCardAssets() {
  const [assets, setAssets] = useState(emptyAssets);
  const [assetNames, setAssetNames] = useState(emptyAssets);
  const [libraries, setLibraries] = useState({
    backgroundLibrary: [],
    characterLibrary: [],
    attributeLibrary: [],
    rankLibrary: [],
    frameLibrary: [],
    glowLibrary: [],
  });

  useEffect(() => {
    localLibraries.forEach(([group, libraryKey, assetKey]) => {
      loadLocalLibrary(group, libraryKey, assetKey);
    });
  }, []);

  async function loadLocalLibrary(group, libraryKey, assetKey) {
    try {
      const response = await fetch(`/local-assets/${group}/list`);
      if (!response.ok) return;
      const files = await response.json();

      setLibraries((prev) => ({ ...prev, [libraryKey]: files }));
      if (files[0]) {
        setAssets((prev) => ({ ...prev, [assetKey]: files[0].url }));
        setAssetNames((prev) => ({ ...prev, [assetKey]: files[0].name }));
      }
    } catch {
      // Local folders are available only while running through the Vite dev server.
    }
  }

  function uploadAsset(key, file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAssets((prev) => ({ ...prev, [key]: url }));
    setAssetNames((prev) => ({ ...prev, [key]: file.name }));
  }

  function uploadLibraryFolder(files, libraryKey, assetKey) {
    const imageFiles = Array.from(files ?? []).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    libraries[libraryKey].forEach((item) => {
      if (item.url.startsWith("blob:")) URL.revokeObjectURL(item.url);
    });

    const nextItems = imageFiles.map((file) => ({
      name: file.name,
      path: file.webkitRelativePath || file.name,
      url: URL.createObjectURL(file),
    }));

    setLibraries((prev) => ({ ...prev, [libraryKey]: nextItems }));
    setAssets((prev) => ({ ...prev, [assetKey]: nextItems[0].url }));
    setAssetNames((prev) => ({ ...prev, [assetKey]: nextItems[0].name }));
  }

  function selectLibraryItem(assetKey, item) {
    setAssets((prev) => ({ ...prev, [assetKey]: item.url }));
    setAssetNames((prev) => ({ ...prev, [assetKey]: item.name }));
  }

  function restoreAssets(nextAssets, nextAssetNames) {
    setAssets({ ...emptyAssets, ...(nextAssets || {}) });
    setAssetNames({ ...emptyAssets, ...(nextAssetNames || {}) });
  }

  function resetAssets() {
    [...Object.values(assets), ...Object.values(libraries).flat().map((item) => item.url)].forEach((url) => {
      if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    setAssets(emptyAssets);
    setAssetNames(emptyAssets);
    setLibraries({
      backgroundLibrary: [],
      characterLibrary: [],
      attributeLibrary: [],
      rankLibrary: [],
      frameLibrary: [],
      glowLibrary: [],
    });
  }

  return {
    assets,
    assetNames,
    libraries,
    resetAssets,
    restoreAssets,
    uploadAsset,
    uploadLibraryFolder,
    selectLibraryItem,
  };
}
