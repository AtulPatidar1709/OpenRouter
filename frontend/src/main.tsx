import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routerPaths } from "./routes/routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <div className="bg-[#ffff] flex justify-center items-center">
      <RouterProvider router={routerPaths} />
    </div>
    <ToastContainer />
  </QueryClientProvider>,
);
