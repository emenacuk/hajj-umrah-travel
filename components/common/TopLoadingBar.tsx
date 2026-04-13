"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// Configure NProgress defaults
// These can be overridden by global CSS
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.08,
  easing: "ease",
  speed: 400,
});

function TopLoadingBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathnameRef = useRef<string>("");

  useEffect(() => {
    // Intercept Link clicks
    const handleLinkClick = (e: MouseEvent) => {
      // Only handle left clicks without modifiers
      if (e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

      const target = e.target as HTMLElement;
      const link = target.closest("a[href]") as HTMLAnchorElement;

      if (!link || !link.href) return;

      // Ignore links with target="_blank" or download attribute
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      // Ignore specific triggers
      if (link.classList.contains("no-progress") || link.getAttribute("role") === "button") return;

      try {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);

        const isInternal = url.origin === currentUrl.origin;
        const isSamePath = url.pathname === currentUrl.pathname;
        const isSameSearch = url.search === currentUrl.search;
        const isHash = !!url.hash;

        if (isInternal && (!isSamePath || !isSameSearch) && !isHash) {
          NProgress.start();
        }
      } catch (err) {
        // Ignore invalid URLs
      }
    };

    // Complete loading when route changes
    if (prevPathnameRef.current !== pathname) {
      NProgress.done();
      prevPathnameRef.current = pathname;
    }

    // Listen for link clicks in bubble phase
    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
      NProgress.done(); // Ensure it finishes on unmount
    };
  }, [pathname, searchParams]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      NProgress.start();
      // Complete after a short delay since we don't have a reliable "render complete" event for popstate
      setTimeout(() => NProgress.done(), 400);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null;
}

/**
 * TopLoadingBar component provides a global NProgress loading bar 
 * for Next.js navigation. It intercepts internal link clicks and 
 * handles browser back/forward buttons.
 */
export default function TopLoadingBar() {
  return (
    <Suspense fallback={null}>
      <TopLoadingBarInner />
    </Suspense>
  );
}
