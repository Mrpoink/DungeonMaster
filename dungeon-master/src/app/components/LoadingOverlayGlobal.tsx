"use client";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";
import { useLoading } from "@/app/components/LoadingContext";

export default function LoadingOverlayGlobal() {
  const { isLoading, text } = useLoading();
  return isLoading ? <LoadingOverlay text={text} /> : null;
}
