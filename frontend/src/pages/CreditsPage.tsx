import AddCreditsDialog from "@/components/AddCreditsDialog";
import SkeletonLoader from "@/components/skeletons/Order_Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserQuery } from "@/hooks/auth.hooks";
import { useWalletQuery } from "@/hooks/wallet.hook";
import { addRazorPayQueryScript } from "@/lib/addRazorPayScript";
import { useEffect } from "react";

const CreditsPage = () => {
  const { user, isUserLoading, isUserError } = useUserQuery();

  const { walletTransaction, walletisError, walletisLoading } =
    useWalletQuery();

  useEffect(() => {
    addRazorPayQueryScript();
  }, []);

  if (isUserLoading || walletisLoading) return <SkeletonLoader />;

  if (isUserError || walletisError) return <div>Error in Fetching User.</div>;

  const credits = user.credits / 100;

  console.log("User ,", user);
  console.log("User Credits ,", user.credits);
  console.log("Credits ,", credits);

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
              <AddCreditsDialog />

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
          <CardContent className="gap-2 max-h-60 flex flex-col overflow-y-scroll">
            <Separator className="mb-4" />
            {!walletTransaction && (
              <p className="text-sm text-muted-foreground text-center">
                No results
              </p>
            )}
            {walletTransaction?.map((tran: any) => {
              if (tran.status === "CREATED") return;
              return (
                <div className="flex p-3 font-semibold bg-gray-200 flex-col sm:flex-row rounded-xl justify-between">
                  <h1>Balance - {tran?.balanceAfter / 100}</h1>
                  <h1>
                    {tran.metadata?.model
                      ? tran.metadata.model
                      : `Credits Added - ${tran.amount}`}
                  </h1>
                  <h1>
                    {tran.metadata?.tokens
                      ? `Tokens ${tran.metadata.tokens}`
                      : "Credits Added"}
                  </h1>
                  <h1
                    className={
                      tran.status === "SUCCESS"
                        ? "text-green-400 font-bold"
                        : "text-red-400 font-bold"
                    }
                  >
                    {tran.status}
                  </h1>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditsPage;
