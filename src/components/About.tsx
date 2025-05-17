import React, { useRef, useEffect } from 'react';
import SectionDivider from './SectionDivider';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (textRef.current) {
              textRef.current.classList.add('animate-fade-in');
            }
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
      <SectionDivider message="Who am I?" />
      <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div 
            ref={textRef}
            className="max-w-3xl mx-auto opacity-0 transform translate-y-10 transition-all duration-700"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Salve! I'm Riddhi, a passionate full-stack developer with a love for creating elegant solutions to complex problems. I enjoy building applications from the ground up, from designing the architecture to polishing the user interface.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              My journey in software development began with a curiosity about how things work behind the scenes. That curiosity has evolved into a career where I get to build meaningful digital experiences that solve real problems.
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300">
              When I'm not coding, you can find me irritating Oreo 🐶 or thinking of any new idea to curate. I believe in continuous learning and pushing the boundaries of what's possible with code.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;