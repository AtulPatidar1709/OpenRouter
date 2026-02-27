import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { UserLayout } from "./user.routes.js";
import { AuthLayout } from "./login.routes.js";
import { RouteGuard } from "./guards.js";
import Home from "@/pages/Home.js";
import { Loader_Skeleton } from "@/components/skeletons/Loader_Skeleton.js";
import Pricing from "@/pages/Pricing.js";
import ModelList from "@/pages/ModelList.js";
import ApiKeysPage from "@/pages/ApiKeysPage.js";

const LogIn = lazy(() => import("@/pages/LogIn.js"));
const SignUp = lazy(() => import("@/pages/SignUp.js"));
const VerifyOtp = lazy(() => import("@/pages/VerifyOtp.js"));

const NotFoundPage = lazy(() => import("@/components/NotFoundPage.js"));

export const routerPaths = createBrowserRouter([
  /* ================= 🌍 PUBLIC ================= */
  {
    element: <UserLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        index: true,
        path: "/pricing",
        element: <Pricing />,
      },
      {
        index: true,
        path: "models",
        element: <ModelList />,
      },
    ],
  },

  /* ================= 🚪 GUEST ================= */
  {
    element: <RouteGuard guestOnly />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <LogIn />{" "}
              </Suspense>
            ),
          },
          {
            path: "/signup",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <SignUp />{" "}
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  /* ================= 🚪 Login - Not Verified ================= */
  {
    element: <RouteGuard auth />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/verify-otp",
            element: (
              <Suspense fallback={<Loader_Skeleton />}>
                {" "}
                <VerifyOtp />{" "}
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  /* ================= 🚪 Login - Verified ================= */
  {
    element: <RouteGuard auth verified />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            path: "api-keys",
            element: <ApiKeysPage />,
          },
        ],
      },
    ],
  },

  /* ================= ❌ FALLBACK ================= */
  {
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader_Skeleton />}>
            {" "}
            <NotFoundPage />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);
