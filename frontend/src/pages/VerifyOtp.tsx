import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { useUserQuery } from "../hooks/auth.hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useOtp } from "../hooks/useOtp";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const { user } = useUserQuery();
  const queryClient = useQueryClient();

  const { verifyOtp, resendOtp, isVerifying, isResending } = useOtp();

  const handleVerify = () => {
    if (otp.length !== 6) return;

    verifyOtp(otp, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });
  };

  const handleResend = () => {
    resendOtp(user.email);
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Verify your login</CardTitle>
        <CardDescription>
          Enter the verification code we sent to your email address:{" "}
          <span className="font-medium">
            {user?.email || "example@gmail.com"}
          </span>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <button
              onClick={handleResend}
              disabled={isResending ? true : false}
            >
              <Button aria-label="Resend OTP" variant="outline" size="xs">
                <RefreshCwIcon />
                Resend Code
              </Button>
            </button>
          </div>
          <InputOTP
            disabled={isVerifying}
            maxLength={6}
            value={otp}
            onChange={setOtp}
            id="otp-verification"
            required
            aria-label="Verify OTP"
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <button
            type="submit"
            onClick={handleVerify}
            disabled={isVerifying || otp.length !== 6}
          >
            <Button className="w-full">
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </button>
          <div className="text-muted-foreground text-sm">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4 transition-colors"
            >
              Contact support
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default VerifyOtp;
