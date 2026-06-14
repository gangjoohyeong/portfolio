// =============================================================================
// PDF 생성 스크립트
// -----------------------------------------------------------------------------
// 웹사이트의 인쇄 라우트(/print/resume, /print/portfolio)를 Puppeteer 로 렌더해
// 정적 PDF 파일을 생성합니다. 화면·인쇄·PDF 가 모두 같은 컴포넌트(PrintDocument)를
// 사용하므로, 데이터만 수정하면 세 곳 모두 자동으로 갱신됩니다.
//
// 사용법:
//   pnpm pdf                      # 개발 서버 자동 실행 + 이력서/포트폴리오 PDF 생성
//   pnpm export:pdf               # (서버가 떠 있는 상태에서) 둘 다 생성
//   pnpm export:pdf:resume        # 이력서만
//   pnpm export:pdf:portfolio     # 포트폴리오만
//
// 결과물: public/resume.pdf, public/portfolio.pdf
// =============================================================================

import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const BASE_URL = process.env.PDF_BASE_URL ?? "http://localhost:3000";
const OUT_DIR = path.resolve(process.cwd(), "public");

const onlyArg = process.argv
  .slice(2)
  .find((a) => a.startsWith("--only="))
  ?.split("=")[1];

interface Target {
  name: string;
  route: string;
  landscape: boolean;
  out: string;
  margin: { top: string; bottom: string; left: string; right: string };
}

const ALL_TARGETS: Target[] = [
  {
    name: "이력서",
    route: "/print/resume/?preview=1",
    landscape: false,
    out: "resume.pdf",
    margin: { top: "14mm", bottom: "14mm", left: "13mm", right: "13mm" },
  },
  {
    name: "포트폴리오",
    route: "/print/portfolio/?preview=1",
    landscape: true,
    out: "portfolio.pdf",
    margin: { top: "11mm", bottom: "11mm", left: "12mm", right: "12mm" },
  },
];

const targets = onlyArg
  ? ALL_TARGETS.filter((t) => t.out.startsWith(onlyArg))
  : ALL_TARGETS;

/** 개발 서버가 응답할 때까지 대기합니다(외부 wait-on 의존성 제거). */
async function waitForServer(url: string, timeoutMs = 90_000) {
  const start = Date.now();
  process.stdout.write(`⏳ 서버 대기 중: ${url} `);
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status > 0) {
        console.log("→ 준비됨");
        return;
      }
    } catch {
      // 아직 안 뜸
    }
    process.stdout.write(".");
    await new Promise((r) => setTimeout(r, 700));
  }
  throw new Error(`\n서버가 응답하지 않습니다: ${url}`);
}

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  await waitForServer(BASE_URL);

  console.log(`📄 PDF 생성 시작 (대상 서버: ${BASE_URL})`);
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    for (const t of targets) {
      const page = await browser.newPage();
      const url = `${BASE_URL}${t.route}`;
      console.log(`🚀 ${t.name} 렌더링: ${url}`);

      await page.goto(url, {
        waitUntil: ["load", "networkidle0"],
        timeout: 60_000,
      });

      // 폰트와 이미지가 모두 로드될 때까지 대기
      await page.evaluate(async () => {
        const d = document as Document & {
          fonts?: { ready: Promise<unknown> };
        };
        await (d.fonts?.ready ?? Promise.resolve());
        await Promise.all(
          Array.from(document.images).map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((res) => {
                  img.onload = img.onerror = () => res(null);
                }),
          ),
        );
      });

      const outPath = path.join(OUT_DIR, t.out);
      await page.pdf({
        path: outPath,
        format: "A4",
        landscape: t.landscape,
        printBackground: true,
        margin: t.margin,
        displayHeaderFooter: false,
      });

      console.log(`✅ 저장 완료: ${outPath}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log("🎉 모든 PDF 생성이 완료되었습니다.");
}

run().catch((err) => {
  console.error("❌ PDF 생성 실패:", err);
  console.error(
    "   개발 서버(http://localhost:3000)가 실행 중인지 확인하세요. (pnpm pdf 사용 권장)",
  );
  process.exit(1);
});
