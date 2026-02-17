"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectCardProps {
  title: string;
  period: string;
  description: React.ReactNode;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  detailContent?: React.ReactNode;
  detailImages?: string[];
}

export default function ProjectCard({
  title,
  period,
  description,
  technologies,
  imageUrl,
  githubUrl,
  liveUrl,
  detailContent,
  detailImages,
}: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-primary/10">
        <div
          className="relative h-48 overflow-hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-bold tracking-tight line-clamp-1">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="text-sm font-medium text-primary">
            {period}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
            {description}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 5).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{technologies.length - 5}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground font-medium"
              >
                상세 보기
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
              <ScrollArea className="max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      {title}
                    </DialogTitle>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium text-primary">{period}</span>
                    </div>
                  </DialogHeader>

                  {/* Image Gallery */}
                  <div className="space-y-4">
                    <div
                      className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted cursor-zoom-in"
                      onClick={() =>
                        setSelectedImage(imageUrl || "/placeholder.svg")
                      }
                    >
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>
                    {detailImages && detailImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {detailImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-video overflow-hidden rounded-md border bg-muted cursor-zoom-in"
                            onClick={() => setSelectedImage(img)}
                          >
                            <Image
                              src={img}
                              alt={`${title} detail ${idx + 1}`}
                              fill
                              className="object-contain transition-transform hover:scale-105"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Description */}
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="text-base leading-relaxed space-y-2">
                        {detailContent || description}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        사용 기술
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1 text-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      {githubUrl && (
                        <Button variant="outline" asChild>
                          <Link
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            GitHub
                          </Link>
                        </Button>
                      )}
                      {liveUrl && (
                        <Button variant="default" asChild>
                          <Link
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Globe className="h-4 w-4" />
                            웹사이트 방문
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          {/* Lightbox Dialog */}
          <Dialog
            open={!!selectedImage}
            onOpenChange={(open) => !open && setSelectedImage(null)}
          >
            <DialogContent className="max-w-[95vw] h-[90vh] p-0 border-none bg-background/50 backdrop-blur-sm shadow-none flex items-center justify-center">
              <div className="relative w-full h-full">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt="Enlarged view"
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex gap-2">
            {githubUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary transition-colors"
                asChild
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {liveUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary transition-colors"
                asChild
              >
                <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">Live Demo</span>
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
