import { motion } from 'framer-motion';

const PricingToggle = ({ isAnnual, setIsAnnual }) => {
  return (
    <div className="pricing-toggle-container">
      <div className="pricing-toggle-wrapper">
        <button
          className={`toggle-option ${!isAnnual ? 'active' : ''}`}
          onClick={() => setIsAnnual(false)}
        >
          Bill Monthly
        </button>
        <button
          className={`toggle-option ${isAnnual ? 'active' : ''}`}
          onClick={() => setIsAnnual(true)}
        >
          Bill Annually
          <span className="savings-badge">Save 20%</span>
        </button>

        {/* Animated slider */}
        <motion.div
          className="toggle-slider"
          animate={{
            x: isAnnual ? '100%' : '0%',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      <style jsx>{`
        .pricing-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 4rem;
        }

        .pricing-toggle-wrapper {
          position: relative;
          display: inline-flex;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 124, 8, 0.2);
          border-radius: 100px;
          padding: 0.5rem;
          gap: 0.5rem;
        }

        .toggle-option {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 2rem;
          background: transparent;
          border: none;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: color 0.3s ease;
          white-space: nowrap;
        }

        .toggle-option.active {
          color: #000000;
        }

        .toggle-option:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .toggle-option.active:hover {
          color: #000000;
        }

        .savings-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #FF7C08;
          color: #000000;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .toggle-slider {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          width: calc(50% - 0.5rem);
          height: calc(100% - 1rem);
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          border-radius: 100px;
          z-index: 1;
          box-shadow: 0 4px 20px rgba(255, 124, 8, 0.4);
        }

        @media (max-width: 640px) {
          .toggle-option {
            padding: 0.65rem 1.5rem;
            font-size: 0.85rem;
          }

          .savings-badge {
            font-size: 0.7rem;
            padding: 0.2rem 0.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PricingToggle;
