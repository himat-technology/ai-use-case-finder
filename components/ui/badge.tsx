import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "default" &&
          "border-transparent bg-gradient-to-r from-teal-600 to-cyan-600 text-white",
        variant === "secondary" &&
          "border-transparent bg-fuchsia-50 text-fuchsia-800",
        variant === "outline" && "border-cyan-300 text-cyan-800",
        variant === "success" &&
          "border-transparent bg-emerald-100 text-emerald-800",
        variant === "warning" &&
          "border-transparent bg-amber-100 text-amber-900",
        className
      )}
      {...props}
    />
  );
}
