import { motion } from 'framer-motion';

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      className="review-card-3d"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, rotateY: 5 }}
    >
      {/* Card Header */}
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">{review.initials}</div>
          <div className="reviewer-details">
            <h4 className="reviewer-name">
              {review.name}
              {review.verified && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="verified-badge">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#FF7C08"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </h4>
            <p className="reviewer-role">{review.role}</p>
            <p className="reviewer-company">{review.company}</p>
          </div>
        </div>

        {/* AI Verified Tag */}
        {review.aiVerified && (
          <div className="ai-verified-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                stroke="#FF7C08"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            AI-Verified
          </div>
        )}
      </div>

      {/* Star Rating */}
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={i < review.rating ? '#FF7C08' : 'none'}
            stroke={i < review.rating ? '#FF7C08' : 'rgba(255, 255, 255, 0.3)'}
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="review-text">{review.text}</p>

      {/* Review Footer */}
      <div className="review-footer">
        <div className="review-use-case">{review.useCase}</div>
        <div className="review-date">{review.date}</div>
      </div>

      {/* Glassmorphic border glow */}
      <div className="review-border-glow" />

      <style jsx>{`
        .review-card-3d {
          position: relative;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 2rem;
          width: 420px;
          min-height: 320px;
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          perspective: 1000px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .review-card-3d:hover {
          border-color: rgba(255, 124, 8, 0.3);
          box-shadow: 0 25px 70px rgba(255, 124, 8, 0.2);
        }

        .review-border-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(
            135deg,
            transparent,
            rgba(255, 124, 8, 0.15),
            transparent
          );
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .review-card-3d:hover .review-border-glow {
          opacity: 1;
        }

        .review-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .reviewer-info {
          display: flex;
          gap: 1rem;
        }

        .reviewer-avatar {
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

        .reviewer-details {
          flex: 1;
        }

        .reviewer-name {
          font-size: 1rem;
          font-weight: 600;
          color: #FFFFFF;
          margin: 0 0 0.25rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .verified-badge {
          flex-shrink: 0;
        }

        .reviewer-role {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 0.125rem 0;
        }

        .reviewer-company {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .ai-verified-tag {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 124, 8, 0.1);
          border: 1px solid rgba(255, 124, 8, 0.3);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #FF7C08;
          white-space: nowrap;
        }

        .review-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }

        .review-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 1.5rem 0;
        }

        .review-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .review-use-case {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 124, 8, 0.8);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .review-date {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .review-card-3d {
            width: 340px;
            padding: 1.5rem;
          }

          .reviewer-avatar {
            width: 40px;
            height: 40px;
            font-size: 0.8rem;
          }

          .review-text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ReviewCard;
