"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/app/components/LoadingContext";

export default function RouteLoadingWatcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showLoading } = useLoading();
  const lastPathRef = useRef<string | null>(null);
  const lastSearchRef = useRef<string | null>(null);

  // Show loader on client navigation (route param or path change)
  useEffect(() => {
    const currentPath = pathname || "";
    const currentSearch = searchParams?.toString() || "";
    const pathChanged = lastPathRef.current !== null && lastPathRef.current !== currentPath;
    const searchChanged = lastSearchRef.current !== null && lastSearchRef.current !== currentSearch;

    if (pathChanged || searchChanged) {
      // Trigger immediately so overlay appears before new content
      showLoading("Traveling to adventure...");
    }

    lastPathRef.current = currentPath;
    lastSearchRef.current = currentSearch;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Show loader on refresh / hard navigations
  useEffect(() => {
    const beforeUnload = () => {
      showLoading("Traveling to adventure...");
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [showLoading]);

  // Proactively show loader on in-app anchor clicks
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      // Ignore externals and hashes
      if (!href || href.startsWith("http") || href.startsWith("#") || anchor.target === "_blank") return;
      showLoading("Traveling to adventure...");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true } as any);
  }, [showLoading]);

  return null;
}
