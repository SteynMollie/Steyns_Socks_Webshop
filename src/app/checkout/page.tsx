"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { cartTotal } = useCart();
  const [error, setError] = useState("");

  const handleHostedCheckout = async () => {
    const paymentData = {
      description: "Hosted Payment for socks", // Maybe add value by dividing the total by 10.
      amount: {
        currency: "EUR",
        value: cartTotal.toFixed(2), // Ensure string and 2 decimal places.
      },
      redirectUrl: "https://example.com",
      profileId: "pfl_s4yno952zj",
      testmode: true
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer <<App access-token>>",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Payment created:", data);

      // Redirect to the Mollie checkout URL
      window.location.href = data._links.checkout.href;
    } catch (error) {
      console.error("Error creating payment:", error);
      setError("There was an error processing your payment. Please try again.");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="absolute top-4 left-4">
        <Link href="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Go back to Home
          </button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-center text-black">Checkout</h1>
      <p className="text-xl text-center mt-4 text-black">Let's proceed to checkout!</p>
      <p className="text-xl text-center mt-4 text-black">Total Amount: €{cartTotal}.00</p>
      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
      <div className="flex space-x-4 mt-8">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleHostedCheckout}
        >
          Hosted Checkout
        </button>
        <Link href="/checkout_embedded">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Embedded Checkout
          </button>
        </Link>
        <Link href="/checkout_embedded_2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Friendly embedded Checkout
          </button>
        </Link>
      </div>
      <div className="absolute bottom-4 text-sm text-gray-600">
        Checkout by SJ-Solutions
      </div>
    </div>
  );
}