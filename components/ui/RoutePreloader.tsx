import { LoadingScreen } from "@/components/ui/LoadingScreen";

export function RoutePreloader() {
  return (
    <LoadingScreen
      className="kooka-route-preloader fixed inset-0 z-[100]"
    />
  );
}
