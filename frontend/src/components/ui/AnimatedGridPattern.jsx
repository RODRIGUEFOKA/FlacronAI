import { motion } from 'framer-motion';

const AnimatedGridPattern = () => {
  return (
    <div className="animated-grid-pattern">
      <svg
        className="grid-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255, 124, 8, 0.1)"
              strokeWidth="0.5"
              animate={{
                strokeOpacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </pattern>

          <pattern
            id="grid-highlight"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <motion.rect
              width="1"
              height="1"
              fill="#FF7C08"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          </pattern>

          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="20%" stopColor="black" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="gridRadialFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0" />
            <stop offset="70%" stopColor="black" stopOpacity="0.5" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridFade)" opacity="0.8" />
        <rect width="100%" height="100%" fill="url(#gridRadialFade)" opacity="0.3" />
      </svg>

      {/* Animated grid lines that move */}
      <motion.div
        className="grid-line-vertical"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="grid-line-horizontal"
        animate={{
          y: ['-100%', '200%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <style jsx>{`
        .animated-grid-pattern {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .grid-svg {
          width: 100%;
          height: 100%;
        }

        .grid-line-vertical,
        .grid-line-horizontal {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(255, 124, 8, 0.3), transparent);
          pointer-events: none;
        }

        .grid-line-vertical {
          width: 2px;
          height: 100%;
          left: 50%;
        }

        .grid-line-horizontal {
          width: 100%;
          height: 2px;
          top: 50%;
        }
      `}</style>
    </div>
  );
};

export default AnimatedGridPattern;
