import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const QuickStatsCards = ({ reports = [], usageStats }) => {
  const totalReports = reports.length;
  const thisWeekReports = reports.filter(r => {
    const reportDate = new Date(r.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return reportDate >= weekAgo;
  }).length;

  const avgGenerationTime = '2.3'; // Could be calculated from actual data
  const reportsThisMonth = usageStats?.periodUsage || 0;

  const stats = [
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Total Reports',
      value: totalReports,
      color: '#FF7C08',
      bgGradient: 'linear-gradient(135deg, rgba(255, 124, 8, 0.1), rgba(255, 159, 64, 0.1))'
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      label: 'This Week',
      value: thisWeekReports,
      color: '#10b981',
      bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))'
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Avg. Time',
      value: avgGenerationTime,
      suffix: 's',
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))'
    },
    {
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'This Month',
      value: reportsThisMonth,
      color: '#8b5cf6',
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))'
    }
  ];

  return (
    <div className="quick-stats-grid">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="quick-stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)' }}
        >
          <div className="stat-icon" style={{ color: stat.color, background: stat.bgGradient }}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <h4 className="stat-value" style={{ color: stat.color }}>
              <AnimatedCounter end={typeof stat.value === 'number' ? stat.value : parseFloat(stat.value)} suffix={stat.suffix || ''} />
            </h4>
            <p className="stat-label">{stat.label}</p>
          </div>
        </motion.div>
      ))}

      <style>{`
        .quick-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .quick-stat-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        [data-theme="dark"] .quick-stat-card {
          background: rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 124, 8, 0.2);
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
        }

        [data-theme="dark"] .stat-label {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .quick-stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .quick-stat-card {
            padding: 1rem;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
          }

          .stat-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickStatsCards;
