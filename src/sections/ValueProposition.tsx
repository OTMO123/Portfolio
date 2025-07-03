import { motion } from 'framer-motion';
import { GlowCard } from '../components/GlowCard';

export const ValueProposition = () => {
  const metrics = [
    {
      percentage: '60%',
      title: 'Снижение затрат',
      subtitle: 'Автоматизация процессов',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      percentage: '85%',
      title: 'Точность прогнозов',
      subtitle: 'Модели машинного обучения',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      percentage: '20%',
      title: 'Ускорение поставки',
      subtitle: 'Оптимизация процессов',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      percentage: '100%',
      title: 'Удержание клиентов',
      subtitle: 'Качественные решения',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  const roiTimeline = [
    {
      period: '1-3 месяца',
      result: 'Окупаемость + 15%',
      description: 'Быстрый запуск и первые результаты'
    },
    {
      period: '4-6 месяцев',
      result: 'ROI x2',
      description: 'Полная интеграция решений'
    },
    {
      period: '7-12 месяцев',
      result: 'ROI x3+',
      description: 'Масштабирование и оптимизация'
    }
  ];

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
            Почему я?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Я забочусь о ROI клиента - хорошая работа должна приносить хорошую прибыль
          </p>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <GlowCard className="p-8 text-center h-full">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${metric.bgColor} ${metric.color} mb-4`}>
                  TOP 10%
                </div>
                <h3 className={`text-4xl md:text-5xl font-bold ${metric.color} mb-2`}>
                  {metric.percentage}
                </h3>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {metric.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {metric.subtitle}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ROI Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            График возврата инвестиций
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roiTimeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                viewport={{ once: true }}
              >
                <GlowCard className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.period}
                  </h4>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {item.result}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.description}
                  </p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};