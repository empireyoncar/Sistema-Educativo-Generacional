import { useState } from "react";
import { AdminCardsPage } from "./pages/AdminCardsPage.jsx";
import { AdminCardBuilderPage } from "./pages/AdminCardBuilderPage.jsx";
import { AdminCombinationsPage } from "./pages/AdminCombinationsPage.jsx";
import { CommunityCardPage } from "./pages/CommunityCardPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { getToken } from "./api.js";

export function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const isAuthed = Boolean(getToken());

  function navigate(nextRoute) {
    window.history.pushState({}, "", nextRoute);
    setRoute(nextRoute);
  }

  if (route === "/register") return <RegisterPage navigate={navigate} />;
  if (route === "/login") return <LoginPage navigate={navigate} />;
  if (!isAuthed) return <LoginPage navigate={navigate} />;

  if (route === "/comunidad-tarjeta") return <CommunityCardPage navigate={navigate} />;
  if (route === "/admin/constructor") return <AdminCardBuilderPage navigate={navigate} />;
  if (route === "/admin/combinaciones") return <AdminCombinationsPage navigate={navigate} />;
  if (route === "/admin/cartas") return <AdminCardsPage navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}
