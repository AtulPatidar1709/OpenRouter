"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { usePaymentInitiate } from "@/lib/initiatePayment";

const AddCreditsDialog = () => {
  const [amount, setAmount] = useState<number | "">("");
  const { handleCheckout, paymentIsLoading } = usePaymentInitiate();

  const handlePayment = () => {
    if (!amount) return;

    handleCheckout(amount);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add Credits</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Credits</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount Input */}
          <Input
            type="number"
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          {/* Quick Select Buttons */}
          <div className="flex gap-2">
            {[100, 500, 1000].map((value) => (
              <Button
                key={value}
                type="button"
                variant="outline"
                onClick={() => setAmount(value)}
              >
                ₹{value}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={!amount || paymentIsLoading}
            onClick={handlePayment}
            className="w-full"
          >
            {paymentIsLoading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCreditsDialog;
