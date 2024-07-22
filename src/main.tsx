import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SignInPage from "./auth/sign-in";
import HomePage from "./home";
import DashboardPage from "./dashboard";
import { ClerkProvider } from "@clerk/clerk-react";
import EditResume from "./dashboard/resume/[resumeId]/EditResume";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children: [ 
      {
        path: "/dashboard",
        element: <DashboardPage />
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />
      }
    ]
  },
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
    <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
