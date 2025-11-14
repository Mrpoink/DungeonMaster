"use client";
import { useEffect } from "react";
import { useLoading } from "@/app/components/LoadingContext";

export default function ReadyOnMount() {
  const { hideLoading } = useLoading();

  // When this component mounts (after route has rendered on client), hide loader
  useEffect(() => {
    // Defer to next paint to ensure DOM is ready
    requestAnimationFrame(() => hideLoading());
  }, [hideLoading]);

  return null;
}
