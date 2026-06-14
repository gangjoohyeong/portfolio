import type { Metadata } from "next";
import { PrintShell } from "@/components/print/print-shell";
import { PrintDocument } from "@/components/print/print-document";

export const metadata: Metadata = {
  title: "이력서",
  robots: { index: false, follow: false },
};

export default function ResumePrintPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: "@page { size: A4 portrait; margin: 14mm 13mm; }",
        }}
      />
      <PrintShell>
        <PrintDocument variant="resume" />
      </PrintShell>
    </>
  );
}
