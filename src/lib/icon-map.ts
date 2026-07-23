import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Smartphone,
  Wrench,
  Globe,
  Settings,
  Database,
  Rocket,
  Server,
  Cpu,
  Layers,
  Cloud,
  Terminal,
  GitBranch,
  Shield,
  Zap,
  Bug,
  Package,
  PenTool,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  Wrench,
  Globe,
  Settings,
  Database,
  Rocket,
  Server,
  Cpu,
  Layers,
  Cloud,
  Terminal,
  GitBranch,
  Shield,
  Zap,
  Bug,
  Package,
  PenTool,
};

export function getIcon(name: string | null | undefined): LucideIcon {
  if (!name) return Rocket;
  return map[name] ?? Rocket;
}
