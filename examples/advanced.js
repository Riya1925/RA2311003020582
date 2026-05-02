/**
 * Advanced Example - Advanced logging middleware with custom configuration
 */

const express = require('express');
const { loggingMiddleware, createLogger, transports, formatters } = require('../src/index');
const { RequestTracker } = require('../src/request-tracker');

const app = express();

// Create custom logger with file transport
const logger = createLogger({
  level: 'debug',
  format: 'json',
  timestamp: true,
  transports: ['console', 'file']
});

// Create request tracker for advanced monitoring
const tracker = new RequestTracker({
  maxRequests: 500
});

// Custom middleware for request tracking
app.use((req, res, next) => {
  const requestId = req.requestId || Math.random().toString(36).substr(2, 9);
  req.requestId = requestId;
  tracker.startRequest(requestId, {
    method: req.method,
    path: req.path,
    query: req.query
  });
  
  res.on('finish', () => {
    const requestData = tracker.endRequest(requestId);
    logger.debug('Request completed', {
      requestId,
      duration: requestData.duration,
      status: res.statusCode
    });
  });
  
  next();
});

// Apply logging middleware
app.use(loggingMiddleware({
  level: 'debug',
  format: 'json'
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  tracker.addEvent(req.requestId, 'route_handler_start', { route: '/' });
  logger.info('Root endpoint accessed', { requestId: req.requestId });
  
  tracker.addEvent(req.requestId, 'database_query', { table: 'users' });
  // Simulate DB query
  setTimeout(() => {
    tracker.addEvent(req.requestId, 'database_query_complete', { rows: 10 });
    res.json({ message: 'Hello World', requestId: req.requestId });
  }, 100);
});

app.get('/stats', (req, res) => {
  const allRequests = tracker.getAllRequests();
  logger.debug('Stats requested', { activeRequests: allRequests.length });
  res.json({
    activeRequests: allRequests.length,
    requests: allRequests
  });
});

app.get('/logs', (req, res) => {
  logger.info('Logs endpoint accessed');
  res.json({ 
    message: 'Check console or log file for application logs',
    location: './logs/app.log'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    requestId: req.requestId,
    error: err.message,
    stack: err.stack
  });
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Advanced example server started on port ${PORT}`);
  logger.info('Visit http://localhost:3001 to see logging in action');
});
