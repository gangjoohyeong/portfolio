// =============================================================================
// 포트폴리오 데이터 — 단일 소스 (Single Source of Truth)
// -----------------------------------------------------------------------------
// 이 파일 하나로 웹사이트 · 이력서 PDF · 포트폴리오 PDF 를 모두 구동합니다.
// ⚠️ 웹은 즉시 반영되지만, PDF(public/*.pdf)는 미리 생성된 정적 파일이라
//    수정 후 `pnpm pdf` 로 재생성해야 다운로드에 반영됩니다.
//
//  • 이미지는 `public/images/` 에 넣고 `/images/파일명` 형태로 적습니다.
//    (basePath 는 코드에서 자동으로 붙으므로 신경 쓰지 않아도 됩니다.)
//  • `images` 는 스크린샷(갤러리)이며, 웹에서 클릭하면 크게 볼 수 있습니다.
//  • 비율/사이즈가 제각각인 이미지도 자동으로 자연스럽게 배치됩니다.
// =============================================================================

export interface PersonalInfo {
  /** 한글 이름 */
  name: string;
  /** 영문 이름 */
  nameEn: string;
  /** 직함 (예: Software Engineer) */
  title: string;
  /** 히어로 영역 보조 설명 (경력 기간 뒤에 이어 붙는 한 문장) */
  heroDescription: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  /** 소개/이력서 요약 문단 (배열의 각 원소가 한 문단) */
  summary: string[];
  /** 경력 시작 시점 (YYYY-MM) — 경력 기간 자동 계산에 사용 */
  experienceSince: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  department: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface Project {
  /** 프로젝트명 */
  title: string;
  /** 소속/주최 (예: ㈜와이즈넛) — 태그로 표시 */
  org?: string;
  period: string;
  /** 한 줄 요약 */
  summary: string;
  /** 세부 성과 (각 항목은 "라벨: 내용" 또는 일반 문장) */
  highlights: string[];
  technologies: string[];
  /** 스크린샷/갤러리 이미지 (선택) */
  images?: string[];
  /** 서비스/소개 링크 (선택) */
  liveUrl?: string;
  /** GitHub 링크 (선택) */
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface TimelineEntry {
  title: string;
  subtitle: string;
  period: string;
  details: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  acquired: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
  activities: TimelineEntry[];
  academicBackground: TimelineEntry[];
  certificates: Certificate[];
}

// ---------------------------------------------------------------------------
// 데이터
// ---------------------------------------------------------------------------

export const portfolioData: PortfolioData = {
  personal: {
    name: "강주형",
    nameEn: "KANG JOOHYEONG",
    title: "Software Engineer",
    heroDescription:
      "RAG, 챗봇 등 AI 솔루션 제품 개발 경험을 가지고 있고, 현재는 Kubernetes 기반의 사내 AI Agent 플레이그라운드 구축에 집중하고 있습니다.",
    email: "bles@kakao.com",
    phone: "+821026074948",
    location: "경기도 성남시",
    github: "https://github.com/gangjoohyeong",
    linkedin: "https://linkedin.com/in/gangjoohyeong",
    summary: [
      "주로 AI 도메인의 솔루션 개발과 연구를 수행했습니다.",
      "최근에는 MCP를 활용한 AI 에이전트 개발과 더불어, 이를 효율적으로 배포할 수 있는 Kubernetes 환경 기반의 사내 AI Agent 플레이그라운드를 구축하는 데 집중하고 있습니다.",
      "이전에는 AI 도메인 솔루션의 개발 및 유지보수를 수행하며 탄탄한 기술적 기반을 쌓았습니다. 주로 Java/Spring과 Python/FastAPI를 활용해 서버를 구축했으며, 프론트엔드는 AI-driven 개발을 통해 React/Next.js 기반의 화면을 빠르게 프로토타이핑하고 완성도 있게 구현했습니다.",
      "최신 AI 동향을 꾸준히 탐색해 팀원들과 활발히 공유하고, 실무에 적용 가치가 있는 기술은 선별해 적극적으로 도입을 검토합니다.",
    ],
    experienceSince: "2023-10",
  },

  experiences: [
    {
      company: "㈜와이즈넛",
      position: "대리",
      location: "경기도 성남시",
      department: "AI 혁신연구소 · AI 어댑티브솔루션팀",
      period: "2023.10 - 현재",
      description:
        "AI 에이전트, RAG, 챗봇 등 AI 도메인 기반 제품 엔진 및 관리도구 연구 개발",
      responsibilities: [
        "사내 플레이그라운드 개발 (k8s, Langflow, ArgoCD, LiteLLM, Langfuse, vLLM 등)",
        "MCP 기반 에이전트 개발 (FastMCP, vLLM)",
        "LangGraph 기반 RAG 빌더 개발",
        "사내 솔루션 통합 관리도구 개발",
        "AI 솔루션(챗봇, 검색엔진) 유지보수",
      ],
    },
  ],

  projects: [
    {
      title: "사내 플레이그라운드 개발",
      org: "㈜와이즈넛",
      period: "2026.01 - 진행중",
      summary:
        "사내 연구소에서 AI Agent를 쉽게 구성 및 검증하고 사업부에 배포할 수 있는 통합 환경 구축",
      highlights: [
        "Kubernetes 기반 인프라 구성: 사내 IDC 서버 활용 k8s 환경 구성 및 컨테이너 이미지 빌드 및 배포 환경 구성",
        "AI 에이전트 배포 환경: Langflow 커스텀 및 사내 제품 노드 통합",
        "사내 모델 서빙 환경 구축: 개별 vLLM 컨테이너로 운영되던 사내 모델을 LiteLLM 게이트웨이로 통합하고, API 키 관리 및 Langfuse 연동을 통한 모니터링 체계 구축 (LLM, Embedding, Reranker)",
      ],
      technologies: [
        "Kubernetes",
        "ArgoCD",
        "Langflow",
        "LiteLLM",
        "Langfuse",
        "vLLM",
        "Buildkit",
        "Harbor",
      ],
      images: [
        "/images/playground1.png",
        "/images/playground2.png",
        "/images/playground3.png",
        "/images/playground4.png",
        "/images/playground5.png",
      ],
    },
    {
      title: "MCP 기반 에이전트 개발",
      org: "㈜와이즈넛",
      period: "2025.05 - 2025.12",
      summary:
        "LLM과 다양한 도구(Tool)를 표준화된 프로토콜(MCP)로 연결하는 에이전트 시스템 개발",
      highlights: [
        "vLLM 서빙 연동: 오픈소스 32B 기반 파인튜닝 모델 서빙",
        "MCP Host(Client) 개발: FastMCP 기반 Tool Calling iteration 구현",
        "MCP 서버 연동: 사내 검색엔진 솔루션 및 n8n 등 연동",
      ],
      technologies: ["FastAPI", "FastMCP", "vLLM", "MCP"],
      images: ["/images/lloa1.png", "/images/lloa2.png"],
      liveUrl: "https://www.wisenut.com/sub/AIAgent/Llm.php",
    },
    {
      title: "LangGraph 기반 RAG 빌더 개발",
      org: "㈜와이즈넛",
      period: "2025.01 - 2025.04",
      summary:
        "사용자가 RAG 파이프라인(Retriever, Reranker, LLM 등)을 동적으로 구성할 수 있는 빌더 개발",
      highlights: [
        "동적 워크플로우 엔진: LangGraph 기반 노드 실행 및 상태 관리",
        "시각적 관리도구: Vueflow 기반 UI 및 백엔드 연동",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "LangGraph",
        "TypeScript",
        "Nuxt.js",
        "Vueflow",
      ],
      images: ["/images/workflow1.png"],
    },
    {
      title: "사내 솔루션 관리도구 개발",
      org: "㈜와이즈넛",
      period: "2024.07 - 2025.12",
      summary: "다양한 AI 솔루션(RAG, 챗봇 등)을 통합 관리하는 시스템 개발",
      highlights: [
        "RAG 관리도구 백엔드: 다중 DB 벤더(MySQL, Oracle, PostgreSQL 등) 지원",
        "통합 관리도구: Spring Boot 인증 모듈 및 React/Next.js 기반 통합 화면",
        "DevOps: 사내 IDC 서버 및 GitLab CI 기반 CI/CD 구성",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "JPA",
        "Nuxt.js",
        "React",
        "Next.js",
        "GitLab CI",
      ],
      liveUrl: "https://www.wisenut.com/sub/rag/irag.php",
    },
    {
      title: "AI 솔루션 유지보수 (챗봇, 검색엔진)",
      org: "㈜와이즈넛",
      period: "2023.10 - 2024.07",
      summary: "기존 납품된 AI 솔루션의 안정적인 운영 지원 및 커스터마이징",
      highlights: [
        "이슈 처리 및 커스텀: 고객사 요청사항 반영 및 엔진 최적화",
        "관리도구 개발: 레거시 웹 관리도구 관리 및 커스텀",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "JSP",
        "Thymeleaf",
        "Python",
        "transformers",
      ],
      liveUrl: "https://www.wisenut.com/sub/ai/chatBot.php",
    },
    {
      title: "검색형 인공지능 개발 프로젝트 (howcan.ai)",
      org: "부스트캠프 AI Tech 5기",
      period: "2023",
      summary: "부스트캠프 AI Tech 5기 최종 프로젝트",
      highlights: [
        "검색형 AI: 할루시네이션 최소화를 위한 RAG 기반 Q&A 서비스",
        "모델 서빙 및 백엔드: FastAPI/Transformers 기반 서빙 서버 구축",
        "데이터셋 구축: Polyglot-ko, koBART 기반 파인튜닝 데이터 구성",
      ],
      technologies: ["FastAPI", "SQLAlchemy", "PostgreSQL", "OpenAI"],
      images: [
        "/images/howcanai_flow.png",
        "/images/howcanai1.png",
        "/images/howcanai2.png",
      ],
      githubUrl:
        "https://github.com/boostcampaitech5/level3_recsys_finalproject-recsys-11",
    },
  ],

  skillCategories: [
    {
      category: "Backend & DB",
      skills: [
        "Python (FastAPI)",
        "Java (Spring Boot)",
        "PostgreSQL",
        "SQLAlchemy",
        "JPA",
      ],
    },
    {
      category: "MLOps",
      skills: ["vLLM", "LiteLLM", "Langfuse", "Langflow"],
    },
    {
      category: "Infrastructure",
      skills: [
        "Kubernetes",
        "ArgoCD",
        "Linux",
        "Git",
        "Docker",
        "GitLab Runner",
      ],
    },
    {
      category: "Tools & Others",
      skills: ["Jira", "Confluence", "VS Code", "IntelliJ IDEA"],
    },
  ],

  activities: [
    {
      title: "부스트캠프 AI Tech",
      subtitle: "부스트캠프 AI Tech 5기 (수료)",
      period: "2023",
      details: ["네이버 커넥트재단 주관", "RecSys(추천 시스템) 트랙"],
    },
    {
      title: "2022 데이터 크리에이터 캠프",
      subtitle: "우수상 수상",
      period: "2022",
      details: [
        "한국지능정보사회진흥원 주관",
        "다중 이미지 분류 딥러닝 해커톤",
      ],
    },
    {
      title: "제7기 대학생 통계교육 재능기부단",
      subtitle: "통계청 통계교육원",
      period: "2021.12",
      details: ["통계 관련 교육 봉사 활동 수료"],
    },
  ],

  academicBackground: [
    {
      title: "동국대학교",
      subtitle: "통계학과 & 데이터사이언스소프트웨어연계전공 (편입학, 졸업)",
      period: "2021 - 2023",
      details: ["GPA: 3.9 / 4.5", "4학년 졸업"],
    },
    {
      title: "안양대학교",
      subtitle: "소프트웨어전공 (중퇴)",
      period: "2017 - 2021",
      details: ["GPA: 4.02 / 4.5", "2학년 수료"],
    },
  ],

  certificates: [
    { title: "정보처리기사", issuer: "한국산업인력공단", acquired: "2024.09" },
    {
      title: "빅데이터분석기사",
      issuer: "한국데이터산업진흥원",
      acquired: "2022.07",
    },
    {
      title: "SQL 개발자 (SQLD)",
      issuer: "한국데이터산업진흥원",
      acquired: "2021.12",
    },
    {
      title: "데이터분석 준전문가 (ADsP)",
      issuer: "한국데이터산업진흥원",
      acquired: "2021.09",
    },
  ],
};
