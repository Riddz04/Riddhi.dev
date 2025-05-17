import React from 'react';
import { Github, Linkedin, Twitter, Facebook, Instagram, ExternalLink } from 'lucide-react';

// Social links data
const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com', 
    icon: <Github className="h-5 w-5" /> 
  },
  { 
    name: 'LinkedIn', 
    url: 'https://linkedin.com', 
    icon: <Linkedin className="h-5 w-5" /> 
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com', 
    icon: <Twitter className="h-5 w-5" /> 
  },
  { 
    name: 'LeetCode', 
    url: 'https://leetcode.com', 
    icon: <ExternalLink className="h-5 w-5" /> 
  },
  { 
    name: 'Instagram', 
    url: 'https://instagram.com', 
    icon: <Instagram className="h-5 w-5" /> 
  },
  { 
    name: 'Facebook', 
    url: 'https://facebook.com', 
    icon: <Facebook className="h-5 w-5" /> 
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 md:mb-0">
            RD
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition-colors duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Riddhi Dhawan. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;