import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Copy, MoreVertical } from "lucide-react";
import { useApiKeys, useApiKeysQuery } from "@/hooks/apiKeys.hook";
import { toast } from "react-toastify";

export const ApiKeysTable = () => {
  const { apiKeys, isApiKeysError, isApiKeysLoading } = useApiKeysQuery();
  const { deleteApiKey, updateApiKey, isDeleteLoading, isUpdateLoading } =
    useApiKeys();

  if (isApiKeysLoading) {
    return (
      <div className="text-sm text-muted-foreground">Loading API keys...</div>
    );
  }

  if (isApiKeysError) {
    return (
      <div className="text-sm text-destructive">Failed to load API keys</div>
    );
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied");
  };

  return (
    <>
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 w-10">
                <Checkbox />
              </th>
              <th className="p-4 text-left">API Key</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Used</th>
              <th className="p-4">Credits Used</th>
              <th className="p-4 w-10" />
            </tr>
          </thead>

          <tbody>
            {apiKeys.map((k) => (
              <tr key={k.id} className="border-t hover:bg-muted/40 transition">
                <td className="p-4">
                  <Checkbox />
                </td>

                <td className="p-4">
                  <div className="font-medium">{k.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground truncate max-w-[220px]">
                      {k.apiKey}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => copyKey(k.apiKey)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>

                <td className="p-4">
                  {k.disabled ? (
                    <Badge variant="destructive">Disabled</Badge>
                  ) : (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </td>

                <td className="p-4">
                  {k.lastUsed
                    ? new Date(k.lastUsed).toLocaleDateString()
                    : "Never"}
                </td>

                <td className="p-4">{k.credisConsumed}</td>

                <td className="p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={isUpdateLoading}
                        onClick={() =>
                          updateApiKey({ id: k.id, disabled: !k.disabled })
                        }
                      >
                        Disable / Enable
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={isDeleteLoading}
                        onClick={() => deleteApiKey({ id: k.id })}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {apiKeys.map((k) => (
          <div key={k.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{k.name}</p>
                <p className="text-xs text-muted-foreground break-all">
                  {k.apiKey}
                </p>
              </div>
              <Checkbox />
            </div>

            <div className="flex items-center gap-2">
              {k.disabled ? (
                <Badge variant="destructive">Disabled</Badge>
              ) : (
                <Badge variant="secondary">Active</Badge>
              )}

              <Button
                size="icon"
                variant="ghost"
                onClick={() => copyKey(k.apiKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Last Used</p>
                <p>{k.lastUsed ? "Recently" : "Never"}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Credits Used</p>
                <p>{k.credisConsumed}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    disabled={isUpdateLoading}
                    onClick={() =>
                      updateApiKey({ id: k.id, disabled: !k.disabled })
                    }
                  >
                    Disable / Enable
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    disabled={isDeleteLoading}
                    onClick={() => deleteApiKey({ id: k.id })}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
