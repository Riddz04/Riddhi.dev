import React, { useState, useEffect, useRef } from 'react';

const FloatingLogo: React.FC = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number>();
  const logoRef = useRef<HTMLDivElement>(null);

  // Show only after scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    animate(); // Resume bouncing
  };

  const animate = () => {
    if (!logoRef.current || isDragging) return;

    const logoRect = logoRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newPosition = { ...position };
    let newVelocity = { ...velocity };

    newPosition.x += newVelocity.x;
    newPosition.y += newVelocity.y;

    // Bounce off walls
    if (newPosition.x <= 0 || newPosition.x + logoRect.width >= windowWidth) {
      newVelocity.x *= -1;
    }
    if (newPosition.y <= 0 || newPosition.y + logoRect.height >= windowHeight) {
      newVelocity.y *= -1;
    }

    newPosition.x = Math.max(0, Math.min(windowWidth - logoRect.width, newPosition.x));
    newPosition.y = Math.max(0, Math.min(windowHeight - logoRect.height, newPosition.y));

    setPosition(newPosition);
    setVelocity(newVelocity);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isDragging) {
      animate();
    }
    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Start animation on mount
  useEffect(() => {
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={logoRef}
      className={`fixed z-50 cursor-move select-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(0, 0)',
        transition: isDragging ? 'none' : 'transform 0.1s linear',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
        RD
      </div>
    </div>
  );
};

export default FloatingLogo;
