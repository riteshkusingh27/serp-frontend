import { motion } from 'framer-motion';
import { sectionAnim } from '../sections/sectionAnim';
import studentRecordIcon from '../assets/studentrecord.png';
import attendanceIcon from '../assets/attendance.png';
import feesIcon from '../assets/fees.png';
import examIcon from '../assets/exam.png';
import communicationIcon from '../assets/comm.png';
import reportsIcon from '../assets/files.png';
import adminIcon from '../assets/icon.png';

const features = [
  { title: 'Student Records', tag: 'SR', note: 'Profiles, guardians, classes', icon: studentRecordIcon },
  { title: 'Attendance', tag: 'AT', note: 'Daily and period logs', icon: attendanceIcon },
  { title: 'Fees', tag: 'FE', note: 'Invoices and collections', icon: feesIcon },
  { title: 'Exams', tag: 'EX', note: 'Schedules and marks entry', icon: examIcon },
  { title: 'Communication', tag: 'CM', note: 'Notices and messages', icon: communicationIcon },
  { title: 'Reports', tag: 'RP', note: 'Academic and fee reports', icon: reportsIcon },
  { title: 'Administration', tag: 'AD', note: 'Roles, permissions, setup', icon: adminIcon }
];

export function FeaturesSection() {
  return (
    <motion.section id="features" className="card-section" {...sectionAnim}>
      <h2>What the system covers</h2>
      <p className="sub">Scope only. No fluff.</p>
      <div className="feature-grid">
        {features.map((item) => (
          <div key={item.title} className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              {item.icon ? <img src={item.icon} alt="" className="feature-icon-img" /> : item.tag}
            </div>
            <div className="feature-body">
              <div className="feature-title">{item.title}</div>
              <div className="feature-note">{item.note}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
