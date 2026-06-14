"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Section, SectionHeading } from "@/components/section";
import { portfolioData } from "@/data/portfolio-data";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-[var(--radius-field)] border border-[var(--field-border)] bg-[var(--field-background)] px-4 py-2.5 text-sm text-[var(--field-foreground)] outline-none transition placeholder:text-[var(--field-placeholder)] focus:border-[var(--field-border-focus)] focus:ring-2 focus:ring-accent/30";

export function Contact() {
  const { personal } = portfolioData;
  const [status, setStatus] = useState<Status>("idle");

  const contactRows = [
    {
      icon: Mail,
      label: "이메일",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: Phone,
      label: "휴대전화",
      value: personal.phone,
      href: `tel:${personal.phone}`,
    },
    { icon: MapPin, label: "지역", value: personal.location },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact" className="bg-surface/40">
      <SectionHeading title="연락" />

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
        <div>
          <dl className="border-t border-border">
            {contactRows.map((row) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex items-center gap-4 border-b border-border py-4"
                >
                  <Icon className="size-5 shrink-0 text-muted" />
                  <dt className="w-20 shrink-0 text-sm text-muted">
                    {row.label}
                  </dt>
                  <dd className="min-w-0 flex-1 truncate text-sm font-medium">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="transition-colors hover:text-accent"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-6 flex gap-3">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-6 sm:p-7">
          {status === "success" ? (
            <div className="flex h-full flex-col items-start justify-center gap-4 py-6">
              <p className="text-lg font-semibold">메시지가 전송되었습니다.</p>
              <Button variant="secondary" onPress={() => setStatus("idle")}>
                다시 작성
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  성함
                </label>
                <input id="name" name="name" required className={fieldClass} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium">
                  이메일 주소
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium">
                  내용
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className={fieldClass}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-danger">
                  전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                isPending={status === "submitting"}
              >
                <Send className="size-4" />
                메시지 전송
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
