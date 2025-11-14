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
    const handlePageFullyLoaded = () => {
      // Wait for everything including images to load
      if (document.readyState === 'complete') {
        // Add a small delay to ensure all content is painted
        requestAnimationFrame(() => {
          setTimeout(() => {
            hideLoading();
          }, 100);
        });
      }
    };

    // Check if already loaded
    if (document.readyState === 'complete') {
      handlePageFullyLoaded();
    } else {
      // Wait for the load event which fires after all resources are loaded
      window.addEventListener('load', handlePageFullyLoaded);
      
      // Fallback: also listen to readystatechange
      const handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
          handlePageFullyLoaded();
        }
      };
      document.addEventListener('readystatechange', handleReadyStateChange);

      return () => {
        window.removeEventListener('load', handlePageFullyLoaded);
        document.removeEventListener('readystatechange', handleReadyStateChange);
      };
    }
  }, [hideLoading]);
};
