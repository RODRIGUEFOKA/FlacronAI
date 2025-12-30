import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchFilter = ({ reports, onFilteredReports }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, filterType, dateRange);
  };

  const handleFilterType = (value) => {
    setFilterType(value);
    applyFilters(searchTerm, value, dateRange);
  };

  const handleDateRange = (value) => {
    setDateRange(value);
    applyFilters(searchTerm, filterType, value);
  };

  const applyFilters = (search, type, date) => {
    let filtered = [...reports];

    // Search filter
    if (search) {
      filtered = filtered.filter(report =>
        report.claimNumber?.toLowerCase().includes(search.toLowerCase()) ||
        report.insuredName?.toLowerCase().includes(search.toLowerCase()) ||
        report.propertyAddress?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (type !== 'all') {
      filtered = filtered.filter(report => report.lossType === type);
    }

    // Date range filter
    if (date !== 'all') {
      const now = new Date();
      filtered = filtered.filter(report => {
        const reportDate = new Date(report.createdAt);
        switch (date) {
          case 'today':
            return reportDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return reportDate >= weekAgo;
          case 'month':
            return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
          case '3months':
            const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            return reportDate >= threeMonthsAgo;
          default:
            return true;
        }
      });
    }

    onFilteredReports(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateRange('all');
    onFilteredReports(reports);
  };

  const activeFiltersCount = [
    searchTerm !== '',
    filterType !== 'all',
    dateRange !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="search-filter-container">
      <div className="search-bar">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by claim number, name, or address..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => handleSearch('')}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          className={`filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {activeFiltersCount > 0 && (
            <span className="filter-badge">{activeFiltersCount}</span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="filter-row">
              <div className="filter-group">
                <label>Loss Type</label>
                <select value={filterType} onChange={(e) => handleFilterType(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="Fire">Fire</option>
                  <option value="Water">Water</option>
                  <option value="Wind">Wind</option>
                  <option value="Mold">Mold</option>
                  <option value="Theft">Theft</option>
                  <option value="Vandalism">Vandalism</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Date Range</label>
                <select value={dateRange} onChange={(e) => handleDateRange(e.target.value)}>
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">This Month</option>
                  <option value="3months">Past 3 Months</option>
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .search-filter-container {
          margin-bottom: 2rem;
        }

        .search-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .search-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.875rem 3rem 0.875rem 3rem;
          border: 2px solid rgba(255, 124, 8, 0.2);
          border-radius: 12px;
          font-size: 0.95rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          outline: none;
        }

        [data-theme="dark"] .search-input {
          background: rgba(0, 0, 0, 0.4);
          color: #ffffff;
        }

        .search-input:focus {
          border-color: #FF7C08;
          box-shadow: 0 0 0 3px rgba(255, 124, 8, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .clear-search:hover {
          color: #ef4444;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.5rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 124, 8, 0.2);
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          color: #1f2937;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        [data-theme="dark"] .filter-toggle {
          background: rgba(0, 0, 0, 0.4);
          color: #ffffff;
        }

        .filter-toggle:hover,
        .filter-toggle.active {
          border-color: #FF7C08;
          background: rgba(255, 124, 8, 0.1);
          color: #FF7C08;
        }

        .filter-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 24px;
          height: 24px;
          background: #FF7C08;
          color: #000000;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .filter-panel {
          overflow: hidden;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 124, 8, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1rem;
        }

        [data-theme="dark"] .filter-panel {
          background: rgba(0, 0, 0, 0.4);
        }

        .filter-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          align-items: end;
        }

        .filter-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #374151;
          font-size: 0.875rem;
        }

        [data-theme="dark"] .filter-group label {
          color: #d1d5db;
        }

        .filter-group select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-size: 0.95rem;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }

        [data-theme="dark"] .filter-group select {
          background: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          border-color: rgba(255, 124, 8, 0.2);
        }

        .filter-group select:focus {
          border-color: #FF7C08;
        }

        .clear-filters {
          padding: 0.75rem 1.5rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #ef4444;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .clear-filters:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 768px) {
          .search-bar {
            flex-direction: column;
          }

          .filter-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchFilter;
