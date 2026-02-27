import { Button } from "@/components/ui/button";
import { useUserQuery } from "@/hooks/auth.hooks";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUserQuery();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <Link to={"/"}>
          <h1 className="font-bold text-lg">OpenRouter Clone</h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link to={"/models"} className="text-sm text-muted-foreground">
            Models
          </Link>
          <Link to={"/pricing"} className="text-sm text-muted-foreground">
            Pricing
          </Link>
          {!user && (
            <Button>
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
