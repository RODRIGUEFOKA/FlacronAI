import { motion } from 'framer-motion';

export const CardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-header"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
    <div className="skeleton skeleton-button"></div>

    <style>{`
      .skeleton-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
      }

      [data-theme="dark"] .skeleton-card {
        background: rgba(0, 0, 0, 0.4);
        border-color: rgba(255, 124, 8, 0.2);
      }

      .skeleton {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.08) 25%,
          rgba(0, 0, 0, 0.15) 50%,
          rgba(0, 0, 0, 0.08) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      }

      [data-theme="dark"] .skeleton {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.05) 75%
        );
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skeleton-header {
        height: 24px;
        width: 60%;
        margin-bottom: 1rem;
      }

      .skeleton-text {
        height: 16px;
        width: 100%;
        margin-bottom: 0.75rem;
      }

      .skeleton-text.short {
        width: 70%;
      }

      .skeleton-button {
        height: 40px;
        width: 120px;
        margin-top: 1rem;
      }
    `}</style>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="skeleton-stat-card">
    <div className="skeleton skeleton-icon"></div>
    <div className="skeleton-stat-content">
      <div className="skeleton skeleton-stat-value"></div>
      <div className="skeleton skeleton-stat-label"></div>
    </div>

    <style>{`
      .skeleton-stat-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      [data-theme="dark"] .skeleton-stat-card {
        background: rgba(0, 0, 0, 0.4);
        border-color: rgba(255, 124, 8, 0.2);
      }

      .skeleton {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.08) 25%,
          rgba(0, 0, 0, 0.15) 50%,
          rgba(0, 0, 0, 0.08) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      }

      [data-theme="dark"] .skeleton {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.05) 75%
        );
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skeleton-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        flex-shrink: 0;
      }

      .skeleton-stat-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .skeleton-stat-value {
        height: 32px;
        width: 80px;
      }

      .skeleton-stat-label {
        height: 16px;
        width: 120px;
      }
    `}</style>
  </div>
);

export const ReportCardSkeleton = () => (
  <motion.div
    className="skeleton-report-card"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="skeleton skeleton-report-header"></div>
    <div className="skeleton-report-body">
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
    </div>
    <div className="skeleton-report-footer">
      <div className="skeleton skeleton-btn"></div>
      <div className="skeleton skeleton-btn"></div>
      <div className="skeleton skeleton-btn"></div>
    </div>

    <style>{`
      .skeleton-report-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
      }

      [data-theme="dark"] .skeleton-report-card {
        background: rgba(0, 0, 0, 0.4);
        border-color: rgba(255, 124, 8, 0.2);
      }

      .skeleton {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.08) 25%,
          rgba(0, 0, 0, 0.15) 50%,
          rgba(0, 0, 0, 0.08) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
      }

      [data-theme="dark"] .skeleton {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.1) 50%,
          rgba(255, 255, 255, 0.05) 75%
        );
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skeleton-report-header {
        height: 28px;
        width: 50%;
        margin-bottom: 1.5rem;
      }

      .skeleton-report-body {
        margin-bottom: 1.5rem;
      }

      .skeleton-line {
        height: 16px;
        width: 100%;
        margin-bottom: 0.75rem;
      }

      .skeleton-line.short {
        width: 60%;
      }

      .skeleton-report-footer {
        display: flex;
        gap: 0.75rem;
      }

      .skeleton-btn {
        height: 36px;
        width: 80px;
        border-radius: 6px;
      }
    `}</style>
  </motion.div>
);
