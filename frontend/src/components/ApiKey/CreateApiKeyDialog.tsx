import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  "gpt-4o",
  "gpt-4o-mini",
  "claude-3-opus",
  "claude-3-sonnet",
  "mixtral-8x7b",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateApiKeyDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">API Key Name</label>
            <Input placeholder="e.g. Ecommerce Backend" />
          </div>

          <div>
            <label className="text-sm font-medium">Model Access</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Create Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
