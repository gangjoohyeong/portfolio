import { cn } from "@/lib/utils";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      <div className="mx-auto max-w-[84rem] px-5 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  aside,
  className,
}: {
  title: string;
  /** 제목 우측에 둘 실제 메타/링크 (선택) */
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-2",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {aside}
    </div>
  );
}
