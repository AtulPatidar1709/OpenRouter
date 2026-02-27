import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

const keys = [
  {
    name: "CodeGyan_Ecommerce",
    key: "sk-or-v1-ba0...103",
    expires: "Never",
    lastUsed: "Never",
    usage: "$0.000",
    limit: "$1",
  },
  {
    name: "Financial Advisor App",
    key: "sk-or-v1-c88...b15",
    expires: "Never",
    lastUsed: "1 month ago",
    usage: "$0.057",
    limit: "$1",
  },
];

export const ApiKeysTable = () => {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-3 w-10">
                <Checkbox />
              </th>
              <th className="p-3 text-left">Key</th>
              <th className="p-3">Expires</th>
              <th className="p-3">Last Used</th>
              <th className="p-3">Usage</th>
              <th className="p-3">Limit</th>
              <th className="p-3 w-10" />
            </tr>
          </thead>

          <tbody>
            {keys.map((k) => (
              <tr key={k.name} className="border-t">
                <td className="p-3">
                  <Checkbox />
                </td>
                <td className="p-3">
                  <div className="font-medium">{k.name}</div>
                  <div className="text-xs text-muted-foreground">{k.key}</div>
                </td>
                <td className="p-3">{k.expires}</td>
                <td className="p-3">{k.lastUsed}</td>
                <td className="p-3">{k.usage}</td>
                <td className="p-3">
                  {k.limit}
                  <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">
                    TOTAL
                  </span>
                </td>
                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rotate Key</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
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

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {keys.map((k) => (
          <div key={k.name} className="border rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{k.name}</p>
                <p className="text-xs text-muted-foreground">{k.key}</p>
              </div>
              <Checkbox />
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Expires</p>
                <p>{k.expires}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Used</p>
                <p>{k.lastUsed}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Usage</p>
                <p>{k.usage}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Limit</p>
                <p>{k.limit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
