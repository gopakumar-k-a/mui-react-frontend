import FormLayoutPage from "pages/FormLayoutPage";
import React, { lazy, Suspense } from "react";
import CustomLoader from "components/loader/CircularIndeterminate";
const HomePage = lazy(() => import("./pages/HomePage"));
const AuthenticationPage = lazy(() => import("./pages/AuthenticationPage"));
// const Error404 = lazy(() => import("./pages/Error404"));
// const Loading = () => <h1>Loading...</h1>;
interface Route {
  path: string;
  element: React.ReactNode;
  isPrivate: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<CustomLoader />}>
        <HomePage />
      </Suspense>
    ),
    isPrivate: true,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<CustomLoader />}>
        <AuthenticationPage />
      </Suspense>
    ),
    isPrivate: false,
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<CustomLoader />}>
        <AuthenticationPage />
      </Suspense>
    ),
    isPrivate: false,
  },
  {
    path: "/form-layout",
    element: (
      <Suspense fallback={<CustomLoader />}>
        <FormLayoutPage />
      </Suspense>
    ),
    isPrivate: true,
  },
];

export default routes;
