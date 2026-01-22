import { motion } from 'framer-motion';
import { sectionAnim } from '../sections/sectionAnim';

const approachItems = [
  'Education-first mindset',
  'Simple for teachers and staff',
  'Structured and secure school data'
];

export function AboutSection() {
  return (
    <motion.section id="about" className="card-section muted" {...sectionAnim}>
      <h2>Our approach</h2>
      <div className="grid">
        {approachItems.map((item) => (
          <div key={item} className="card">{item}</div>
        ))}
      </div>
    </motion.section>
  );
}
