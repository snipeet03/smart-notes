const { sendError } = require('../utils/responseHelper');

const notFoundHandler = (req, res) => {
  sendError(res, 404, `Route ${req.originalUrl} not found`);
};

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({ msg: e.message, path: e.path }));
    return sendError(res, 400, 'Validation failed', errors);
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, 400, 'Invalid ID format');
  }

  sendError(res, err.status || 500, err.message || 'Internal server error');
};

module.exports = { notFoundHandler, errorHandler };
