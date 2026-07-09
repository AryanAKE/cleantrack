'use strict';

/**
 * Simple HTTP request logger middleware
 * Logs: method, url, status, response time
 */
module.exports = function logger(req, res, next) {
  const start = Date.now();
  const { method, url } = req;

  res.on('finish', () => {
    const ms = Date.now() - start;
    const status = res.statusCode;
    const color =
      status >= 500 ? '\x1b[31m' :   // red
      status >= 400 ? '\x1b[33m' :   // yellow
      status >= 300 ? '\x1b[36m' :   // cyan
      '\x1b[32m';                     // green
    const reset = '\x1b[0m';
    const dim = '\x1b[2m';
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    console.log(
      `${dim}[${timestamp}]${reset} ${color}${status}${reset} ${method.padEnd(6)} ${url.padEnd(40)} ${dim}${ms}ms${reset}`
    );
  });

  next();
};
