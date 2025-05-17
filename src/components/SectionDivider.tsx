import React from 'react';

interface SectionDividerProps {
  message: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ message }) => {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white dark:bg-gray-900 px-4 text-lg text-gray-600 dark:text-gray-400 italic">
          {message}
        </span>
      </div>
    </div>
  );
};

export default SectionDivider;