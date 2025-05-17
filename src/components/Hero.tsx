import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Full-Stack Developer 👩🏻‍💻", "Oreo's Mom 🐶", "Cinephile 🎬"];
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Animation for the name
    if (nameRef.current) {
      const letters = nameRef.current.innerText.split('');
      nameRef.current.innerHTML = '';
      
      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.display = 'inline-block';
        span.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        span.style.transitionDelay = `${i * 0.05}s`;
        
        nameRef.current?.appendChild(span);
        
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 100);
      });
    }

    // Role text animation
    let roleInterval: NodeJS.Timeout;
    if (roleRef.current && !animationComplete) {
      roleInterval = setInterval(() => {
        setCurrentRole(prev => {
          if (prev === roles.length - 1) {
            clearInterval(roleInterval);
            setAnimationComplete(true);
            return 0; // Return to Full-Stack Developer
          }
          return prev + 1;
        });
      }, 2000);
    }

    // Photo container animation
    if (photoRef.current) {
      photoRef.current.style.opacity = '0';
      photoRef.current.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        if (photoRef.current) {
          photoRef.current.style.transition = 'opacity 1s ease, transform 1s ease';
          photoRef.current.style.opacity = '1';
          photoRef.current.style.transform = 'scale(1)';
        }
      }, 1500);
    }

    return () => {
      if (roleInterval) clearInterval(roleInterval);
    };
  }, [animationComplete]);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-950">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-300 dark:bg-cyan-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between">
        {/* Text content */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 
            ref={nameRef}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6"
          >
            Riddhi Dhawan
          </h1>
          <div className="inline-block mb-8">
            <div className="relative bg-gradient-to-r from-blue-600/10 to-teal-600/10 dark:from-blue-900/30 dark:to-teal-900/30 rounded-lg backdrop-blur-sm px-4 py-2">
              <p 
                ref={roleRef}
                className="text-xl md:text-2xl font-medium text-gray-800 dark:text-white transform transition-all duration-500 animate-fade-up"
                style={{
                  opacity: animationComplete ? 1 : 0.9
                }}
              >
                {roles[currentRole]}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href="#projects" 
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-full font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transform hover:-translate-y-1 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        {/* Profile photo */}
        <div 
          ref={photoRef}
          className="w-68 h-68 md:w-80 md:h-80 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full overflow-hidden">
            <img
            src="photu2.png" // <-- Replace with your actual image path
            alt="Riddhi"
            className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;