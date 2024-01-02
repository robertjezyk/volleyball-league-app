"use client";
import { Toaster } from "react-hot-toast";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export const PHProvider = ({ children }) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export const ToasterProvider = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};
