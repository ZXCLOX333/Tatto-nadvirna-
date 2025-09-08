import { useEffect, useState } from "react";

export function useIsMobile(breakpointPx: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const handler = () => setIsMobile(query.matches);
    handler();
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, [breakpointPx]);

  return isMobile;
}
