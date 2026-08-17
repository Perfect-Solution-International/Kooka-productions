import { LogoLoader } from "@/components/ui/LogoLoader";


export default function Loading() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center overflow-hidden px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-kooka-void/80"
        aria-hidden="true"
      />
      <LogoLoader className="relative" size="min(18rem, 62vw)" />
    </div>
  );
}
