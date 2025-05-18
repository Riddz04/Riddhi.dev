import React, { useState, useEffect, useRef } from 'react';

const FloatingLogo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasBeenMoved, setHasBeenMoved] = useState(false);
  const animationFrameRef = useRef<number>();
  const logoRef = useRef<HTMLDivElement>(null);

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
      y: e.clientY - position.y
    });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setPosition(newPosition);
      setHasBeenMoved(true);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (!hasBeenMoved) {
      setHasBeenMoved(true);
      animate();
    }
  };

  const animate = () => {
    if (!logoRef.current || isDragging) return;

    const logoRect = logoRef.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newPosition = { ...position };
    let newVelocity = { ...velocity };

    // Update position
    newPosition.x += newVelocity.x;
    newPosition.y += newVelocity.y;

    // Check for collisions with window boundaries
    if (newPosition.x <= 0 || newPosition.x + logoRect.width >= windowWidth) {
      newVelocity.x = -newVelocity.x;
    }
    if (newPosition.y <= 0 || newPosition.y + logoRect.height >= windowHeight) {
      newVelocity.y = -newVelocity.y;
    }

    // Keep logo within bounds
    newPosition.x = Math.max(0, Math.min(windowWidth - logoRect.width, newPosition.x));
    newPosition.y = Math.max(0, Math.min(windowHeight - logoRect.height, newPosition.y));

    setPosition(newPosition);
    setVelocity(newVelocity);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (hasBeenMoved && !isDragging) {
      animate();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasBeenMoved, isDragging]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

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
        transition: isDragging ? 'none' : 'transform 0.1s linear'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
        RD
      </div>
      {isVisible && !hasBeenMoved && (
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ✨ Play with me! Drag and drop anywhere
          </p>
        </div>
      )}
    </div>
  );
};

export default FloatingLogo;