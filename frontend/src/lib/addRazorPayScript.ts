export function addRazorPayQueryScript() {
  const razorpayScript = document.querySelector("#razorpay-script");
  if (razorpayScript) return;
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.id = "razorpay-script";
  script.async = true;
  document.body.append(script);
}
