import {
  BarChart3,
  CandlestickChart,
  Code2,
  Megaphone,
  Palette,
  PenLine,
  Scale,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import type { CareerLane } from "@/data/roles";

/**
 * Icon per canonical career lane. Shared by the server-rendered lane grid and
 * the client-side hero rotator: icon components are functions, so they cannot
 * cross the server/client boundary as props — both sides import this map
 * directly instead.
 *
 * Presentation only. These icons carry no data meaning and deliberately use one
 * consistent blue treatment at the call site rather than a per-lane hue.
 */
export const laneIcons: Record<CareerLane, LucideIcon> = {
  "Community & Growth": Megaphone,
  "Content & Marketing": PenLine,
  "Product & Operations": Settings2,
  "Research & Data": BarChart3,
  "Technical & Security": Code2,
  "Creative": Palette,
  "Governance, Legal & People": Scale,
  "Trading & Finance Adjacent": CandlestickChart,
};
