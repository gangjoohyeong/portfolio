import { Fragment } from "react";
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
import { portfolioData } from "@/data/portfolio-data";

function calculateExperienceDuration() {
  const start = new Date(2023, 9);
  const now = new Date();
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  months = (months % 12) + 1;

  return `${years > 0 ? `${years}년 ` : ""}${
    months > 0 ? `${months}개월` : ""
  }`;
}

function renderProjectDescription(descriptions: string[]) {
  const [intro, ...items] = descriptions;
  return (
    <>
      {intro}
      {items.map((item, i) => {
        const colonIdx = item.indexOf(": ");
        return (
          <Fragment key={i}>
            <br />
            {i + 1}.{" "}
            {colonIdx !== -1 ? (
              <>
                <strong>{item.slice(0, colonIdx + 1)}</strong>
                {item.slice(colonIdx + 1)}
              </>
            ) : (
              item
            )}
          </Fragment>
        );
      })}
    </>
  );
}

function categoryToTabValue(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const tabsGridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function Home() {
  const d = portfolioData;

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
              href="#academic"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              학력사항
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
              href="#activities"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              대외활동
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
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24 space-y-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="flex justify-center"></div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
                개발자 <span className="text-primary">{d.personal.name}</span>
                입니다.
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                {d.personal.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed md:leading-loose">
                {calculateExperienceDuration()}의 RAG, 챗봇 등 AI 솔루션 제품
                개발 경험을 가지고 있고,
                <br />
                현재는 AI Agent 개발에 중점을 두고 있습니다.
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
                href={d.personal.github}
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
                href={d.personal.linkedin}
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
              <Link href={`mailto:${d.personal.email}`}>
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
                  안녕하세요. 개발자{" "}
                  <span className="text-primary font-semibold">강주형</span>
                  입니다. <br />
                  주로 AI 도메인의 솔루션 개발과 연구를 수행했습니다.
                </p>

                <div className="space-y-5 text-base md:text-lg leading-relaxed md:leading-loose text-card-foreground/90">
                  <p>
                    최근에는 MCP를 활용한 AI 에이전트 개발과 더불어, 이를
                    효율적으로 배포할 수 있는 Kubernetes 환경 위에 Langflow
                    기반의 플레이그라운드를 구축하는 데 집중하고 있습니다.
                  </p>

                  <p>
                    이전에는 AI 도메인 솔루션의 개발 및 유지보수를 수행하며
                    탄탄한 기술적 기반을 쌓았습니다. 주로 Java/Spring과
                    Python/FastAPI를 활용해 서버를 구축했으며, 프론트엔드는
                    AI-driven 개발을 통해 React/Next.js 기반의 화면을 빠르게
                    프로토타이핑하고 완성도 있게 구현했습니다.
                  </p>

                  <p>
                    최신 AI 동향을 꾸준히 탐색해 팀원들과 활발히 공유하고,
                    실무에 적용 가치가 있는 기술은 선별해 적극적으로 도입을
                    검토합니다.
                  </p>
                  <p>
                    이 페이지는{" "}
                    <a
                      href="https://v0.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      v0
                    </a>
                    와{" "}
                    <a
                      href="https://antigravity.google/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80"
                    >
                      Antigravity
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
              {d.experiences.map((exp, i) => (
                <ExperienceCard key={i} {...exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Academic Background Section */}
        <section id="academic" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                학력사항
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid gap-6">
              {d.academicBackground.map((edu, i) => (
                <Card
                  key={i}
                  className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {edu.title}
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          {edu.subtitle}
                        </CardDescription>
                      </div>
                      <Badge className="w-fit mt-1 sm:mt-0">{edu.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {edu.details.map((detail, j) => (
                        <Fragment key={j}>
                          {j > 0 && <br />}
                          {detail}
                        </Fragment>
                      ))}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
            {d.projects.map((proj, i) => (
              <ProjectCard
                key={i}
                title={proj.title}
                period={proj.period}
                description={renderProjectDescription(proj.descriptions)}
                technologies={proj.technologies}
                imageUrl={proj.imageUrl ?? "/placeholder.svg"}
                detailImages={proj.detailImages}
                githubUrl={proj.githubUrl}
                liveUrl={proj.liveUrl}
              />
            ))}
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
                <Tabs
                  defaultValue={categoryToTabValue(
                    d.skillCategories[0].category,
                  )}
                  className="w-full"
                >
                  <TabsList
                    className={`grid w-full ${tabsGridCols[d.skillCategories.length] ?? "grid-cols-4"}`}
                  >
                    {d.skillCategories.map((cat) => (
                      <TabsTrigger
                        key={cat.category}
                        value={categoryToTabValue(cat.category)}
                      >
                        {cat.category.replace(" (DevOps)", "")}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {d.skillCategories.map((cat) => (
                    <TabsContent
                      key={cat.category}
                      value={categoryToTabValue(cat.category)}
                      className="mt-6 space-y-4"
                    >
                      <h3 className="text-xl font-semibold">
                        {cat.category} 기술 스택
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {cat.skills.map((skill) => (
                          <SkillBadge
                            key={skill.name}
                            name={skill.name}
                            level={skill.level}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-12 scroll-mt-20">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-extrabold tracking-tight">
                대외활동
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
            <div className="grid gap-6">
              {d.activities.map((act, i) => (
                <Card
                  key={i}
                  className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {act.title}
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          {act.subtitle}
                        </CardDescription>
                      </div>
                      <Badge className="w-fit mt-1 sm:mt-0">{act.period}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {act.details.map((detail, j) => (
                        <Fragment key={j}>
                          {j > 0 && <br />}
                          {detail}
                        </Fragment>
                      ))}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
              {d.certificates.map((cert, i) => (
                <Card
                  key={i}
                  className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1 border-primary/10"
                >
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          {cert.title}
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          {cert.issuer}
                        </CardDescription>
                      </div>
                      <Badge className="w-fit mt-1 sm:mt-0">
                        {cert.acquired}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
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
                        {d.personal.email}
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
                        {d.personal.phone}
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
                        {d.personal.location}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="font-semibold text-base mb-3">소셜 프로필</p>
                    <div className="flex gap-3">
                      <Link
                        href={d.personal.github}
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
                        href={d.personal.linkedin}
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
            &copy; {new Date().getFullYear()} {d.personal.name}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
