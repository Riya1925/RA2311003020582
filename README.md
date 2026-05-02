# Logging Middleware Documentation

## Features
- Provides comprehensive logging capabilities for applications.
- Supports custom logging levels (info, debug, error).
- Easily integrates with existing systems.

## Installation
To install the logging middleware, run the following command:
```bash
npm install logging-middleware
```

## Quick Start
1. Import the middleware in your application:
    ```javascript
    const loggingMiddleware = require('logging-middleware');
    ```
2. Use it in your application:
    ```javascript
    app.use(loggingMiddleware);
    ```

## Configuration
You can configure the middleware as follows:
```javascript
const loggingMiddleware = require('logging-middleware');
const options = { level: 'info', ... };
app.use(loggingMiddleware(options));
```

## API Reference
### Options
- `level`: The logging level to use. Options include `info`, `debug`, `error`.
- `format`: Defines how the log messages will be formatted.

## Examples
### Basic Usage
```javascript
const loggingMiddleware = require('logging-middleware');
app.use(loggingMiddleware({ level: 'debug' }));
```

### Custom Format
```javascript
const loggingMiddleware = require('logging-middleware');
const options = { level: 'info', format: 'json' };
app.use(loggingMiddleware(options));
```

## Best Practices
- Always set appropriate logging levels to avoid cluttered logs.
- Use structured logging for better readability.

## Support
For support, please reach out to our support team at support@example.com or create an issue on our GitHub repository.