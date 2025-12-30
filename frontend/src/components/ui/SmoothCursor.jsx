import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const SmoothCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.closest('a, button, [role="button"]');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile devices
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer cursor ring */}
      <motion.div
        className="smooth-cursor-ring"
        style={{
          left: cursorX,
          top: cursorY,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Inner cursor dot */}
      <motion.div
        className="smooth-cursor-dot"
        style={{
          left: cursorX,
          top: cursorY,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Cursor trail effect */}
      <motion.div
        className="smooth-cursor-trail"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        .smooth-cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 124, 8, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10000;
          mix-blend-mode: difference;
          transition: border-color 0.2s ease;
        }

        .smooth-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #FF7C08;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10001;
          box-shadow: 0 0 10px rgba(255, 124, 8, 0.8);
        }

        .smooth-cursor-trail {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(
            circle,
            rgba(255, 124, 8, 0.3) 0%,
            transparent 70%
          );
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
        }

        @media (max-width: 768px) {
          .smooth-cursor-ring,
          .smooth-cursor-dot,
          .smooth-cursor-trail {
            display: none;
          }

          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default SmoothCursor;
