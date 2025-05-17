import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingLogo from './components/FloatingLogo';

function App() {
  return (
    <ThemeProvider>
      <div className="font-sans text-gray-900 dark:text-white bg-white dark:bg-black min-h-screen">
        <Header />
        <FloatingLogo />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;