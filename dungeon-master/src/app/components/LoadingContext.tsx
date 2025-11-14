"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoadingState {
  isLoading: boolean;
  text: string;
  showLoading: (text: string, duration?: number) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingState | undefined>(undefined);

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [text, setText] = useState("Traveling to adventure...");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Show loading screen whenever route changes (including browser back/forward)
  useEffect(() => {
    setText("Traveling to adventure...");
    setIsLoading(true);
  }, [pathname]);

  const showLoading = (newText: string, duration?: number) => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setText(newText);
    setIsLoading(true);
    
    // Only set timeout if duration is provided
    if (duration) {
      const newTimeoutId = setTimeout(() => {
        setIsLoading(false);
      }, duration);
      setTimeoutId(newTimeoutId);
    }
  };

  const hideLoading = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, text, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
