import { motion } from 'framer-motion';

const TestimonialScroller = () => {
  const testimonials = [
    {
      quote: "FlacronAI has transformed how we handle customer insights. The AI-driven analytics are incredibly accurate and save us hours every week.",
      author: "Sarah Chen",
      role: "VP of Operations",
      company: "TechVentures Inc.",
      avatar: "SC"
    },
    {
      quote: "The most intuitive AI platform we've used. Implementation was seamless, and the ROI was evident within the first month.",
      author: "Michael Rodriguez",
      role: "CTO",
      company: "DataStream Solutions",
      avatar: "MR"
    },
    {
      quote: "Outstanding support and enterprise-grade security. FlacronAI handles our most sensitive data with complete confidence.",
      author: "Emily Thompson",
      role: "Chief Data Officer",
      company: "FinanceHub",
      avatar: "ET"
    },
  ];

  return (
    <div className="testimonial-scroller-container">
      <motion.div
        className="testimonial-track"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Duplicate testimonials for seamless loop */}
        {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-content">
              <svg className="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 9C11 8.44772 10.5523 8 10 8C9.44772 8 9 8.44772 9 9V10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10V9ZM15 9C15 8.44772 14.5523 8 14 8C13.4477 8 13 8.44772 13 9V10C13 10.5523 13.4477 11 14 11C14.5523 11 15 10.5523 15 10V9Z"
                  fill="#FF7C08"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z"
                  fill="rgba(255, 124, 8, 0.3)"
                />
              </svg>
              <p className="testimonial-quote">{testimonial.quote}</p>
            </div>

            <div className="testimonial-author">
              <div className="author-avatar">{testimonial.avatar}</div>
              <div className="author-info">
                <p className="author-name">{testimonial.author}</p>
                <p className="author-role">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>

            {/* Glassmorphic border glow */}
            <div className="testimonial-border-glow" />
          </div>
        ))}
      </motion.div>

      <style jsx>{`
        .testimonial-scroller-container {
          width: 100%;
          overflow: hidden;
          padding: 4rem 0;
          position: relative;

          /* Gradient fade on edges */
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .testimonial-track {
          display: flex;
          gap: 2rem;
          width: max-content;
        }

        .testimonial-card {
          position: relative;
          width: 450px;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card:hover {
          border-color: rgba(255, 124, 8, 0.3);
          box-shadow: 0 20px 60px rgba(255, 124, 8, 0.15);
          transform: translateY(-4px);
        }

        .testimonial-border-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            135deg,
            transparent,
            rgba(255, 124, 8, 0.1),
            transparent
          );
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .testimonial-card:hover .testimonial-border-glow {
          opacity: 1;
        }

        .testimonial-content {
          margin-bottom: 1.5rem;
        }

        .quote-icon {
          margin-bottom: 1rem;
          opacity: 0.8;
        }

        .testimonial-quote {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: #000000;
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
        }

        .author-role {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .testimonial-scroller-container {
            padding: 3rem 0;
          }

          .testimonial-card {
            width: 350px;
            padding: 2rem;
          }

          .testimonial-quote {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .testimonial-card {
            width: 300px;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialScroller;
