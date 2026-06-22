"use client";

import * as React from "react";

export type MetricAccent = "blue" | "violet" | "emerald" | "orange" | "pink" | "rose" | "neutral";
export type ChartView = "curve" | "bar";

export interface SeriesPoint {
  value: number;
  date: string;
}

export interface ChartSeries {
  name: string;
  data: SeriesPoint[];
  color: string;
}

export interface MetricSeries {
  name: string;
  data: SeriesPoint[];
  accent?: MetricAccent;
}

export const ACCENTS: Record<MetricAccent, { stroke: string; text: string }> = {
  blue: { stroke: "#4264ff", text: "#85a0ff" },
  violet: { stroke: "#a78bfa", text: "#c4b5fd" },
  emerald: { stroke: "#34d399", text: "#6ee7b7" },
  orange: { stroke: "#fb923c", text: "#fdba74" },
  pink: { stroke: "#f472b6", text: "#f9a8d4" },
  rose: { stroke: "#fb7185", text: "#fda4af" },
  neutral: { stroke: "#94a3b8", text: "#cbd5e1" },
};

export const SERIES_COLORS = [
  ACCENTS.blue.stroke,
  ACCENTS.violet.stroke,
  ACCENTS.emerald.stroke,
  ACCENTS.orange.stroke,
  ACCENTS.pink.stroke,
];

export function formatCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${Math.round(value)}`;
}

const VIEW_W = 300;
const VIEW_H = 140;
const PAD_Y = 16;

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export interface MetricChartProps {
  series: ChartSeries[];
  view: ChartView;
  defaultIndex: number;
  valueFormatter: (value: number) => string;
  dateFormatter: (date: string) => string;
}

export function MetricChart({ series, view, defaultIndex, valueFormatter, dateFormatter }: MetricChartProps) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);
  const gridId = React.useId().replace(/:/g, "");

  const primary = series[0];
  const count = primary?.data.length ?? 0;
  const activeIndex = count === 0 ? 0 : Math.min(Math.max(hoverIndex ?? defaultIndex, 0), count - 1);

  const allValues = series.flatMap((s) => s.data.map((point) => point.value));
  const min = allValues.length ? Math.min(...allValues, 0) : 0;
  const max = allValues.length ? Math.max(...allValues, 1) : 1;
  const range = max - min || 1;

  const toX = (index: number) => (count <= 1 ? VIEW_W / 2 : (index / (count - 1)) * VIEW_W);
  const toY = (value: number) => PAD_Y + (1 - (value - min) / range) * (VIEW_H - PAD_Y * 2);

  const handleMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (count === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const index = Math.round(ratio * (count - 1));
    setHoverIndex(Math.min(Math.max(index, 0), count - 1));
  };

  const activePoint = primary?.data[activeIndex];
  const tooltipX = toX(activeIndex);
  const tooltipY = activePoint ? toY(activePoint.value) : VIEW_H / 2;
  const tooltipAlign = tooltipX > VIEW_W * 0.62 ? "right" : "left";

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="h-full w-full cursor-crosshair"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          {series.map((s, i) => (
            <linearGradient key={`${s.name}-${i}`} id={`metric-fill-${gridId}-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {series.map((s, i) => {
          const points = s.data.map((point, index) => ({ x: toX(index), y: toY(point.value) }));
          if (points.length === 0) return null;

          if (view === "bar") {
            const barWidth = Math.max((VIEW_W / Math.max(points.length, 1)) * 0.46, 3);
            return (
              <g key={`${s.name}-${i}`}>
                {points.map((point, index) => (
                  <rect
                    key={index}
                    x={point.x - barWidth / 2}
                    y={point.y}
                    width={barWidth}
                    height={Math.max(VIEW_H - PAD_Y - point.y, 1)}
                    rx={barWidth / 3}
                    fill={s.color}
                    opacity={index === activeIndex ? 1 : 0.55}
                  />
                ))}
              </g>
            );
          }

          const linePath = buildSmoothPath(points);
          const areaPath = `${linePath} L ${points[points.length - 1].x} ${VIEW_H - PAD_Y} L ${points[0].x} ${VIEW_H - PAD_Y} Z`;

          return (
            <g key={`${s.name}-${i}`}>
              <path d={areaPath} fill={`url(#metric-fill-${gridId}-${i})`} stroke="none" />
              <path
                d={linePath}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {activePoint && (
          <>
            <line
              x1={tooltipX}
              y1={PAD_Y / 2}
              x2={tooltipX}
              y2={VIEW_H - PAD_Y}
              stroke="white"
              strokeOpacity={0.15}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <circle cx={tooltipX} cy={tooltipY} r={4} fill={series[0]?.color ?? "#fff"} stroke="#000" strokeWidth={2} />
          </>
        )}
      </svg>

      {activePoint && (
        <div
          className="pointer-events-none absolute z-20 rounded-lg border border-white/10 bg-[#171717] px-2.5 py-1.5 text-[11px] shadow-xl"
          style={{
            left: `${Math.min(Math.max((tooltipX / VIEW_W) * 100, 8), 88)}%`,
            top: `${Math.max((tooltipY / VIEW_H) * 100, 34)}%`,
            transform: `${tooltipAlign === "right" ? "translateX(-100%)" : "translateX(0)"} translateY(-50%)`,
          }}
        >
          <p className="font-semibold text-white">{valueFormatter(activePoint.value)}</p>
          <p className="text-white/45">{dateFormatter(activePoint.date)}</p>
        </div>
      )}
    </div>
  );
}
