import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserQuery } from "@/hooks/auth.hooks";

const CreditsPage = () => {
  const { user, isUserLoading, isUserError } = useUserQuery();

  if (isUserLoading) return <div>Loading...</div>;

  if (isUserError) return <div>Error in Fetching User.</div>;

  const credits = user.credits / 100;

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold">Credits</h1>
        </div>

        {/* Balance Card */}
        <Card>
          <CardContent className="flex items-center py-6">
            <span className="text-3xl font-semibold text-muted-foreground">
              ₹
            </span>
            <span className="ml-2 text-4xl font-bold text-orange-400">
              {credits}
            </span>
          </CardContent>
        </Card>

        {/* Buy Credits + Auto Top-Up */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Buy Credits */}
          <Card>
            <CardHeader>
              <CardTitle>Buy Credits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Add Credits</Button>

              <div className="text-sm text-muted-foreground">
                <a
                  href="#"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  View Usage
                </a>
              </div>

              <p className="text-xs text-muted-foreground">
                Need invoicing?{" "}
                <span className="underline underline-offset-4">
                  Contact sales for an Enterprise plan
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              No results
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditsPage;
