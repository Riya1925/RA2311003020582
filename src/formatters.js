/**
 * Formatters - Different log format options
 */

const chalk = require('chalk');

const formatters = {
  /**
   * JSON format
   */
  json: (logEntry) => {
    return JSON.stringify({
      timestamp: logEntry.timestamp,
      level: logEntry.level,
      message: logEntry.message,
      data: logEntry.data
    });
  },

  /**
   * Plaintext format
   */
  plaintext: (logEntry) => {
    const timestamp = logEntry.timestamp ? `[${logEntry.timestamp}] ` : '';
    return `${timestamp}${logEntry.level.toUpperCase()}: ${logEntry.message}`;
  },

  /**
   * Colorized format for console
   */
  colorized: (logEntry) => {
    const colors = {
      debug: chalk.gray,
      info: chalk.blue,
      warn: chalk.yellow,
      error: chalk.red
    };
    
    const color = colors[logEntry.level] || chalk.white;
    const timestamp = logEntry.timestamp ? `[${logEntry.timestamp}] ` : '';
    return color(`${timestamp}${logEntry.level.toUpperCase()}: ${logEntry.message}`);
  },

  /**
   * CSV format
   */
  csv: (logEntry) => {
    const timestamp = logEntry.timestamp || '';
    const level = logEntry.level || '';
    const message = (logEntry.message || '').replace(/"/g, '\"');
    const data = logEntry.data ? JSON.stringify(logEntry.data).replace(/"/g, '\"') : '';
    return `"${timestamp}","${level}","${message}","${data}"`;
  },

  /**
   * Detailed format with all information
   */
  detailed: (logEntry) => {
    const timestamp = logEntry.timestamp ? `[${logEntry.timestamp}] ` : '';
    const level = `${logEntry.level.toUpperCase()}: `;
    const message = `${logEntry.message}`;
    const data = logEntry.data ? ` | Data: ${JSON.stringify(logEntry.data)}` : '';
    return `${timestamp}${level}${message}${data}`;
  }
};

module.exports = {
  formatters
};