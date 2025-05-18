import React, { useRef, useEffect } from 'react';
import SectionDivider from './SectionDivider';

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", , "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Next.js", "Express", "Python", "REST API", "GraphQL"]
  },
  {
    category: "Database",
    skills: ["MongoDB", "MySQL", "Firebase"]
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "Docker", "AWS", "CI/CD", "Vite"]
  }
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (skillsRef.current) {
              skillsRef.current.classList.add('animate-fade-in');
            }
            
            const skillBars = document.querySelectorAll('.skill-item');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                (bar as HTMLElement).style.opacity = '1';
                (bar as HTMLElement).style.transform = 'translateY(0)';
              }, 100 * index);
            });
          }
        });
      },
      { threshold: 0.2 }
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
      <SectionDivider message="What I know?" />
      <section 
        id="skills" 
        ref={sectionRef}
        className="py-20 bg-gray-50 dark:bg-black"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            My Skills
          </h2>
          
          <div 
            ref={skillsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto opacity-0 transform translate-y-10 transition-all duration-700"
          >
            {skillsData.map((category, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIdx) => (
                    <div 
                      key={skillIdx} 
                      className="skill-item opacity-0 transform translate-y-4 transition-all duration-500"
                      style={{ transitionDelay: `${skillIdx * 100}ms` }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full" 
                          style={{ 
                            width: `${90 - skillIdx * 5}%`,
                            transition: "width 1s ease-in-out"
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;