import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Budget } from "./components/Budget";
import { Calendar } from "./components/Calendar";
import { Family } from "./components/Family";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "budget", Component: Budget },
      { path: "calendar", Component: Calendar },
      { path: "family", Component: Family },
    ],
  },
]);
