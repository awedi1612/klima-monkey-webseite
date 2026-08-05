import { Snowflake, Sun, BatteryCharging, HandCoins, BadgePercent, CalendarClock, Wind, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = {
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
