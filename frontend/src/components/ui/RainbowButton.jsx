import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RainbowButton = ({ children, to, href, onClick, className = '' }) => {
  const ButtonComponent = to ? Link : href ? 'a' : 'button';
  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <ButtonComponent
      {...linkProps}
      onClick={onClick}
      className={`rainbow-button-wrapper ${className}`}
    >
      <motion.div
        className="rainbow-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated rainbow border */}
        <motion.div
          className="rainbow-border"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Button content */}
        <div className="rainbow-content">
          {children}
        </div>

        {/* Shimmer effect */}
        <motion.div
          className="rainbow-shimmer"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      </motion.div>

      <style jsx>{`
        .rainbow-button-wrapper {
          position: relative;
          display: inline-block;
          text-decoration: none;
        }

        .rainbow-button {
          position: relative;
          padding: 1.5rem 3.5rem;
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 50%, #FFFFFF 100%);
          border-radius: 100px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 0 40px rgba(255, 124, 8, 0.6);
          transition: box-shadow 0.3s ease;
        }

        .rainbow-button:hover {
          box-shadow: 0 0 60px rgba(255, 124, 8, 0.9);
        }

        .rainbow-border {
          position: absolute;
          inset: -3px;
          background: conic-gradient(
            from 0deg,
            #FF7C08,
            #FFFFFF,
            #FF9F40,
            #FF7C08
          );
          border-radius: 100px;
          z-index: -1;
          filter: blur(8px);
        }

        .rainbow-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.15rem;
          color: #000000;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }

        .rainbow-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          z-index: 3;
          pointer-events: none;
        }
      `}</style>
    </ButtonComponent>
  );
};

export default RainbowButton;
