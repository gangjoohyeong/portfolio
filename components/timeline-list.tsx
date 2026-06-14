import type { TimelineEntry } from "@/data/portfolio-data";

/** 학력·대외활동 등 시간순 항목을 카드 없이 깔끔한 목록으로 표시합니다. */
export function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="border-t border-border">
      {entries.map((e, i) => (
        <li key={i} className="border-b border-border py-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">{e.title}</h3>
            <span className="shrink-0 text-sm text-muted tabular-nums">
              {e.period}
            </span>
          </div>
          <p className="mt-1 text-muted">{e.subtitle}</p>
          {e.details.length > 0 && (
            <p className="mt-1 text-sm text-muted">{e.details.join(" · ")}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
