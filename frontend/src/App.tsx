import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Users } from "./pages/Users";
import { ActiveTariffs } from "./pages/ActiveTariffs";
import { ArchiveTariffs } from "./pages/ArchiveTariffs";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login.tsx";
import { Registration } from "./pages/Registration.tsx";
import { ResetPassEnterEmail } from "./pages/ResetPassEnterEmail.tsx";
import { SuperAdmin } from "./pages/SuperAdmin.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { Confirm } from "./pages/Confirm.tsx";
import { SuccessfulAction } from "./pages/SuccessfulAction.tsx";
import {FailedAction} from "./pages/FailedAction.tsx";

function App() {
  const [activeLayout, setActiveLayout] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const noLayoutRoutes = [
      "/registration/:token",
      "/password-reset-confirmed/:token",
      "/registration",
      "/login",
      "/check-email",
      "/link-error",
      "/password-reset",
      "/verify-error",
      "/super-admin",
      "/confirm",
      "/successful-action",
      "/failed-action",
    ];

    // Проверяем, нужно ли скрывать Header для текущего маршрута
    const isNoLayoutPath = noLayoutRoutes.some((path) =>
      matchPath({ path, end: false }, location.pathname),
    );

    // Проверяем отдельно 404 страницу (путь "*")
    const is404 =
      location.pathname !== "/" &&
      !matchPath({ path: "*", end: true }, location.pathname);

    setActiveLayout(!isNoLayoutPath && !is404);
  }, [location]);
  return (
    <div className="h-screen flex flex-col overflow-y-hidden">
      {activeLayout && (
        <>
          <Header />
        </>
      )}
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/active_tariffs" element={<ActiveTariffs />} />
        <Route path="/archive_tariffs" element={<ArchiveTariffs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/*<Route path="/password-reset" element={<ResetPassEnterEmail />} />*/}
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/successful-action" element={<SuccessfulAction />} />
        <Route path="/failed-action" element={<FailedAction />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
