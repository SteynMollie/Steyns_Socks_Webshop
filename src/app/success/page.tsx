"use client";

import React from "react";
import Head from "next/head";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      <Head>
        <title>Success</title>
      </Head>
      <h1 className="text-4xl font-bold text-center text-black">Thanks for your order</h1>
      <img
        src="https://media.giphy.com/media/xThtaifbubG9C3HjKU/giphy.gif"
        alt="Success Celebration"
        className="mt-8"
      />
    </div>
  );
}