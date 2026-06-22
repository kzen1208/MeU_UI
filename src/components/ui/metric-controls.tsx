"use client";

import * as React from "react";
import { BarChart3, ChevronDown, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChartView } from "./metric-chart";

export interface PeriodOption {
  label: string;
  points?: number;
}

export interface PeriodSelectProps {
  value: string;
  options: PeriodOption[];
  onChange: (option: PeriodOption) => void;
  accentText?: string;
}

export function PeriodSelect({ value, options, onChange, accentText }: PeriodSelectProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (options.length <= 1) {
    return <span className="text-white/45">{value}</span>;
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-1 rounded-md px-1.5 py-1 text-white/55 transition hover:bg-white/[0.06] hover:text-white"
        style={accentText ? { color: open ? accentText : undefined } : undefined}
      >
        {value}
        <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-1.5 min-w-[9rem] rounded-lg border border-white/10 bg-[#171717] p-1 shadow-xl">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-md px-2.5 py-1.5 text-left text-xs text-white/70 transition hover:bg-white/[0.08] hover:text-white",
                option.label === value && "bg-white/[0.06] text-white"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export interface ViewToggleProps {
  value: ChartView;
  onChange: (view: ChartView) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-white/10 bg-white/[0.03] p-0.5">
      <button
        type="button"
        aria-label="Curve view"
        aria-pressed={value === "curve"}
        onClick={() => onChange("curve")}
        className={cn(
          "rounded px-1.5 py-1 transition",
          value === "curve" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
        )}
      >
        <LineChart className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label="Bar view"
        aria-pressed={value === "bar"}
        onClick={() => onChange("bar")}
        className={cn(
          "rounded px-1.5 py-1 transition",
          value === "bar" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
        )}
      >
        <BarChart3 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
