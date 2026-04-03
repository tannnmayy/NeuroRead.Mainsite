/**
 * Learning Mode: dashboard with 4 feature cards + module pages.
 * Dark theme, soft orange (clay) accents, Framer Motion, dyslexia-friendly.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LearningDashboard from './learning/LearningDashboard';
import ModulePhonics from './learning/ModulePhonics';
import ModuleSpelling from './learning/ModuleSpelling';
import ModuleComprehension from './learning/ModuleComprehension';
import ModuleReading from './learning/ModuleReading';

export default function LearningMode({ active, childId = 'demo-user-001' }) {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'phonics' | 'spelling' | 'comprehension' | 'reading'

  const openModule = (module) => {
    setView(module);
  };

  const backToDashboard = () => {
    setView('dashboard');
  };

  return (
    <div
      id="content-learning"
      className={`col-start-1 row-start-1 transition-all duration-700 ease-spring ${
        active ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-8 pointer-events-none z-0'
      }`}
    >
      <div className="bg-charcoal rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[480px]">
        <div className="absolute inset-0 z-0 bg-moss/5 mix-blend-multiply border border-cream/5 rounded-[3rem]" />
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="mb-12 text-center max-w-2xl mx-auto">
                  <span className="font-mono text-xs text-clay uppercase tracking-wider mb-4 block">Learning Mode</span>
                  <h2 className="font-medium text-4xl tracking-tight text-cream mb-4">Learn & Play</h2>
                  <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                    For early readers. Playful yet precise to build literacy skills.
                  </p>
                </div>
                <LearningDashboard childId={childId} onOpenModule={openModule} />
              </motion.div>
            )}
            {view === 'phonics' && (
              <motion.div
                key="phonics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ModulePhonics onBack={backToDashboard} childId={childId} />
              </motion.div>
            )}
            {view === 'spelling' && (
              <motion.div
                key="spelling"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ModuleSpelling onBack={backToDashboard} childId={childId} />
              </motion.div>
            )}
            {view === 'comprehension' && (
              <motion.div
                key="comprehension"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ModuleComprehension onBack={backToDashboard} childId={childId} />
              </motion.div>
            )}
            {view === 'reading' && (
              <motion.div
                key="reading"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ModuleReading onBack={backToDashboard} childId={childId} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
