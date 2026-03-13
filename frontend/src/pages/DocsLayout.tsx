import DocsSidebar from "@/components/DocsSidebar";
import { Outlet } from "react-router-dom";

export default function DocsLayout() {
  return (
    <div className="flex min-h-screen text-black">
      <DocsSidebar />

      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl px-2 py-2">
          <article className="docs">
            <Outlet />
          </article>
        </div>
      </main>
    </div>
  );
}
