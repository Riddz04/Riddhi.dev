import React, { useRef, useEffect } from 'react';
import SectionDivider from './SectionDivider';
import ProjectCard from './ProjectCard';

const projects = [
  {
    id: 1,
    title: "CaptionizeIt",
    description: "A web app that simplifies adding accurate, timestamped captions to media files using AI-powered transcription and editing tools",
    videoPlaceholder: "https://res.cloudinary.com/dfyuhslyv/video/upload/v1747576801/xyngwlagmolycr5x3osv.mp4",
    techStack: ["Next.js", "Node.js", "AWS-S3", "WhisperX", "FFMPEG", "Tailwind CSS", "Vercel"],
    repoUrl: "https://github.com/Riddz04/CaptionizeIt",
    liveUrl: "https://captionizeit.vercel.app/"
  },
  {
    id: 2,
    title: "Career Compass",
    description: "An AI-powered platform built for the Amdocs Gen AI Hackathon 2024-2025, offering personalized, unbiased career guidance by combining advanced AI with emotional intelligence.",
    videoPlaceholder: "https://res.cloudinary.com/dfyuhslyv/video/upload/v1747576713/mtoefe7k4xiztuske20o.mp4",
    techStack: ["Streamlit", "AWS", "Crew.ai", "Langchain", "Flask", "Grok API"],
    repoUrl: "https://github.com/Riddz04/CAREER-COMPASS-AI",
    liveUrl: "https://www.youtube.com/watch?v=ouY-o1L28Ko"
  },
  {
    id: 3,
    title: "Pig-Fiesta",
    description: "Pig-Fiesta is a fun and interactive dice game where players race to reach 50 points by rolling and holding their luck. 🐷🎲",
    videoPlaceholder: "https://res.cloudinary.com/dfyuhslyv/video/upload/v1747576897/w4cywcinnaogaijkjaog.mp4",
    techStack: ["React-Vite", "Vercel", "Tailwind CSS", "Vanilla.js"],
    repoUrl: "https://github.com/Riddz04/Pig-Fiesta",
    liveUrl: "https://pig-fiesta.vercel.app/"
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (titleRef.current) {
              titleRef.current.classList.add('animate-fade-in');
            }
            if (projectsRef.current) {
              projectsRef.current.classList.add('animate-fade-in');
              
              const projectElements = document.querySelectorAll('.project-card');
              projectElements.forEach((project, index) => {
                setTimeout(() => {
                  (project as HTMLElement).style.opacity = '1';
                  (project as HTMLElement).style.transform = 'translateY(0)';
                }, 300 * index);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <SectionDivider message="Check out my work!" />
      <section 
        id="projects" 
        ref={sectionRef}
        className="py-20 bg-white dark:bg-black"
      >
        <div className="container mx-auto px-6">
          <h2 
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent opacity-0 transform translate-y-10 transition-all duration-700"
          >
            My Projects
          </h2>
          
          <div 
            ref={projectsRef}
            className="grid grid-cols-1 gap-12 max-w-5xl mx-auto opacity-0 transform translate-y-10 transition-all duration-700"
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
