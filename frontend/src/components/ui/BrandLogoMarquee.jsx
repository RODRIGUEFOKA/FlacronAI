import { motion } from 'framer-motion';

const BrandLogoMarquee = () => {
  const brands = [
    { name: 'IBM' },
    { name: 'Microsoft' },
    { name: 'watsonx' }
  ];

  // Duplicate for seamless scroll
  const allBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="brand-marquee-wrapper">
      <div className="brand-marquee-container">
        <motion.div
          className="brand-marquee-track"
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop'
          }}
        >
          {allBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="brand-item">
              {brand.name}
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .brand-marquee-wrapper {
          position: relative;
          width: 100%;
          padding: 4rem 0;
        }

        .brand-marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          z-index: 1;

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .brand-marquee-track {
          display: flex;
          align-items: center;
          gap: 8rem;
          width: max-content;
          will-change: transform;
        }

        .brand-item {
          flex-shrink: 0;
          font-size: 2.8rem;
          font-weight: 700;
          color: #FFFFFF;
          opacity: 0.7;
          transition: all 0.3s ease;
          letter-spacing: -0.02em;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          white-space: nowrap;
        }

        .brand-item:hover {
          opacity: 1;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .brand-marquee-wrapper {
            padding: 3rem 0;
          }

          .brand-marquee-track {
            gap: 5rem;
          }

          .brand-item {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BrandLogoMarquee;
