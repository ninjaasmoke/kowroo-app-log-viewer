import React, { useState } from 'react';
import LogUploader from './components/LogUploader';
import LogViewer from './components/LogViewer';

import './App.css';

function App() {
  const [logs, setLogs] = useState([]);

  const handleFileUpload = (fileContent) => {
    const parsedLogs = parseLogs(fileContent);
    setLogs(parsedLogs);
  };

  const parseLogs = (fileContent) => {
    // Split the file content by lines
    const lines = fileContent.split('\n');

    // Regular expression to capture log details
    const logRegex = /\$ (\d+-\d+-\d+T\d+:\d+:\d+.\d+) (Level\.(\w+)):\s(.+)/;

    const parsedLogs = lines.map((line) => {
      const match = logRegex.exec(line);
      if (match) {
        return {
          timestamp: match[1],
          level: match[3],
          message: match[4],
        };
      }
      return null;
    }).filter(log => log !== null);

    return parsedLogs;
  };

  return (
    <div className="App">
      {
        logs.length <= 0 &&
        <div className="header">
          <h1>Log File Viewer</h1>
          <LogUploader onFileUpload={handleFileUpload} />
        </div>
      }
      {logs.length > 0 && <LogViewer logs={logs} />}
    </div>
  );
}

export default App;
