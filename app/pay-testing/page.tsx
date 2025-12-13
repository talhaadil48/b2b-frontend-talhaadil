"use client";

import { useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createMonthlyPayment,
  createLateralPayment,
  createRegistrationPayment,

} from "@/services/payments";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type PaymentType = "MONTHLY" | "LATERAL" | "REGISTRATION";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [paymentType, setPaymentType] = useState<PaymentType>("MONTHLY");
  const [partnershipLevel, setPartnershipLevel] = useState("DROP_SHIPPING");
  const [fromPartnership, setFromPartnership] = useState("");

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    try {
      // 1️⃣ Call backend to get client_secret for PaymentIntent
      let res;
      if (paymentType === "MONTHLY") {
        res = await createMonthlyPayment({
          partnership_level: partnershipLevel,
          plan: "1st",
          payment_type: "MONTHLY",
        });
      } else if (paymentType === "LATERAL") {
        res = await createLateralPayment({
          partnership_level: partnershipLevel,
          plan: "1st",
          payment_type: "LATERAL",
          from_partnership: fromPartnership,
        });
      } else if (paymentType === "REGISTRATION") {
        res = await createRegistrationPayment({
          partnership_level: partnershipLevel,
          plan: "1st",
          payment_type: "REGISTRATION",
          from_partnership: fromPartnership,
        });
        console.log("registration payment response", res);
      }

      const clientSecret = res.data.client_secret;

      // 2️⃣ Confirm payment with Stripe Elements
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: "Test User", email: "test@example.com" },
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        // 3️⃣ Update partnerships display

      }
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      if (detail && typeof detail === "object") {
        setMessage(JSON.stringify(detail, null, 2));
      } else {
        setMessage(detail || error.message || "Something went wrong");
      }
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Test Payments</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Payment Type</label>
        <select
          className="w-full border rounded p-2"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value as PaymentType)}
        >
          <option value="MONTHLY">Monthly</option>
          <option value="LATERAL">Lateral</option>
          <option value="REGISTRATION">Registration</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Partnership Level</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={partnershipLevel}
          onChange={(e) => setPartnershipLevel(e.target.value)}
        />
      </div>

      {(paymentType === "LATERAL" || paymentType === "REGISTRATION") && (
        <div className="mb-4">
          <label className="block mb-1 font-medium">From Partnership</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={fromPartnership}
            onChange={(e) => setFromPartnership(e.target.value)}
          />
        </div>
      )}

      <div className="mb-4 p-4 border rounded">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay"}
      </button>

      {message && <pre className="mt-4 text-red-600 whitespace-pre-wrap">{message}</pre>}
    </div>
  );
}

export default function TestPaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
