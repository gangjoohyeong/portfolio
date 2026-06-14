// =============================================================================
// GitHub Pages 수동 배포 스크립트
// -----------------------------------------------------------------------------
// `next build` 로 생성된 out/ 디렉토리를 gh-pages 브랜치에 강제 푸시합니다.
// 메인 레포의 git 상태와 무관하게 동작합니다(out/ 안에서 독립 git 사용).
//
// 사용법:  pnpm gh-deploy
// 환경변수:
//   GH_PAGES_REPO   배포 대상 레포 (기본: gangjoohyeong/portfolio)
//   GH_PAGES_BRANCH 배포 브랜치 (기본: gh-pages)
//
// ※ GitHub Actions(.github/workflows/deploy.yml)를 사용하면 push 만으로
//   자동 배포되므로 이 스크립트는 로컬 수동 배포용 백업입니다.
// =============================================================================

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO = process.env.GH_PAGES_REPO ?? "gangjoohyeong/portfolio";
const BRANCH = process.env.GH_PAGES_BRANCH ?? "gh-pages";
const OUT = path.resolve(process.cwd(), "out");

if (!fs.existsSync(OUT)) {
  console.error(
    "❌ out/ 디렉토리가 없습니다. 먼저 `pnpm build` 를 실행하세요.",
  );
  process.exit(1);
}

// GitHub Pages 가 _next 등 언더스코어 폴더를 무시하지 않도록 .nojekyll 추가
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

const remote = `https://github.com/${REPO}.git`;
const gitDir = path.join(OUT, ".git");
const run = (cmd) => execSync(cmd, { cwd: OUT, stdio: "inherit" });

try {
  fs.rmSync(gitDir, { recursive: true, force: true });
  run(`git init -b ${BRANCH}`);
  run("git add -A");
  run(
    `git -c user.name="gh-deploy" -c user.email="gh-deploy@local" commit -m "Deploy ${new Date().toISOString()}"`,
  );
  console.log(`🚀 ${remote} (${BRANCH}) 로 푸시합니다...`);
  run(`git push --force ${remote} ${BRANCH}`);
  const [owner, name] = REPO.split("/");
  console.log(`✅ 배포 완료: https://${owner}.github.io/${name}/`);
} finally {
  fs.rmSync(gitDir, { recursive: true, force: true });
}
