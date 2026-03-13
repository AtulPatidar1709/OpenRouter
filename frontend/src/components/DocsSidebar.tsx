import { docsNavigation } from "@/config/docs.config";
import { NavLink } from "react-router-dom";

export default function DocsSidebar() {
  return (
    <aside className="w-[240px] border-r border-neutral-800 py-10 px-2">
      <h2 className="text-lg font-semibold mb-8 text-white">Documentation</h2>

      {docsNavigation.map((section) => (
        <div key={section.title} className="mb-8">
          <p className="text-xs text-gray-500 uppercase mb-3">
            {section.title}
          </p>

          <div className="space-y-1">
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block text-sm px-2 py-1 rounded-md transition ${
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-gray-400 hover:text-white hover:bg-neutral-900"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
