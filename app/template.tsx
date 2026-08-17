import type { ReactNode } from "react";
import { RoutePreloader } from "@/components/ui/RoutePreloader";

export default function Template({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <RoutePreloader />
      {children}
    </>
  );
}
