import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiKeysTable } from "@/components/ApiKey/ApiKeysTable";
import { CreateApiKeyDialog } from "@/components/ApiKey/CreateApiKeyDialog";

export default function ApiKeysPage() {
  const [open, setOpen] = useState(false);

  return (
    <section className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header (below your global header) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage your keys to access all models
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>Create API Key</Button>
      </div>

      {/* Table */}
      <ApiKeysTable />

      {/* Create API Key Modal */}
      <CreateApiKeyDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}
