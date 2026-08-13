import {
  AudioLines,
  Building2,
  Gauge,
  LayoutPanelTop,
  Lightbulb,
  Monitor,
  Projector,
  RadioTower,
  Route,
  Settings2,
  ShieldCheck,
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
