"use client";

import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [count, setCount] = useState(0);
  const { cartTotal, setCartTotal } = useCart();
  const price = 10; // Price of the product

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);
  const addToCart = () => {
    const newTotal = cartTotal + count * price;
    console.log("Adding to cart. Count:", count, "New Total:", newTotal);
    setCartTotal(newTotal);
  };
  const clearCart = () => {
    console.log("Clearing cart");
    setCartTotal(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>My new title</title>
        <meta name="description" content="My description" />
      </Head>
      <div className="absolute top-4 right-4">
        <Link href="/checkout">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Cart Total: €{cartTotal}.00
          </button>
        </Link>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
        >
          Clear Cart
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center text-black">
        Steyns Socks Webshop
      </h1>
      <h2 className="text-2xl text-center mt-4 text-black">
        socking awesome
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
        <img
          src="https://img.freepik.com/premium-photo/blank-white-socks-isolated-white-background_373676-1571.jpg"
          alt="sock"
          className="w-32 h-32 object-cover mb-4"
        />
        <h2 className="text-2xl font-bold mb-2 text-black">sock</h2>
        <p className="text-gray-700 mb-4 text-black">€{price}</p>
        <div className="flex items-center mb-4 text-black">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            -
          </button>
          <span className="mx-4">{count}</span>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            +
          </button>
        </div>
        <p className="text-xl font-bold text-black">
          Subtotal: €{count * price}.00
        </p>
        <button
          onClick={addToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}