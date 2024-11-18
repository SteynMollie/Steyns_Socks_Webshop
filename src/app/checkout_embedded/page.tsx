"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import Head from "next/head";
import Link from "next/link";
import "../globals.css"; // Import the styles

const CheckoutEmbedded = () => {
  const { cartTotal } = useCart();
  const mollieRef = useRef<any>(null); // Use a ref to store the Mollie instance
  const formRef = useRef<HTMLFormElement>(null); // Ref for the form
  const cardComponentRef = useRef<any>(null); // Ref for the card component
  const [fieldsMounted, setFieldsMounted] = useState(false); // State to track if fields are mounted

  useEffect(() => {
    const loadMollie = () => {
      if (!document.querySelector('script[src="https://js.mollie.com/v1/mollie.js"]')) {
        const script = document.createElement("script");
        script.src = "https://js.mollie.com/v1/mollie.js";
        script.onload = () => {
          mollieRef.current = window.Mollie("pfl_s4yno952zj", {
            locale: "en_US",
            testmode: true,
          });
  
          const options = {
            styles: {
              base: {
                color: "rgba(0, 0, 0, 0.8)",
              },
            },
          };
          const cardComponent = mollieRef.current.createComponent("card", options);
          cardComponent.mount(".form-fields");
          cardComponentRef.current = cardComponent;
          setFieldsMounted(true); // Set fieldsMounted to true after mounting
        };
        script.onerror = () => {
          console.error("Failed to load Mollie script");
        };
        document.head.appendChild(script);
      } else {
        mollieRef.current = window.Mollie("pfl_s4yno952zj", {
          locale: "en_US",
          testmode: true,
        });
  
        const options = {
          styles: {
            base: {
              color: "rgba(0, 0, 0, 0.8)",
            },
          },
        };
        const cardComponent = mollieRef.current.createComponent("card", options);
        cardComponent.mount(".form-fields");
        cardComponentRef.current = cardComponent;
        setFieldsMounted(true); // Set fieldsMounted to true after mounting
      }
    };
  
    if (!mollieRef.current) {
      loadMollie();
    }
  }, []);

  const disableForm = () => {
    const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = true;
  };

  const enableForm = () => {
    const submitButton = document.getElementById("submit-button") as HTMLButtonElement;
    submitButton.disabled = false;
  };

  const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formError = document.getElementById("form-error") as HTMLDivElement;
    disableForm();
  
    // Reset possible form error
    formError.textContent = "";
  
    try {
      const { token, error } = await mollieRef.current.createToken();
  
      if (error) {
        enableForm();
        formError.textContent = error.message;
        return;
      }
  
      const tokenInput = document.createElement("input");
      tokenInput.setAttribute("name", "token");
      tokenInput.setAttribute("type", "hidden");
      tokenInput.setAttribute("value", token);
      formRef.current.appendChild(tokenInput);
  
      // Submit the form data to your API route
      console.log("Fetching URL: /api/create-payment"); // Log the URL being fetched
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer <<App access-token>>`,
        },
        body: JSON.stringify({
          cardToken: token,
          amount: {
            currency: "EUR",
            value: cartTotal.toFixed(2),
          },
          description: "Embedded Payment for socks",
          redirectUrl: "https://example.com",
          webhookUrl: "https://webhook.site/bcc911d7-504e-40a6-94ba-b0ddef4f9fdf",
          profileId: "pfl_s4yno952zj",
          testmode: true
        }),
      });
      

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }
  
      const data = await response.json();
      window.location.href = "/success";
    } catch (err) {
      console.error("Token creation error:", err);
      formError.textContent = "An error occurred. Please try again.";
      enableForm();
    }
  };

  return (
    <>
      <Head>
        <title>My Checkout</title>
      </Head>
      <div className="wrapper">
        <div className="absolute top-4 left-4">
          <Link href="/checkout">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Previous Page</button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-center text-black">Embedded Checkout</h1>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-70">
          <h1 className="text-4xl font-bold text-center text-black">Cart total: €{cartTotal}.00</h1>

          <form ref={formRef} onSubmit={handlePaymentSubmit} className="mt-4" id="mcForm">
            <div className="form-fields"></div>
            <div id="form-error" className="field-error text-red-500 text-sm mb-2"></div>

            <button id="submit-button" type="submit" className="submit-button px-4 py-2 bg-green-500 text-white rounded-lg">
              Pay Now
            </button>
          </form>

          <div className="absolute bottom-4 text-sm text-gray-600">Checkout by SJ-Solutions</div>
        </div>
      </div>
    </>
  );
};

export default CheckoutEmbedded;