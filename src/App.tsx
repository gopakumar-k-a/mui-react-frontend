import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRouteGuard from "components/RouteGuards/PublicRouteGuard";
import PrivateRouteGuard from "components/RouteGuards/PrivateRouteGuard";
import routes from "./routes";
import { useAuth } from "hooks/useAuth";
import Error404 from "./pages/Error404";
// import { ReCaptchaProvider } from "provider/ReCaptchaProvider";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    // <ReCaptchaProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            if (route.isPrivate) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRouteGuard isAuthenticated={isAuthenticated}>
                      {route.element}
                    </PrivateRouteGuard>
                  }
                />
              );
            } else {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PublicRouteGuard isAuthenticated={isAuthenticated}>
                      {route.element}
                    </PublicRouteGuard>
                  }
                />
              );
            }
          })}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    // </ReCaptchaProvider>
  );
}

export default App;
