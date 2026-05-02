/**
 * Logger - Core logging functionality
 */

class Logger {
  constructor(options = {}) {
    this.level = options.level || 'info';
    this.format = options.format || 'plaintext';
    this.timestamp = options.timestamp !== false;
    this.transports = options.transports || ['console'];
  }

  /**
   * Log at specified level
   */
  log(level, message, data = {}) {
    const levels = { debug: 0, info: 1, warn: 2, error: 3 };
    
    if (levels[level] < levels[this.level]) {
      return;
    }

    const logEntry = {
      level,
      message,
      data,
      timestamp: this.timestamp ? new Date().toISOString() : null
    };

    this.transports.forEach(transport => {
      if (typeof transport.send === 'function') {
        transport.send(logEntry, (entry) => this._format(entry));
      }
    });
  }

  debug(message, data) { this.log('debug', message, data); }
  info(message, data) { this.log('info', message, data); }
  warn(message, data) { this.log('warn', message, data); }
  error(message, data) { this.log('error', message, data); }

  /**
   * Format log entry
   */
  _format(entry) {
    const formatters = {
      json: () => JSON.stringify(entry),
      plaintext: () => `[${entry.level.toUpperCase()}] ${entry.message}`,
      detailed: () => `${entry.timestamp} [${entry.level.toUpperCase()}] ${entry.message}`,
    };
    
    return (formatters[this.format] || formatters.plaintext)();
  }
}

module.exports = {
  Logger
};