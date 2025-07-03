import { motion } from 'framer-motion';
import { GlowCard } from '../components/GlowCard';
import { personalInfo } from '../data/portfolio';

export const About = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate about creating innovative solutions that make a difference
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlowCard className="p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {personalInfo.description}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  With a strong foundation in both frontend and backend technologies, 
                  I specialize in creating seamless user experiences while ensuring 
                  robust and scalable backend solutions.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Problem Solving', 'Team Leadership', 'Innovation', 'Continuous Learning'].map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <GlowCard className="p-6 text-center">
                <h4 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</h4>
                <p className="text-gray-600 dark:text-gray-300">Years Experience</p>
              </GlowCard>
              <GlowCard className="p-6 text-center">
                <h4 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50+</h4>
                <p className="text-gray-600 dark:text-gray-300">Projects Completed</p>
              </GlowCard>
              <GlowCard className="p-6 text-center">
                <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10+</h4>
                <p className="text-gray-600 dark:text-gray-300">Technologies</p>
              </GlowCard>
              <GlowCard className="p-6 text-center">
                <h4 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</h4>
                <p className="text-gray-600 dark:text-gray-300">Client Satisfaction</p>
              </GlowCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};