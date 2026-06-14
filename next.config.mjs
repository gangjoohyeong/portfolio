/** @type {import('next').NextConfig} */

// =============================================================================
// 배포 설정
// -----------------------------------------------------------------------------
// GitHub Pages(프로젝트 페이지)는 https://<user>.github.io/<repo>/ 경로로
// 서빙되므로 basePath 가 필요합니다. 레포 이름이 바뀌면 아래 BASE_PATH 한 곳만
// 수정하면 됩니다. 개발 모드에서는 basePath 를 비워 두어 localhost:3000 에서
// 바로 접근할 수 있게 합니다(Puppeteer 내보내기 포함).
// =============================================================================
const REPO_BASE_PATH = "/portfolio";

const isProd = process.env.NODE_ENV === "production";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? REPO_BASE_PATH : "");

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 클라이언트/런타임에서 동일한 basePath 를 참조할 수 있도록 노출
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
