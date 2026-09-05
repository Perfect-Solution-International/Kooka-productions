import {
  AudioLines,
  Building2,
  Clapperboard,
  Gauge,
  LayoutPanelTop,
  Lightbulb,
  Monitor,
  Presentation,
  Projector,
  RadioTower,
  Route,
  SatelliteDish,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UsersRound,
  type LucideProps,
} from "lucide-react";

/**
 * Icons are referenced by name in `data/` so that plain data objects stay
 * serialisable across the server/client boundary.
 */
const iconMap = {
  sparkles: Sparkles,
  projector: Projector,
  monitor: Monitor,
  "audio-lines": AudioLines,
  lightbulb: Lightbulb,
  "layout-panel-top": LayoutPanelTop,
  "radio-tower": RadioTower,
  "settings-2": Settings2,
  "building-2": Building2,
  presentation: Presentation,
  "satellite-dish": SatelliteDish,
  clapperboard: Clapperboard,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  "users-round": UsersRound,
  route: Route,
} as const;

export type IconKey = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Component = iconMap[name] ?? Sparkles;
  return <Component aria-hidden {...props} />;
}
