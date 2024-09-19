import React, { useState, useMemo } from 'react';
import { debounce } from 'lodash';

const LogViewer = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSearchChange = debounce((value) => setSearch(value), 300);
  const handleLevelChange = debounce((value) => setLevelFilter(value), 300);

  const filteredLogs = useMemo(() => {
    const start = startTime ? new Date(startTime).getTime() : null;
    const end = endTime ? new Date(endTime).getTime() : null;

    return logs.filter(log => {
      const logTime = new Date(log.timestamp.split('.')[0]).getTime();
      return log.message.toLowerCase().includes(search.toLowerCase()) &&
        (!levelFilter || log.level === levelFilter) &&
        (!start || logTime >= start) &&
        (!end || logTime <= end);
    });
  }, [logs, search, levelFilter, startTime, endTime]);

  const getColorForLogLevel = (level) => {
    switch (level) {
      case 'info': return 'blue';
      case 'error': return 'red';
      case 'warn': return 'orange';
      case 'trace': return 'purple';
      case 'fatal': return 'darkred';
      case 'debug': return 'green';
      default: return 'black';
    }
  };

  return (
    <div className='log-viewer'>
      <h2 style={{ padding: '0 20px' }}>Logs</h2>
      <div className='filters'>
        <input
          type="text"
          placeholder="Search log messages..."
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search"
        />
        <select
          onChange={(e) => handleLevelChange(e.target.value)}
          className="level-filter"
        >
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
          <option value="warn">Warn</option>
          <option value="trace">Trace</option>
          <option value="fatal">Fatal</option>
        </select>
        <div className='time-filter'>
          <span>from: </span>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="start-time"
          />
          <span>to: </span>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="end-time"
          />
        </div>
        <div style={{marginTop: "20px"}}>
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
      </div>
      <table className="logs">
        <thead>
          <tr>
            <th style={{ width: '200px' }}>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index} style={{ color: getColorForLogLevel(log.level) }}>
              <td>{log.timestamp}</td>
              <td>{log.level}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogViewer;
