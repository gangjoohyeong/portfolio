import puppeteer from "puppeteer";
import { portfolioData } from "../data/portfolio-data";
import path from "path";
import fs from "fs";

// =============================================================================
// CLI 옵션 파싱
// =============================================================================

const args = process.argv.slice(2);
const includeImages = args.includes("--with-images");
const documentTitle = includeImages ? "포트폴리오" : "이력서";

if (includeImages) {
  console.log("📸 이미지 포함 모드로 PDF를 생성합니다 (포트폴리오).");
} else {
  console.log("📄 기본 모드로 PDF를 생성합니다 (이력서).");
}

// =============================================================================
// 이미지 → Base64 변환 유틸
// =============================================================================

function imageToBase64(imgPath: string): string {
  const absPath = path.resolve(
    __dirname,
    "../public",
    imgPath.replace(/^\//, ""),
  );
  if (!fs.existsSync(absPath)) return "";
  const ext = path.extname(absPath).toLowerCase().replace(".", "");
  const mimeMap: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  const mime = mimeMap[ext] || "image/png";
  const data = fs.readFileSync(absPath).toString("base64");
  return `data:${mime};base64,${data}`;
}

// =============================================================================
// HTML 템플릿 생성
// =============================================================================

function buildHtml(): string {
  const d = portfolioData;

  // 경력 기간 계산
  const start = new Date(2023, 9);
  const now = new Date();
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  months = (months % 12) + 1;
  const duration = `${years > 0 ? `${years}년 ` : ""}${months > 0 ? `${months}개월` : ""}`;

  // 이미지를 base64 data URI로 변환 (엑스박스 방지)
  const toDataUri = (imgPath: string) => imageToBase64(imgPath);

  return /* html */ `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${d.personal.name} ${documentTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
  <style>
    /* ================================================================
       기본 리셋 및 레이아웃
       ================================================================ */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html {
      font-size: 11px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1a1a2e;
      background: #ffffff;
      line-height: 1.6;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      padding: 0;
    }

    /* ================================================================
       헤더
       ================================================================ */
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 3px solid #2563eb;
      margin-bottom: 24px;
    }

    .header h1 {
      font-size: 2.8rem;
      font-weight: 900;
      color: #1a1a2e;
      letter-spacing: -0.02em;
      margin-bottom: 2px;
    }

    .header h1 .accent { color: #2563eb; }

    .header .subtitle {
      font-size: 1.3rem;
      color: #6b7280;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .header .contact-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 1rem;
      color: #4b5563;
    }

    .header .contact-row a {
      color: #2563eb;
      text-decoration: none;
    }

    .header .link-url {
      color: #6b7280;
      font-size: 0.9rem;
    }

    .header .experience-badge {
      display: inline-block;
      margin-top: 10px;
      padding: 4px 14px;
      background: #eff6ff;
      color: #2563eb;
      border-radius: 20px;
      font-size: 0.95rem;
      font-weight: 600;
    }

    /* ================================================================
       섹션
       ================================================================ */
    .section {
      margin-bottom: 22px;
      page-break-inside: avoid;
    }

    .section-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #1a1a2e;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 5px;
      margin-bottom: 12px;
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 18px;
      background: #2563eb;
      border-radius: 2px;
    }

    /* ================================================================
       소개
       ================================================================ */
    .summary p {
      font-size: 1rem;
      line-height: 1.75;
      color: #374151;
      margin-bottom: 6px;
    }

    /* ================================================================
       경력
       ================================================================ */
    .experience-item { margin-bottom: 12px; }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }

    .experience-header .title { font-size: 1.15rem; font-weight: 700; color: #1a1a2e; }
    .experience-header .title .company { color: #2563eb; }
    .experience-header .period { font-size: 0.9rem; color: #6b7280; font-weight: 500; white-space: nowrap; }

    .experience-meta { font-size: 0.9rem; color: #6b7280; margin-bottom: 4px; }
    .experience-desc { font-size: 0.95rem; color: #4b5563; margin-bottom: 6px; }

    .responsibility-list { list-style: disc; padding-left: 18px; }
    .responsibility-list li { font-size: 0.95rem; color: #374151; margin-bottom: 2px; line-height: 1.6; }

    /* ================================================================
       프로젝트
       ================================================================ */
    .project-item {
      margin-bottom: 14px;
      padding: 10px 14px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 3px solid #2563eb;
      page-break-inside: avoid;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }

    .project-header .title { font-size: 1.05rem; font-weight: 700; color: #1a1a2e; }
    .project-header .period { font-size: 0.85rem; color: #6b7280; font-weight: 500; white-space: nowrap; }

    .project-desc {
      font-size: 0.9rem;
      color: #4b5563;
      margin-bottom: 6px;
      line-height: 1.65;
      padding-left: 16px;
    }

    .project-desc li { margin-bottom: 1px; }

    .project-images {
      margin-top: 10px;
      margin-bottom: 6px;
    }

    .project-images-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: flex-start;
    }

    .project-img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 220px;
      height: 145px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      overflow: hidden;
      flex-shrink: 0;
    }

    .project-img-box img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      display: block;
    }

    .project-img-box.logo-box {
      width: 120px;
      height: 96px;
      background: #ffffff;
    }

    .tech-tags { display: flex; flex-wrap: wrap; gap: 5px; }

    .tech-tag {
      display: inline-block;
      padding: 2px 8px;
      background: #e0e7ff;
      color: #3730a3;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    /* ================================================================
       기술 스택
       ================================================================ */
    .skill-category { margin-bottom: 10px; }
    .skill-category-title { font-size: 1rem; font-weight: 600; color: #1a1a2e; margin-bottom: 5px; }
    .skill-list { display: flex; flex-wrap: wrap; gap: 5px; }

    .skill-item {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .skill-advanced { background: #dcfce7; color: #166534; }
    .skill-intermediate { background: #dbeafe; color: #1e40af; }
    .skill-beginner { background: #f3f4f6; color: #4b5563; }

    .skill-legend {
      display: flex;
      gap: 12px;
      margin-bottom: 10px;
      font-size: 0.85rem;
    }

    .skill-legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .skill-legend-dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 2px;
    }

    .skill-legend-dot.advanced { background: #dcfce7; border: 1px solid #166534; }
    .skill-legend-dot.intermediate { background: #dbeafe; border: 1px solid #1e40af; }
    .skill-legend-dot.beginner { background: #f3f4f6; border: 1px solid #4b5563; }

    /* ================================================================
       교육 & 자격
       ================================================================ */
    .edu-item, .cert-item, .academic-item {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }

    .edu-header, .cert-header, .academic-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .edu-header .title, .cert-header .title, .academic-header .title { font-size: 1.05rem; font-weight: 600; color: #1a1a2e; }
    .edu-header .period, .cert-header .period, .academic-header .period { font-size: 0.85rem; color: #6b7280; font-weight: 500; }

    .edu-subtitle, .cert-subtitle, .academic-subtitle { font-size: 0.9rem; color: #6b7280; margin-bottom: 2px; }
    .edu-details, .academic-details { font-size: 0.9rem; color: #4b5563; }

    /* ================================================================
       2단 그리드
       ================================================================ */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    /* ================================================================
       페이지 나눔 방지
       ================================================================ */
    @media print {
      .section { page-break-inside: avoid; }
      .project-item { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- 헤더 -->
    <div class="header">
      <h1><span class="accent">${d.personal.name}</span> ${documentTitle}</h1>
      <div class="subtitle">${d.personal.title}</div>
      <div class="contact-row">
        <span>📧 <a href="mailto:${d.personal.email}">${d.personal.email}</a></span>
        <span>📱 ${d.personal.phone}</span>
        <span>📍 ${d.personal.location}</span>
      </div>
      <div class="contact-row" style="margin-top: 6px">
        <span><a href="${d.personal.github}">GitHub</a> <span class="link-url">(${d.personal.github})</span></span>
        <span><a href="${d.personal.linkedin}">LinkedIn</a> <span class="link-url">(${d.personal.linkedin})</span></span>
      </div>
      <div>
        <span class="experience-badge">경력 ${duration}</span>
      </div>
    </div>

    <!-- 소개 -->
    <div class="section">
      <h2 class="section-title">소개</h2>
      <div class="summary">
        ${d.personal.summary.map((s) => `<p>${s}</p>`).join("\n        ")}
      </div>
    </div>

    <!-- 경력 -->
    <div class="section">
      <h2 class="section-title">경력</h2>
      ${d.experiences
        .map(
          (exp) => `
      <div class="experience-item">
        <div class="experience-header">
          <span class="title"><span class="company">${exp.title}</span> ${exp.company}</span>
          <span class="period">${exp.period}</span>
        </div>
        <div class="experience-meta">📍 ${exp.location} · ${exp.type}</div>
        <div class="experience-desc">${exp.description}</div>
        <ul class="responsibility-list">
          ${exp.responsibilities.map((r) => `<li>${r}</li>`).join("\n          ")}
        </ul>
      </div>`,
        )
        .join("\n")}
    </div>

    <!-- 학력사항 -->
    <div class="section">
      <h2 class="section-title">학력사항</h2>
      ${d.academicBackground
        .map(
          (edu) => `
      <div class="academic-item">
        <div class="academic-header">
          <span class="title">${edu.title}</span>
          <span class="period">${edu.period}</span>
        </div>
        <div class="academic-subtitle">${edu.subtitle}</div>
        <div class="academic-details">${edu.details.join(" · ")}</div>
      </div>`,
        )
        .join("\n")}
    </div>

    <!-- 프로젝트 -->
    <div class="section">
      <h2 class="section-title">프로젝트</h2>
      ${d.projects
        .map(
          (proj) => `
      <div class="project-item">
        <div class="project-header">
          <span class="title">${proj.title}</span>
          <span class="period">${proj.period}</span>
        </div>
        <ul class="project-desc">
          ${proj.descriptions.map((desc) => `<li>${desc}</li>`).join("\n          ")}
        </ul>
        <div class="tech-tags">
          ${proj.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("\n          ")}
        </div>${
          includeImages &&
          (proj.imageUrl || (proj.detailImages && proj.detailImages.length > 0))
            ? (() => {
                const mainUri = proj.imageUrl ? toDataUri(proj.imageUrl) : "";
                const detailUris = (proj.detailImages || [])
                  .map((img) => toDataUri(img))
                  .filter(Boolean);

                const allBoxes: string[] = [];
                if (mainUri) {
                  allBoxes.push(
                    `<div class="project-img-box logo-box"><img src="${mainUri}" alt="${proj.title}" /></div>`
                  );
                }
                detailUris.forEach((uri) => {
                  allBoxes.push(
                    `<div class="project-img-box"><img src="${uri}" alt="${proj.title} \uc0c1\uc138" /></div>`
                  );
                });

                if (allBoxes.length === 0) return "";
                return `\n        <div class="project-images">\n          <div class="project-images-grid">\n            ${allBoxes.join("\n            ")}\n          </div>\n        </div>`;
              })()
            : ""
        }
      </div>`,
        )
        .join("\n")}
    </div>

    <!-- 기술 스택 -->
    <div class="section">
      <h2 class="section-title">활용 기술</h2>
      <div class="skill-legend">
        <div class="skill-legend-item"><span class="skill-legend-dot advanced"></span> Advanced</div>
        <div class="skill-legend-item"><span class="skill-legend-dot intermediate"></span> Intermediate</div>
        <div class="skill-legend-item"><span class="skill-legend-dot beginner"></span> Beginner</div>
      </div>
      ${d.skillCategories
        .map(
          (cat) => `
      <div class="skill-category">
        <div class="skill-category-title">${cat.category}</div>
        <div class="skill-list">
          ${cat.skills
            .map(
              (s) =>
                `<span class="skill-item skill-${s.level.toLowerCase()}">${s.name}</span>`,
            )
            .join("\n          ")}
        </div>
      </div>`,
        )
        .join("\n")}
    </div>

    <!-- 대외활동 & 자격 (2단 그리드) -->
    <div class="grid-2">
      <div class="section">
        <h2 class="section-title">대외활동</h2>
        ${d.activities
          .map(
            (edu) => `
        <div class="edu-item">
          <div class="edu-header">
            <span class="title">${edu.title}</span>
            <span class="period">${edu.period}</span>
          </div>
          <div class="edu-subtitle">${edu.subtitle}</div>
          <div class="edu-details">${edu.details.join(" · ")}</div>
        </div>`,
          )
          .join("\n")}
      </div>

      <div class="section">
        <h2 class="section-title">자격사항</h2>
        ${d.certificates
          .map(
            (cert) => `
        <div class="cert-item">
          <div class="cert-header">
            <span class="title">${cert.title}</span>
            <span class="period">${cert.acquired}</span>
          </div>
          <div class="cert-subtitle">${cert.issuer}</div>
        </div>`,
          )
          .join("\n")}
      </div>
    </div>

  </div>
</body>
</html>`;
}

// =============================================================================
// PDF 생성
// =============================================================================

async function generatePdf() {
  const outputFileName = includeImages ? "portfolio.pdf" : "resume.pdf";
  const outputPath = path.resolve(
    __dirname,
    `../pdf/${outputFileName}`,
  );
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("🚀 PDF 포트폴리오 생성을 시작합니다...");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--allow-file-access-from-files",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const page = await browser.newPage();

    const html = buildHtml();
    await page.setContent(html, { waitUntil: ["networkidle0", "load"] });
    // base64 이미지가 완전히 렌더링될 때까지 대기
    if (includeImages) {
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.images).map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((resolve) => {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                }),
          ),
        );
      });
    }

    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "15mm",
        bottom: "20mm",
        left: "15mm",
      },
      displayHeaderFooter: false,
    });

    console.log(`✅ PDF 생성 완료: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

generatePdf().catch((err) => {
  console.error("❌ PDF 생성 실패:", err);
  process.exit(1);
});
