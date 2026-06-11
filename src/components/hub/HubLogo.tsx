import Link from "next/link";
import { Boxes } from "lucide-react";

interface HubLogoProps {
  compact?: boolean;
  subtitle?: string;
}

export default function HubLogo({ compact = false, subtitle = "Internal resources" }: HubLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3 text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <Boxes className="h-5 w-5" strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block text-[17px] font-bold leading-none tracking-normal">
            MeU UI Hub
          </span>
          <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
            {subtitle}
          </span>
        </span>
      )}
    </Link>
  );
}
