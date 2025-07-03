import { Navigation } from './components/Navigation'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { ValueProposition } from './sections/ValueProposition'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { useDarkMode } from './hooks/useDarkMode'
import { Clouds } from './components/Clouds'
import { Stars } from './components/Stars'
import { Aurora } from './components/Aurora'
import { useScroll } from 'framer-motion'

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <Aurora />
      <Stars />
      <Clouds scrollYProgress={scrollYProgress} />
      <div className="relative z-10">
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <section id="home">
            <Hero />
          </section>
          
          <section id="about">
            <About />
          </section>
          
          <section id="value-proposition">
            <ValueProposition />
          </section>
          
          <section id="skills">
            <Skills />
          </section>
          
          {/* <section id="projects">
            <Projects />
          </section> */}
          
          <section id="experience">
            <Experience />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-300">
              © 2024 Portfolio. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
