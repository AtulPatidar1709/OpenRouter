import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useApiKeys } from "@/hooks/apiKeys.hook";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateApiKeyDialog = ({ open, onOpenChange }: Props) => {
  const [name, setName] = useState("");
  const { createApiKey, isCreateLoading } = useApiKeys();

  const handleSubmit = () => {
    onOpenChange(!open);
    createApiKey({ name });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="flex pb-1 text-sm font-medium">
              API Key Name
            </label>
            <Input
              placeholder="e.g. Ecommerce Backend"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isCreateLoading || name.length < 4}
          >
            {isCreateLoading ? "Creating..." : "Create Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
