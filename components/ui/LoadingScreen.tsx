import { LogoLoader } from "@/components/ui/LogoLoader";
import { cn } from "@/lib/utils";

export function LoadingScreen({
  className,
}: {
  readonly className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-h-[100svh] place-items-center overflow-hidden bg-kooka-void px-6",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,176,32,0.08),transparent_38%)]"
        aria-hidden="true"
      />
      <LogoLoader className="relative" size="min(18rem, 62vw)" />
    </div>
  );
}
