import { motion } from 'framer-motion';

const ShimmerButton = ({ children, href, onClick, className = '' }) => {
  const ButtonComponent = href ? 'a' : 'button';
  const linkProps = href ? { href } : {};

  return (
    <ButtonComponent
      {...linkProps}
      onClick={onClick}
      className={`shimmer-button-wrapper ${className}`}
    >
      <motion.div
        className="shimmer-button"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shimmer effect layer 1 */}
        <motion.div
          className="shimmer-layer shimmer-layer-1"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
          }}
        />

        {/* Shimmer effect layer 2 */}
        <motion.div
          className="shimmer-layer shimmer-layer-2"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0.5,
            delay: 0.3,
          }}
        />

        {/* Border glow */}
        <div className="shimmer-border" />

        {/* Content */}
        <div className="shimmer-content">
          {children}
        </div>
      </motion.div>

      <style jsx>{`
        .shimmer-button-wrapper {
          position: relative;
          display: inline-block;
          text-decoration: none;
        }

        .shimmer-button {
          position: relative;
          padding: 1.5rem 3.5rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 124, 8, 0.3);
          border-radius: 100px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shimmer-button:hover {
          background: rgba(255, 124, 8, 0.1);
          border-color: rgba(255, 124, 8, 0.6);
          box-shadow: 0 0 30px rgba(255, 124, 8, 0.3);
        }

        .shimmer-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .shimmer-layer-1 {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 124, 8, 0.4),
            transparent
          );
        }

        .shimmer-layer-2 {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
        }

        .shimmer-border {
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            135deg,
            rgba(255, 124, 8, 0.2),
            rgba(255, 255, 255, 0.1),
            rgba(255, 124, 8, 0.2)
          );
          border-radius: 100px;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .shimmer-button:hover .shimmer-border {
          opacity: 1;
        }

        .shimmer-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 1.15rem;
          color: #FFFFFF;
        }
      `}</style>
    </ButtonComponent>
  );
};

export default ShimmerButton;
