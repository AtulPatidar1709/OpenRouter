import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiKeysTable } from "@/components/ApiKey/ApiKeysTable";
import { CreateApiKeyDialog } from "@/components/ApiKey/CreateApiKeyDialog";

export default function ApiKeysPage() {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-8">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your keys to access all models
          </p>
        </div>

        <Button onClick={() => setOpen((prev) => !prev)} className="shrink-0">
          Create API Key
        </Button>
      </div>

      {/* Table */}
      <ApiKeysTable />

      {/* Create API Key Modal */}
      <CreateApiKeyDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}
