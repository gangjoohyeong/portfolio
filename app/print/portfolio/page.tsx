import type { Metadata } from "next";
import { PrintShell } from "@/components/print/print-shell";
import { PrintDocument } from "@/components/print/print-document";

export const metadata: Metadata = {
  title: "포트폴리오",
  robots: { index: false, follow: false },
};

export default function PortfolioPrintPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "@page { size: A4 landscape; margin: 11mm 12mm; }",
        }}
      />
      <PrintShell>
        <PrintDocument variant="portfolio" />
      </PrintShell>
    </>
  );
}
