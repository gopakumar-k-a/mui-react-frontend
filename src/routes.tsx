import React, { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthenticationPage = lazy(() => import("./pages/AuthenticationPage"));
const Loading = () => <h1>Loading...</h1>;
interface Route {
  path: string;
  element: React.ReactNode;
  isPrivate: boolean;
}

const routes: Route[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    ),
    isPrivate: true,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationPage />
      </Suspense>
    ),
    isPrivate: false,
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationPage />
      </Suspense>
    ),
    isPrivate: false,
  },
];

export default routes;
