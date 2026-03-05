import Razorpay from "razorpay";
import { config } from "../config/config.js";

export const rzp = new Razorpay({
  key_id: config.rzpTestApiKey!,
  key_secret: config.rzpTestKeySecret!,
});

export const createRazorpayOrder = async (amount: number, userId: string) => {
  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    notes: {
      userId: userId.toString(),
    },
  };
  const order = await rzp.orders.create(options);
  return order;
};
