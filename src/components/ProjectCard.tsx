import React from 'react';
import { Github, ExternalLink, Play } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  videoPlaceholder: string;
  techStack: string[];
  repoUrl: string;
  liveUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden opacity-0 transform translate-y-8 transition-all duration-700 hover:shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video/Image container */}
        <div className="relative overflow-hidden group">
          {project.videoPlaceholder.endsWith(".mp4") ? (
            <video
              src={project.videoPlaceholder}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
            />
          ) : (
            <img
              src={project.videoPlaceholder}
              alt={project.title}
              className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
            />
          )}


          {/* Play overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          {/* Links overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white p-2 rounded-full hover:bg-purple-600 transition-colors duration-300"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white p-2 rounded-full hover:bg-purple-600 transition-colors duration-300"
              aria-label="Live Website"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>
          
          {/* Tech stack */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Links for mobile */}
          <div className="md:hidden flex mt-4 space-x-4">
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              <Github className="h-4 w-4 mr-1" /> Repository
            </a>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
            >
              <ExternalLink className="h-4 w-4 mr-1" /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;