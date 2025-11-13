'use client'
import { useRouter } from 'next/navigation';
import { useLoading } from '@/app/components/LoadingContext';
import { useEffect } from 'react';

export const useLoadingNavigation = () => {
  const router = useRouter();
  const { showLoading } = useLoading();

  const navigateWithLoading = (path: string, text: string = "Traveling to adventure...") => {
    showLoading(text); // Show loading without duration - pages will hide it when ready
    
    // Use requestAnimationFrame for optimal timing - ensures loading renders before navigation
    requestAnimationFrame(() => {
      router.push(path);
    });
  };

  return { navigateWithLoading };
};

export const usePageLoaded = () => {
  const { hideLoading } = useLoading();

  useEffect(() => {
    // Check if document is already fully loaded (for cached/instant navigation)
    if (document.readyState === 'complete') {
      // Page is already loaded, hide immediately after next paint
      requestAnimationFrame(() => {
        hideLoading();
      });
    } else {
      // Wait for page to be fully rendered
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          hideLoading();
        });
      }, 200); // Balanced timing for slower loads

      return () => clearTimeout(timer);
    }
  }, [hideLoading]);
};
