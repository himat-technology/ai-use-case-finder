"use client";

import { HIMAT } from "@/lib/brand";
import { cn } from "@/lib/utils";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H6v4h3v7h4v-7h3.1l.9-4H13V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.65 1.65 0 1 0 5.1 7.3 1.65 1.65 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.5-.6-2.5-1.9-2.5-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s.1-9.3 0-10.5h2.8v1.7c.4-.7 1.3-1.9 3.2-1.9 2.3 0 4.1 1.5 4.1 4.8V20z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zm6.1-8.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.4c-2.3 0-2.6 0-3.5.1-.9 0-1.5.2-2 .4a4 4 0 0 0-1.5 1 4 4 0 0 0-1 1.5c-.2.5-.3 1.1-.4 2-.1.9-.1 1.2-.1 3.5s0 2.6.1 3.5c0 .9.2 1.5.4 2a4 4 0 0 0 1 1.5 4 4 0 0 0 1.5 1c.5.2 1.1.3 2 .4.9.1 1.2.1 3.5.1s2.6 0 3.5-.1c.9 0 1.5-.2 2-.4a4 4 0 0 0 1.5-1 4 4 0 0 0 1-1.5c.2-.5.3-1.1.4-2 .1-.9.1-1.2.1-3.5s0-2.6-.1-3.5c0-.9-.2-1.5-.4-2a4 4 0 0 0-1-1.5 4 4 0 0 0-1.5-1c-.5-.2-1.1-.3-2-.4-.9-.1-1.2-.1-3.5-.1zm0 1.5c2.3 0 2.5 0 3.4.1.8 0 1.2.2 1.5.3.4.1.6.3.9.6.3.3.5.5.6.9.1.3.3.7.3 1.5.1.9.1 1.1.1 3.4s0 2.5-.1 3.4c0 .8-.2 1.2-.3 1.5-.1.4-.3.6-.6.9-.3.3-.5.5-.9.6-.3.1-.7.3-1.5.3-.9.1-1.1.1-3.4.1s-2.5 0-3.4-.1c-.8 0-1.2-.2-1.5-.3-.4-.1-.6-.3-.9-.6-.3-.3-.5-.5-.6-.9-.1-.3-.3-.7-.3-1.5-.1-.9-.1-1.1-.1-3.4s0-2.5.1-3.4c0-.8.2-1.2.3-1.5.1-.4.3-.6.6-.9.3-.3.5-.5.9-.6.3-.1.7-.3 1.5-.3.9-.1 1.1-.1 3.4-.1z" />
    </svg>
  );
}

const links = [
  {
    href: HIMAT.social.facebook,
    label: "Facebook",
    icon: FacebookIcon,
    className: "bg-[#1877F2] text-white hover:brightness-110",
  },
  {
    href: HIMAT.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
    className: "bg-[#0A66C2] text-white hover:brightness-110",
  },
  {
    href: HIMAT.social.instagram,
    label: "Instagram",
    icon: InstagramIcon,
    className:
      "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:brightness-110",
  },
] as const;

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md";
}

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const dim = size === "sm" ? "h-9 w-9" : "h-10 w-10";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${HIMAT.name} on ${item.label}`}
          className={cn(
            "inline-flex items-center justify-center rounded-full shadow-md transition-transform hover:-translate-y-0.5",
            dim,
            item.className
          )}
        >
          <item.icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
        </a>
      ))}
    </div>
  );
}
