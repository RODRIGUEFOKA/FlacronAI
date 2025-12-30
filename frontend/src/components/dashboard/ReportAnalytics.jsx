import { motion } from 'framer-motion';
import { useMemo } from 'react';

const ReportAnalytics = ({ reports }) => {
  const analytics = useMemo(() => {
    const monthlyData = {};
    const typeBreakdown = {};

    reports.forEach(report => {
      // Monthly trend
      const date = new Date(report.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;

      // Type breakdown
      const type = report.lossType || 'Other';
      typeBreakdown[type] = (typeBreakdown[type] || 0) + 1;
    });

    // Get last 6 months
    const months = Object.keys(monthlyData).sort().slice(-6);
    const values = months.map(m => monthlyData[m]);
    const maxValue = Math.max(...values, 1);

    return {
      monthly: months.map((month, idx) => ({
        label: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' }),
        value: values[idx],
        percentage: (values[idx] / maxValue) * 100
      })),
      types: Object.entries(typeBreakdown).map(([type, count]) => ({
        type,
        count,
        percentage: (count / reports.length) * 100,
        color: getTypeColor(type)
      })).sort((a, b) => b.count - a.count)
    };
  }, [reports]);

  function getTypeColor(type) {
    const colors = {
      'Fire': '#ef4444',
      'Water': '#3b82f6',
      'Wind': '#10b981',
      'Mold': '#8b5cf6',
      'Theft': '#f59e0b',
      'Vandalism': '#ec4899',
      'Other': '#6b7280'
    };
    return colors[type] || '#9ca3af';
  }

  if (reports.length === 0) {
    return (
      <div className="analytics-empty">
        <svg width="64" height="64" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>Generate reports to see analytics</p>

        <style>{`
          .analytics-empty {
            padding: 3rem;
            text-align: center;
            color: #9ca3af;
          }

          .analytics-empty p {
            margin-top: 1rem;
            font-size: 0.95rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-grid">
        {/* Monthly Trend Chart */}
        <div className="analytics-card">
          <h4>Monthly Report Trend</h4>
          <div className="chart-container">
            {analytics.monthly.map((month, index) => (
              <div key={index} className="chart-bar-wrapper">
                <div className="chart-bar">
                  <motion.div
                    className="chart-bar-fill"
                    initial={{ height: 0 }}
                    animate={{ height: `${month.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <span className="bar-value">{month.value}</span>
                  </motion.div>
                </div>
                <span className="chart-label">{month.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Loss Type Breakdown */}
        <div className="analytics-card">
          <h4>Loss Type Distribution</h4>
          <div className="type-breakdown">
            {analytics.types.map((item, index) => (
              <motion.div
                key={item.type}
                className="type-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="type-info">
                  <span className="type-dot" style={{ background: item.color }}></span>
                  <span className="type-name">{item.type}</span>
                </div>
                <div className="type-stats">
                  <span className="type-count">{item.count}</span>
                  <div className="type-bar-container">
                    <motion.div
                      className="type-bar"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    />
                  </div>
                  <span className="type-percentage">{item.percentage.toFixed(1)}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .analytics-container {
          margin: 2rem 0;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .analytics-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 124, 8, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
        }

        [data-theme="dark"] .analytics-card {
          background: rgba(0, 0, 0, 0.4);
        }

        .analytics-card h4 {
          margin: 0 0 1.5rem 0;
          color: #1f2937;
          font-weight: 600;
          font-size: 1.125rem;
        }

        [data-theme="dark"] .analytics-card h4 {
          color: #ffffff;
        }

        .chart-container {
          display: flex;
          align-items: flex-end;
          gap: 1.5rem;
          height: 200px;
        }

        .chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .chart-bar {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px 8px 0 0;
          position: relative;
          display: flex;
          align-items: flex-end;
        }

        [data-theme="dark"] .chart-bar {
          background: rgba(255, 255, 255, 0.05);
        }

        .chart-bar-fill {
          width: 100%;
          background: linear-gradient(180deg, #FF9F40 0%, #FF7C08 100%);
          border-radius: 8px 8px 0 0;
          position: relative;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 0.5rem;
        }

        .bar-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: #000000;
        }

        .chart-label {
          font-size: 0.8125rem;
          color: #6b7280;
          font-weight: 500;
        }

        [data-theme="dark"] .chart-label {
          color: #9ca3af;
        }

        .type-breakdown {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .type-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .type-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .type-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .type-name {
          font-weight: 500;
          color: #374151;
          font-size: 0.95rem;
        }

        [data-theme="dark"] .type-name {
          color: #d1d5db;
        }

        .type-stats {
          display: grid;
          grid-template-columns: 40px 1fr 60px;
          gap: 1rem;
          align-items: center;
        }

        .type-count {
          font-weight: 700;
          color: #1f2937;
          font-size: 0.95rem;
        }

        [data-theme="dark"] .type-count {
          color: #ffffff;
        }

        .type-bar-container {
          height: 8px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        [data-theme="dark"] .type-bar-container {
          background: rgba(255, 255, 255, 0.1);
        }

        .type-bar {
          height: 100%;
          border-radius: 4px;
        }

        .type-percentage {
          text-align: right;
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        [data-theme="dark"] .type-percentage {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .chart-container {
            gap: 1rem;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportAnalytics;
