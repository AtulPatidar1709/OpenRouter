interface RazorpayFailedResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, unknown>;
  };
}

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }

  class Razorpay {
    constructor(options: RazorpayOptions);
    open(): void;
    on(
      event: "payment.failed",
      callback: (response: RazorpayFailedResponse) => void,
    ): void;
    on(
      event: "payment.success",
      callback: (response: RazorpaySuccessResponse) => void,
    ): void;
  }

  interface RazorpayOptions {
    key: string;
    amount?: number;
    currency?: string;
    name: string;
    description?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
      color?: string;
    };
    modal?: {
      ondismiss?: () => void;
    };
  }

  interface RazorpaySuccessResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
}

export {};
