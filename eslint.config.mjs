import next from "eslint-config-next";
import eslintConfigPrettier from "eslint-config-prettier";

// eslint-config-next 16 은 네이티브 flat config 배열을 export 합니다.
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".claude/**",
      "next-env.d.ts",
    ],
  },
  ...next,
  {
    rules: {
      // 정적 export + images.unoptimized 환경이라 next/image 최적화 이점이 없고,
      // 임의 비율 처리를 위해 의도적으로 <img> 를 사용합니다.
      "@next/next/no-img-element": "off",
    },
  },
  // Prettier 와 충돌하는 포맷 규칙 비활성화 (항상 마지막)
  eslintConfigPrettier,
];

export default eslintConfig;
