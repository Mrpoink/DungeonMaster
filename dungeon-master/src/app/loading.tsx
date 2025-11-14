import React from "react";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";

export default function Loading() {
  // Shown by Next.js App Router during route segment loading
  return <LoadingOverlay text="Traveling to adventure..." />;
}
