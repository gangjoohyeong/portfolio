import ExperienceCard from "@/components/experience-card";
import { ModeToggle } from "@/components/mode-toggle";
import ProjectCard from "@/components/project-card";
import SkillBadge from "@/components/skill-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Code className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                강주형 포트폴리오
              </span>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              소개
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              경력
            </Link>
            <Link
              href="#projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              프로젝트
            </Link>
            <Link
              href="#skills"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              활용 기술
            </Link>
            <Link
              href="#education"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              교육
            </Link>
            <Link
              href="#certificates"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              자격사항
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              연락
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="outline"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <Link href="#contact">연락 정보</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="container py-8 md:py-12">
        {/* Hero Section - Refactored without profile picture */}
        <section className="py-16 md:py-20 lg:py-24 space-y-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex justify-center">
                {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-medium">Available for new opportunities</span>
                </div> */}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                개발자 <span className="text-primary">강주형</span>입니다.
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                Software Engineer
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:leading-loose">
                {(() => {
                  const start = new Date(2023, 9);
                  const now = new Date();
                  let months =
                    (now.getFullYear() - start.getFullYear()) * 12 +
                    (now.getMonth() - start.getMonth());
                  const years = Math.floor(months / 12);
                  months = months % 12;
                  return (
                    <>
                      {`${years > 0 ? `${years}년 ` : ""}${
                        months > 0 ? `${months}개월` : ""
                      }의 RAG, 챗봇 등 AI 솔루션 제품 개발 경험을 가지고 있고,`}
                      <br />
                      빠르게 발전하는 AI 트렌드에 대한 깊은 관심이 있습니다.
                    </>
                  );
                })()}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              >
                <Link href="#contact">연락 정보</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:bg-accent"
              >
                <Link href="#projects">프로젝트 보기</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link
                href="https://github.com/gangjoohyeong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href="https://linkedin.com/in/gangjoohyeong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:bles@kakao.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">소개</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>

            <div className="max-w-4xl mx-auto bg-card rounded-xl p-6 md:p-8 shadow-sm border border-primary/10">
              <div className="space-y-6">
                <p className="text-xl font-medium leading-relaxed md:leading-loose">
                  안녕하세요. Software Engineer{" "}
                  <span className="text-primary font-semibold">강주형</span>
                  입니다. <br />
                  주로 AI 도메인 프로젝트의 Python과 Java 기반 서버 개발을
                  수행했습니다.
                </p>

                <div className="space-y-5 text-base md:text-lg leading-relaxed md:leading-loose text-card-foreground/90">
                  <p>
                    초기에는 챗봇 솔루션의 유지보수와 고객사 맞춤형
                    커스터마이징을 담당하며 현장의 다양한 요구사항을 이해하는
                    법을 배웠습니다. 이후 RAG 솔루션 개발로 영역을 확장하면서,
                    다양한 환경에서 안정적으로 동작하는 AI 솔루션 백엔드를
                    구축하는 경험을 쌓았습니다.
                  </p>

                  {/* <blockquote className="pl-4 border-l-4 border-primary/50 italic my-6 md:my-8 py-2 bg-primary/5 rounded-r-lg">
                    <p className="text-lg md:text-xl font-light">
                      
                    </p>
                  </blockquote> */}

                  <p>
                    현재는 RAG 빌더를 동적인 워크플로우 시스템으로 고도화하는
                    프로젝트를 수행하고 있습니다. LangGraph를 기반으로 한 엔진
                    개발부터 Vueflow 기반의 직관적인 UI 구성까지, 사용자가
                    복잡한 AI 워크플로우를 쉽게 구성할 수 있도록 하는 것이
                    목표입니다. 그 과정에서 GitLab Runner 기반 CI/CD
                    파이프라인을 직접 구축하는 등 개발 효율성도 높이기 위해
                    DevOps 경험도 쌓고 있습니다.
                  </p>

                  <p>
                    업무 시간 외에도 최신 AI 동향을 꾸준히 탐색해 팀원들과
                    활발히 공유하고, <br /> 실무에 적용 가치가 있는 기술은
                    선별해 적극적으로 도입을 검토합니다. <br />
                  </p>
                  <p>
                    프론트엔드 개발은 아직 성숙하지 않아서, 이 페이지는{" "}
                    <a
                      href="https://v0.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      v0
                    </a>
                    의 도움을 받았습니다.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    <Link href="#projects" className="flex items-center gap-2">
                      <span>프로젝트 보기</span>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:bg-accent"
                  >
                    <a
                      href="/portfolio/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      이력서 다운로드
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">경력</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid gap-6">
              <ExperienceCard
                title="연구원"
                company="(주)와이즈넛"
                location="경기도 성남시"
                type="AI연구소 AI에이전트랩 통합솔루션팀"
                period="2023.10 - 현재"
                description="챗봇, RAG 등 AI 도메인 기반 제품 엔진 및 관리도구 연구 및 개발"
                responsibilities={[
                  "LangGraph 기반 RAG 빌더 개발",
                  "RAG 관리도구 개발",
                  "챗봇 관리도구 및 엔진 유지보수",
                  "벡터 검색 모델 학습 관리도구 개발",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                프로젝트
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="RAG 솔루션 (WISE iRAG)"
                period="2024 - 2025"
                description="Implementation of team features based on laravel/jetstream using Filament on Laravel 11, implementing team switching features with Livewire and automatic refresh after team changes."
                technologies={[
                  "LangGraph",
                  "FastAPI",
                  "Spring Boot",
                  "Nuxt.js",
                  "FastAPI",
                  "PostgreSQL",
                  "GitLab CI",
                  "Docker",
                ]}
                imageUrl="/portfolio/irag_logo.png"
                liveUrl="https://www.wisenut.com/sub/AIAgent/irag.php"
              />

              <ProjectCard
                title="챗봇 솔루션 (WISE iChat)"
                period="April 2023"
                description="Seccodeid landing page created using TailwindCSS with responsive design and optimal SEO."
                technologies={["TailwindCSS", "HTML", "JavaScript"]}
                imageUrl="/portfolio/ichatV3_logo.jpg"
                liveUrl="https://www.wisenut.com/sub/ai/chatBot.php"
              />

              <ProjectCard
                title="업데이트 예정"
                period="May 2024 - June 2024"
                description="A campus assignment project from the Programming course to create a blog application using CodeIgniter4 and Bootstrap, equipped with category features, post slugs, admin panel, and comments and replies."
                technologies={["CodeIgniter4", "Bootstrap", "MySQL"]}
                imageUrl="/placeholder.svg?height=300&width=600"
                githubUrl="https://github.com/holiq/cilog"
              />

              <ProjectCard
                title="업데이트 예정"
                period="August 2020 - September 2020"
                description="A simple blog created with Laravel 7, Tailwind CSS, and AlpineJS, equipped with admin panel features, roles and permissions, comments and replies on posts, as well as slugs and tags on posts."
                technologies={[
                  "Laravel 7",
                  "Tailwind CSS",
                  "AlpineJS",
                  "MySQL",
                ]}
                imageUrl="/placeholder.svg?height=300&width=600"
                githubUrl="https://github.com/holiq/blog-laravel"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                활용 기술
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <Card className="shadow-sm border-primary/10">
              <CardContent className="p-6">
                <Tabs defaultValue="backend" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="backend">AI & Backend</TabsTrigger>
                    <TabsTrigger value="database">Database</TabsTrigger>
                    <TabsTrigger value="infrastructure">
                      Infrastructure
                    </TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                  </TabsList>
                  <TabsContent value="backend" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">
                      AI & Backend 기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge
                        name="Python (FastAPI)"
                        level="Intermediate"
                      />
                      <SkillBadge
                        name="Java (Spring boot)"
                        level="Intermediate"
                      />
                      <SkillBadge name="LangGraph" level="Intermediate" />
                    </div>
                  </TabsContent>
                  <TabsContent value="database" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">
                      Database 기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="PostgreSQL" level="Intermediate" />
                      <SkillBadge name="SQLAlchemy" level="Intermediate" />
                      <SkillBadge name="JPA" level="Intermediate" />
                    </div>
                  </TabsContent>
                  <TabsContent
                    value="infrastructure"
                    className="mt-6 space-y-4"
                  >
                    <h3 className="text-xl font-semibold">
                      Infrastructure (DevOps)
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="Linux" level="Intermediate" />
                      <SkillBadge name="Git" level="Advanced" />
                      <SkillBadge name="GitLab" level="Advanced" />
                      <SkillBadge name="GitHub" level="Intermediate" />
                      <SkillBadge name="Docker" level="Intermediate" />
                      <SkillBadge name="GitLab Runner" level="Intermediate" />
                    </div>
                  </TabsContent>
                  <TabsContent value="tools" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">Tools & Others</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <SkillBadge name="Slack" level="Intermediate" />
                      <SkillBadge name="Notion" level="Intermediate" />
                      <SkillBadge name="Terminus" level="Intermediate" />
                      <SkillBadge name="DBeaver" level="Intermediate" />
                      <SkillBadge name="Postman" level="Intermediate" />
                      <SkillBadge name="VS Code" level="Intermediate" />
                      <SkillBadge name="Intellij IDEA" level="Intermediate" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">교육</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid gap-6">
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        부스트캠프 AI Tech
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        부스트캠프 AI Tech 5기 (수료)
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">2023</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    네이버 커넥트재단 주관
                    <br />
                    RecSys(추천 시스템) 트랙
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        동국대학교
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        통계학과 & 데이터사이언스소프트웨어연계전공 (편입학,
                        졸업)
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">2021 - 2023</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    GPA: 3.9/4.5
                    <br />
                    4학년 졸업
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        안양대학교
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        소프트웨어전공 (중퇴)
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">2017 - 2021</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    GPA: 4.02/4.5
                    <br />
                    2학년 수료
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                자격사항
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid gap-6">
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        정보처리기사
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        한국산업인력공단
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">영구</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    취득: 2024.09
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        빅데이터분석기사
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        한국데이터산업진흥원
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">영구</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    취득: 2022.07
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        SQL 개발자 (SQLD)
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        한국데이터산업진흥원
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">영구</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    취득: 2021.12
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        데이터분석 준전문가 (ADsP)
                      </CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        한국데이터산업진흥원
                      </CardDescription>
                    </div>
                    <Badge className="w-fit mt-1 sm:mt-0">영구</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    취득: 2021.09
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">연락</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">연락처</CardTitle>
                  <CardDescription className="text-base">
                    아래의 연락처로 저에게 연락하실 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-4">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-primary shrink-0 border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                    <div>
                      <p className="font-semibold text-base">이메일</p>
                      <p className="text-sm text-muted-foreground">
                        bles@kakao.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-primary shrink-0 border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    <div>
                      <p className="font-semibold text-base">휴대전화</p>
                      <p className="text-sm text-muted-foreground">
                        +821026074948
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full text-primary shrink-0 border-primary/20 hover:bg-primary hover:text-primary-foreground"
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                    <div>
                      <p className="font-semibold text-base">지역</p>
                      <p className="text-sm text-muted-foreground">
                        서울특별시
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="font-semibold text-base mb-3">소셜 프로필</p>
                    <div className="flex gap-3">
                      <Link
                        href="https://github.com/gangjoohyeong"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 border-primary/20"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Button>
                      </Link>
                      <Link
                        href="https://linkedin.com/in/gangjoohyeong"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 border-primary/20"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">
                    이메일 전송
                  </CardTitle>
                  <CardDescription className="text-base">
                    아래 폼을 통해 이메일을 전송하실 수 있습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <form
                    action="https://formspree.io/f/meogwyja"
                    method="POST"
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        성함
                      </label>
                      <input
                        id="name"
                        placeholder="성함을 입력해주세요."
                        name="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        이메일 주소
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="이메일 주소를 입력해주세요."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        내용
                      </label>
                      <textarea
                        id="message"
                        placeholder="내용을 입력해주세요."
                        name="message"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                    >
                      이메일 전송
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 bg-muted/30">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} 강주형. All rights reserved.
          </p>
          {/* <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
