import { motion } from 'framer-motion';

const SecurityBadges = () => {
  const badges = [
    { name: 'SOC 2 Type II', icon: '🔒' },
    { name: 'GDPR Compliant', icon: '🛡️' },
    { name: 'ISO 27001', icon: '✓' },
    { name: 'HIPAA Ready', icon: '🏥' },
  ];

  return (
    <motion.div
      className="security-badges-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="security-title">Trusted by enterprises worldwide</p>
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            className="badge-item"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <span className="badge-icon">{badge.icon}</span>
            <span className="badge-name">{badge.name}</span>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .security-badges-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 3rem 2rem;
          text-align: center;
        }

        .security-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .badge-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 124, 8, 0.15);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .badge-item:hover {
          border-color: rgba(255, 124, 8, 0.4);
          box-shadow: 0 10px 30px rgba(255, 124, 8, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }

        .badge-icon {
          font-size: 1.25rem;
          filter: grayscale(0.3);
        }

        .badge-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .security-badges-container {
            padding: 2rem 1rem;
          }

          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .badge-item {
            padding: 0.875rem 1rem;
            flex-direction: column;
            gap: 0.5rem;
          }

          .badge-name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .badges-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default SecurityBadges;
