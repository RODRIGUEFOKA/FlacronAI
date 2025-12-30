import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showNotification } from '../../utils/notifications';

const BulkExport = ({ reports, onExport }) => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const toggleSelect = (reportId) => {
    setSelectedReports(prev =>
      prev.includes(reportId)
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const selectAll = () => {
    setSelectedReports(reports.map(r => r.id));
  };

  const deselectAll = () => {
    setSelectedReports([]);
  };

  const handleBulkExport = async () => {
    if (selectedReports.length === 0) {
      showNotification('Please select at least one report', 'error');
      return;
    }

    setIsExporting(true);
    try {
      await onExport(selectedReports, exportFormat);
      showNotification(`Exported ${selectedReports.length} report(s) as ${exportFormat.toUpperCase()}`, 'success');
      deselectAll();
    } catch (error) {
      showNotification('Failed to export reports', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bulk-export-container">
      <AnimatePresence>
        {selectedReports.length > 0 && (
          <motion.div
            className="bulk-actions-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="selection-info">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{selectedReports.length} report{selectedReports.length > 1 ? 's' : ''} selected</span>
            </div>

            <div className="bulk-actions">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="format-selector"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="html">HTML</option>
              </select>

              <button
                className="btn-bulk-export"
                onClick={handleBulkExport}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <span className="spinner-small"></span>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export ({selectedReports.length})
                  </>
                )}
              </button>

              <button className="btn-deselect" onClick={deselectAll}>
                Clear
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="selection-controls">
        <button onClick={selectAll} className="select-control-btn">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Select All ({reports.length})
          </button>

          {selectedReports.length > 0 && selectedReports.length < reports.length && (
            <span className="selection-count">{selectedReports.length} of {reports.length} selected</span>
          )}
        </div>

      <style>{`
        .bulk-export-container {
          margin-bottom: 1.5rem;
        }

        .bulk-actions-bar {
          background: linear-gradient(135deg, #FF7C08 0%, #FF9F40 100%);
          color: #000000;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 4px 16px rgba(255, 124, 8, 0.3);
        }

        .selection-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .format-selector {
          padding: 0.5rem 1rem;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.1);
          color: #000000;
          font-weight: 600;
          cursor: pointer;
          outline: none;
        }

        .format-selector:hover {
          background: rgba(0, 0, 0, 0.15);
        }

        .btn-bulk-export {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: #000000;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-bulk-export:hover:not(:disabled) {
          background: #1f2937;
          transform: translateY(-1px);
        }

        .btn-bulk-export:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-deselect {
          padding: 0.625rem 1.25rem;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          color: #000000;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-deselect:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .spinner-small {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .selection-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .select-control-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 124, 8, 0.1);
          border: 1px solid rgba(255, 124, 8, 0.3);
          border-radius: 8px;
          color: #FF7C08;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .select-control-btn:hover {
          background: rgba(255, 124, 8, 0.2);
        }

        .selection-count {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        [data-theme="dark"] .selection-count {
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .bulk-actions-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .bulk-actions {
            flex-wrap: wrap;
          }

          .selection-controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default BulkExport;
