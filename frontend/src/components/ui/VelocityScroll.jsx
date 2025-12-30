import { motion } from 'framer-motion';

const VelocityScroll = ({ text = "TRUSTED BY ENTERPRISE LEADERS • POWERED BY INDUSTRY GIANTS •" }) => {
  // Duplicate text for seamless scrolling
  const repeatedText = Array(20).fill(text).join(' ');

  return (
    <div className="velocity-scroll-container">
      <motion.div
        className="velocity-scroll-track"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <span className="velocity-scroll-text">{repeatedText}</span>
      </motion.div>

      <style jsx>{`
        .velocity-scroll-container {
          width: 100%;
          padding: 2.5rem 0;
          overflow: hidden;
          position: relative;
        }

        .velocity-scroll-track {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
        }

        .velocity-scroll-text {
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.15);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        @media (max-width: 768px) {
          .velocity-scroll-container {
            padding: 2rem 0;
          }

          .velocity-scroll-text {
            font-size: 0.875rem;
            letter-spacing: 0.12em;
          }
        }
      `}</style>
    </div>
  );
};

export default VelocityScroll;
