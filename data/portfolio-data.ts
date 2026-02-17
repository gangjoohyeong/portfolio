// =============================================================================
// 포트폴리오 데이터 (PDF 및 웹사이트 공용)
// =============================================================================

// ---------------------------------------------------------------------------
// 타입 정의
// ---------------------------------------------------------------------------

export interface PersonalInfo {
  name: string;
  nameEn: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  summary: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface Project {
  title: string;
  period: string;
  descriptions: string[];
  technologies: string[];
  imageUrl?: string;
  detailImages?: string[];
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
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
  activities: Education[];
  academicBackground: Education[];
  certificates: Certificate[];
}

// ---------------------------------------------------------------------------
// 데이터
// ---------------------------------------------------------------------------

export const portfolioData: PortfolioData = {
  personal: {
    name: "강주형",
    nameEn: "Kang Joohyeong",
    title: "Software Engineer",
    email: "bles@kakao.com",
    phone: "+821026074948",
    location: "경기도 성남시",
    github: "https://github.com/gangjoohyeong",
    linkedin: "https://linkedin.com/in/gangjoohyeong",
    summary: [
      "AI 도메인의 솔루션 개발과 연구를 수행했습니다.",
      "최근에는 MCP(Model Context Protocol) 기반의 AI 에이전트 개발과 Kubernetes 기반의 인프라 구축에 집중하고 있습니다.",
      "초기에는 챗봇 솔루션의 유지보수와 고객사 맞춤형 커스터마이징을 담당하며 현장의 다양한 요구사항을 이해하는 법을 배웠습니다. 이후 RAG 솔루션 개발로 영역을 확장하면서, 다양한 환경에서 안정적으로 동작하는 AI 솔루션 백엔드를 구축하는 경험을 쌓았습니다.",
      "현재는 사내 플레이그라운드를 구축하여 Langflow 기반의 AI 에이전트를 쉽게 배포하고 테스트할 수 있는 환경을 만들고 있습니다. 또한, LLM을 활용한 다양한 도구(Tool)들을 연결하는 MCP 서버 및 호스트 개발을 통해 AI 에이전트의 확장성을 높이는 연구를 진행 중입니다.",
      "업무 시간 외에도 최신 AI 동향을 꾸준히 탐색해 팀원들과 활발히 공유하고, 실무에 적용 가치가 있는 기술은 선별해 적극적으로 도입을 검토합니다.",
    ],
  },

  experiences: [
    {
      title: "연구원",
      company: "㈜와이즈넛",
      location: "경기도 성남시",
      type: "플랫폼 기술연구소 - AI어댑티브솔루션팀",
      period: "2023.10 - 현재",
      description:
        "AI 에이전트, RAG, 챗봇 등 AI 도메인 기반 제품 엔진 및 관리도구 연구 개발",
      responsibilities: [
        "사내 플레이그라운드 개발 (k8s, Langflow)",
        "MCP 기반 에이전트 개발 (FastMCP, vLLM)",
        "LangGraph 기반 RAG 빌더 개발",
        "사내 솔루션 통합 관리도구 개발",
        "AI 솔루션(챗봇, 검색엔진) 유지보수",
      ],
    },
  ],

  projects: [
    {
      title: "[와이즈넛] 사내 플레이그라운드 개발",
      period: "2026.01 - 진행중",
      descriptions: [
        "사내 연구소에서 AI Agent를 쉽게 구성 및 검증하고 사업부에 배포할 수 있는 통합 환경 구축",
        "Kubernetes 기반 인프라 구성: 사내 IDC 서버 활용 kubeadm 기반 k8s 환경 구축",
        "AI 에이전트 배포 환경: Langflow 커스텀 및 사내 제품 노드 통합",
      ],
      technologies: ["Kubernetes", "Langflow"],
      imageUrl: "/portfolio/playground1.png",
      detailImages: ["/portfolio/playground2.png"],
    },
    {
      title: "[와이즈넛] MCP 기반 에이전트 개발",
      period: "2025.05 - 2025.12",
      descriptions: [
        "LLM과 다양한 도구(Tool)를 표준화된 프로토콜(MCP)로 연결하는 에이전트 시스템 개발",
        "vLLM 서빙 연동: 오픈소스 32B 기반 파인튜닝 모델 서빙",
        "MCP Host(Client) 개발: FastMCP 기반 Tool Calling iteration 구현",
        "MCP 서버 연동: 사내 검색엔진 솔루션 및 n8n 등 연동",
      ],
      technologies: ["FastAPI", "FastMCP", "vLLM", "MCP"],
      imageUrl: "/portfolio/lloa_logo.png",
      detailImages: ["/portfolio/lloa1.png", "/portfolio/lloa2.png"],
    },
    {
      title: "[와이즈넛] LangGraph 기반 RAG 빌더 개발",
      period: "2025.01 - 2025.04",
      descriptions: [
        "사용자가 RAG 파이프라인(Retriever, Reranker, LLM 등)을 동적으로 구성할 수 있는 빌더 개발",
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
      imageUrl: "/portfolio/workflow1.png",
    },
    {
      title: "[와이즈넛] 사내 솔루션 관리도구 개발",
      period: "2024.07 - 2025.12",
      descriptions: [
        "다양한 AI 솔루션(RAG, 챗봇 등)을 통합 관리하는 시스템 개발",
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
      imageUrl: "/portfolio/irag_logo.png",
    },
    {
      title: "[와이즈넛] AI 솔루션 유지보수 (챗봇, 검색엔진)",
      period: "2023.10 - 2024.07",
      descriptions: [
        "기존 납품된 AI 솔루션의 안정적인 운영 지원 및 커스터마이징",
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
      imageUrl: "/portfolio/ichatV3_logo.jpg",
    },
    {
      title: "검색형 인공지능 개발 프로젝트 (howcan.ai)",
      period: "2023",
      descriptions: [
        "부스트캠프 AI Tech 5기 최종 프로젝트",
        "검색형 AI: 할루시네이션 최소화를 위한 RAG 기반 Q&A 서비스",
        "모델 서빙 및 백엔드: FastAPI/Transformers 기반 서빙 서버 구축",
        "데이터셋 구축: Polyglot-ko, koBART 기반 파인튜닝 데이터 구성",
      ],
      technologies: ["FastAPI", "SQLAlchemy", "PostgreSQL", "OpenAI"],
      imageUrl: "/portfolio/howcanai_logo.png",
      detailImages: [
        "/portfolio/howcanai_flow.png",
        "/portfolio/howcanai1.png",
        "/portfolio/howcanai2.png",
      ],
    },
  ],

  skillCategories: [
    {
      category: "AI & Backend",
      skills: [
        { name: "Python (FastAPI)", level: "Intermediate" },
        { name: "Java (Spring Boot)", level: "Intermediate" },
        { name: "MCP", level: "Intermediate" },
        { name: "LangGraph", level: "Intermediate" },
        { name: "Langflow", level: "Intermediate" },
        { name: "vLLM", level: "Beginner" },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "PostgreSQL", level: "Intermediate" },
        { name: "SQLAlchemy", level: "Intermediate" },
        { name: "JPA", level: "Intermediate" },
      ],
    },
    {
      category: "Infrastructure (DevOps)",
      skills: [
        { name: "Kubernetes", level: "Beginner" },
        { name: "Linux", level: "Intermediate" },
        { name: "Git", level: "Advanced" },
        { name: "GitLab", level: "Advanced" },
        { name: "GitHub", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" },
        { name: "GitLab Runner", level: "Intermediate" },
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Slack", level: "Intermediate" },
        { name: "Notion", level: "Intermediate" },
        { name: "Terminus", level: "Intermediate" },
        { name: "DBeaver", level: "Intermediate" },
        { name: "Postman", level: "Intermediate" },
        { name: "VS Code", level: "Intermediate" },
        { name: "IntelliJ IDEA", level: "Intermediate" },
      ],
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
      details: ["GPA: 3.9/4.5", "4학년 졸업"],
    },
    {
      title: "안양대학교",
      subtitle: "소프트웨어전공 (중퇴)",
      period: "2017 - 2021",
      details: ["GPA: 4.02/4.5", "2학년 수료"],
    },
  ],

  certificates: [
    {
      title: "정보처리기사",
      issuer: "한국산업인력공단",
      acquired: "2024.09",
    },
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
