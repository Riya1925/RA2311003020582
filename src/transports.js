/**
 * Transports - Different output destinations for logs
 */

const fs = require('fs');
const path = require('path');

const transports = {
  /**
   * Console transport
   */
  console: {
    send: (logEntry, formatter) => {
      console.log(formatter(logEntry));
    }
  },

  /**
   * File transport
   */
  file: (filename) => ({
    send: (logEntry, formatter) => {
      const dir = path.dirname(filename);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      const line = formatter(logEntry) + '\n';
      fs.appendFileSync(filename, line, 'utf8');
    }
  }),

  /**
   * Rotating file transport
   */
  rotatingFile: (filename, options = {}) => {
    const maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB default
    const maxFiles = options.maxFiles || 10;

    return {
      send: (logEntry, formatter) => {
        const dir = path.dirname(filename);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Check file size and rotate if needed
        if (fs.existsSync(filename)) {
          const stats = fs.statSync(filename);
          if (stats.size > maxSize) {
            // Rotate files
            for (let i = maxFiles - 1; i > 0; i--) {
              const oldFile = `${filename}.${i}`;
              const newFile = `${filename}.${i + 1}`;
              if (fs.existsSync(oldFile)) {
                fs.renameSync(oldFile, newFile);
              }
            }
            fs.renameSync(filename, `${filename}.1`);
          }
        }

        const line = formatter(logEntry) + '\n';
        fs.appendFileSync(filename, line, 'utf8');
      }
    };
  }
};

module.exports = {
  transports
};
