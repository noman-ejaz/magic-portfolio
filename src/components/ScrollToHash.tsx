"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollToHash() {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname must re-trigger the scroll on client-side navigation
  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' symbol
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]);

  return null;
}
