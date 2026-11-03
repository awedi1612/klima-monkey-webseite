import { Snowflake, Sun, BatteryCharging, HandCoins, BadgePercent, CalendarClock, Wind, Wrench, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Wrench,
  Snowflake,
  Sun,
  BatteryCharging,
  HandCoins,
  BadgePercent,
  CalendarClock,
  Wind,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Snowflake;
  return <Icon className={className} />;
}
