import { motion } from 'framer-motion';
import { sectionAnim } from '../sections/sectionAnim';

const supportChannels = [
  { label: 'Email', value: 'erpserpvidya@gmail.com' },
  { label: 'Phone', value: '+91-XXXXXXXXXX' },
  { label: 'WhatsApp', value: 'Message us for quick help' }
];

export function SupportSection() {
  return (
    <motion.section id="support" className="card-section muted" {...sectionAnim}>
      <h2>Support channels</h2>
      <div className="contact-grid">
        {supportChannels.map((item) => (
          <div key={item.label} className="contact-card">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
