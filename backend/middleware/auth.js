// Authentication Middleware for FlacronAI
const { getAuth } = require('../config/firebase');
const jwt = require('jsonwebtoken');

// Secret for mobile app JWT tokens (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'flacronai-mobile-secret-2024';

/**
 * Middleware to verify Firebase ID token OR mobile app JWT token
 */
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token is required'
      });
    }

    // Try to verify as JWT token first (for mobile app)
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // JWT token verified successfully (mobile app)
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
      return next();
    } catch (jwtError) {
      // Not a JWT token or invalid, try Firebase token (for web app)
    }

    // Try to verify as Firebase ID token (for web app)
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      req.user = {
        userId: decodedToken.uid,
        email: decodedToken.email
      };
      return next();
    } catch (firebaseError) {
      // Check if token is expired
      if (firebaseError.code === 'auth/id-token-expired') {
        return res.status(401).json({
          success: false,
          error: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      throw firebaseError;
    }

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}

/**
 * Optional authentication - doesn't block if no token, but verifies if present
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decodedToken = await getAuth().verifyIdToken(token);
      req.user = {
        userId: decodedToken.uid,
        email: decodedToken.email
      };
    }

    next();

  } catch (error) {
    // Continue without user info if token is invalid
    next();
  }
}

module.exports = {
  authenticateToken,
  optionalAuth
};
