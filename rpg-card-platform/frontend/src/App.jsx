import { useEffect, useState } from "react";
import { AdminCardsPage } from "./pages/AdminCardsPage.jsx";
import { AdminCardBuilderPage } from "./pages/AdminCardBuilderPage.jsx";
import { AdminCombinationsPage } from "./pages/AdminCombinationsPage.jsx";
import { CommunityCardPage } from "./pages/CommunityCardPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { getToken, isAdmin } from "./api.js";

export const BASE_PATH = "/empireyoncarsistemaeducativo";

function stripBasePath(pathname) {
  if (pathname === BASE_PATH) return "/home";
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length);
  return pathname;
}

function withBasePath(route) {
  return `${BASE_PATH}${route === "/" ? "/home" : route}`;
}

export function App() {
  const [route, setRoute] = useState(stripBasePath(window.location.pathname));
  const isAuthed = Boolean(getToken());
  const userIsAdmin = isAdmin();

  useEffect(() => {
    function handlePopState() {
      setRoute(stripBasePath(window.location.pathname));
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigate(nextRoute) {
    const normalizedRoute = nextRoute === "/" ? "/home" : nextRoute;
    window.history.pushState({}, "", withBasePath(normalizedRoute));
    setRoute(normalizedRoute);
  }

  if (route === "/register") return <RegisterPage navigate={navigate} />;
  if (route === "/login") return <LoginPage navigate={navigate} />;
  if (!isAuthed) return <LoginPage navigate={navigate} />;

  if (route === "/comunidad-tarjeta") return <CommunityCardPage navigate={navigate} />;
  if (userIsAdmin && route === "/admin/constructor") return <AdminCardBuilderPage navigate={navigate} />;
  if (userIsAdmin && route === "/admin/combinaciones") return <AdminCombinationsPage navigate={navigate} />;
  if (userIsAdmin && route === "/admin/cartas") return <AdminCardsPage navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}
