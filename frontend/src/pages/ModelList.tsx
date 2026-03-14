"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useModelsQuery } from "@/hooks/models.hook";
import { toast } from "react-toastify";
import SkeletonLoader from "@/components/skeletons/Order_Loader";

export default function ModelList() {
  const { models, isModelsLoading } = useModelsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isModelsLoading) return <SkeletonLoader />;
  if (!models || models.length === 0) return <div>No Models Found</div>;

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-12 gap-8">
      <main className="flex-1 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Models</h1>
          <p className="text-muted-foreground">
            {filteredModels.length} models
          </p>

          <input
            type="search"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 max-w-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul className="space-y-6">
          {filteredModels.map((model) => (
            <li key={model.id} className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {model.name}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(model.slug);
                    toast.success("Copied Successfully");
                  }}
                  aria-label="Copy Model ID"
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </h2>
              <div className="mt-2 flex flex-col  sm:flex-row justify-between gap-4 text-xs text-gray-500">
                <p className="text-muted-foreground mt-1 max-w-3xl">
                  {model.slug}
                </p>
                <div className="flex gap-3 font-semibold">
                  <span>
                    {model.modelProviderMappings[0].inputTokenCost}/1k Input
                    Tokens
                  </span>
                  <span>
                    {model.modelProviderMappings[0].outputTokenCost}/1K Output
                    Tokens
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
                <span>
                  by <span className="font-medium">{model.company.name}</span>
                </span>
                <span>{model.company.website}</span>
                <span className="ml-auto text-sm font-semibold text-gray-400">
                  {model.company.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
