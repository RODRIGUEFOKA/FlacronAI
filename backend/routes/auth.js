// Authentication Routes for FlacronAI
// Uses Firebase Auth REST API for email verification (Firebase sends emails automatically)
const express = require('express');
const router = express.Router();
const { getAuth, getFirestore } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Firebase API Key (same one used in Firebase Console)
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyAEtWQZaTf8czc8tLdMatYSnAUhIOyCOis';

// Secret for mobile app JWT tokens
const JWT_SECRET = process.env.JWT_SECRET || 'flacronai-mobile-secret-2024';

/**
 * Helper: Send verification email using Firebase Auth REST API
 * Firebase handles the email sending automatically using its built-in templates
 */
async function sendFirebaseVerificationEmail(idToken) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requestType: 'VERIFY_EMAIL',
      idToken: idToken
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error('Firebase email error:', data.error.message);
    return { success: false, error: data.error.message };
  }

  return { success: true, email: data.email };
}

/**
 * Helper: Sign in user to get idToken (needed for sending verification email)
 */
async function getFirebaseIdToken(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true
    })
  });

  return await response.json();
}

/**
 * POST /api/auth/register
 * Register a new user and send verification email via Firebase
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters'
      });
    }

    // Step 1: Create user with Firebase Admin SDK
    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
      displayName: displayName || email.split('@')[0],
      emailVerified: false
    });

    // Step 2: Create user document in Firestore
    const db = getFirestore();
    const now = new Date();
    const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    await db.collection('users').doc(userRecord.uid).set({
      userId: userRecord.uid,
      email: email,
      displayName: displayName || email.split('@')[0],
      tier: 'starter',
      reportsGenerated: 0,
      currentPeriod: currentPeriod,
      periodUsage: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    console.log(`✅ User registered: ${email}`);

    // Step 3: Get idToken by signing in (needed to send verification email)
    const signInResult = await getFirebaseIdToken(email, password);

    if (signInResult.error) {
      // User created but couldn't sign in to send verification
      console.log(`⚠️ User created but couldn't send verification email`);
      return res.json({
        success: true,
        message: 'Account created! Please use "Resend Verification" to get your verification email.',
        userId: userRecord.uid,
        emailSent: false
      });
    }

    // Step 4: Send verification email via Firebase (Firebase handles email delivery)
    const emailResult = await sendFirebaseVerificationEmail(signInResult.idToken);

    if (emailResult.success) {
      console.log(`📧 Firebase verification email sent to: ${email}`);
    } else {
      console.log(`⚠️ Could not send verification email: ${emailResult.error}`);
    }

    res.json({
      success: true,
      message: emailResult.success
        ? 'Account created! Please check your email to verify your account.'
        : 'Account created! Please use "Resend Verification" to get your verification email.',
      userId: userRecord.uid,
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Registration error:', error);

    let errorMessage = error.message || 'Registration failed';
    if (error.code === 'auth/email-already-exists') {
      errorMessage = 'This email is already registered. Please login instead.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please use at least 6 characters.';
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
});

/**
 * POST /api/auth/login
 * Login user and create JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Verify password using Firebase Auth REST API
    const firebaseResponse = await getFirebaseIdToken(email, password);

    // Check for Firebase Auth errors
    if (firebaseResponse.error) {
      const errorCode = firebaseResponse.error.message;
      console.log(`❌ Login failed: ${errorCode}`);

      let errorMessage = 'Invalid email or password';

      if (errorCode === 'EMAIL_NOT_FOUND') {
        errorMessage = 'No account found with this email';
      } else if (errorCode === 'INVALID_PASSWORD' || errorCode === 'INVALID_LOGIN_CREDENTIALS') {
        errorMessage = 'Incorrect password';
      } else if (errorCode === 'USER_DISABLED') {
        errorMessage = 'This account has been disabled';
      } else if (errorCode === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      }

      return res.status(401).json({
        success: false,
        error: errorMessage
      });
    }

    // Password verified! Now get user record
    const userRecord = await getAuth().getUserByEmail(email);

    // Check email verification
    if (!userRecord.emailVerified) {
      return res.status(403).json({
        success: false,
        error: 'Please verify your email before logging in',
        emailVerified: false,
        // Include idToken so client can resend verification
        idToken: firebaseResponse.idToken
      });
    }

    // Get user data from Firestore
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(userRecord.uid).get();

    let userData = null;
    if (userDoc.exists) {
      userData = userDoc.data();
    }

    // Create JWT token for mobile app
    const token = jwt.sign(
      {
        userId: userRecord.uid,
        email: userRecord.email
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log(`✅ User logged in: ${email}`);

    res.json({
      success: true,
      token: token,
      user: {
        userId: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || email.split('@')[0],
        emailVerified: userRecord.emailVerified,
        createdAt: userRecord.metadata.creationTime,
        tier: userData?.tier || 'starter',
        reportsGenerated: userData?.reportsGenerated || 0
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({
      success: false,
      error: error.message || 'Login failed'
    });
  }
});

/**
 * POST /api/auth/resend-verification
 * Resend verification email via Firebase (Firebase handles email delivery)
 */
router.post('/resend-verification', async (req, res) => {
  try {
    const { email, password, idToken } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Check if user exists and is already verified
    let userRecord;
    try {
      userRecord = await getAuth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({
          success: false,
          error: 'No account found with this email'
        });
      }
      throw error;
    }

    if (userRecord.emailVerified) {
      return res.json({
        success: true,
        message: 'Email is already verified. You can login now.',
        alreadyVerified: true
      });
    }

    // Get idToken if not provided
    let tokenToUse = idToken;

    if (!tokenToUse && password) {
      const signInResult = await getFirebaseIdToken(email, password);
      if (signInResult.idToken) {
        tokenToUse = signInResult.idToken;
      }
    }

    if (!tokenToUse) {
      return res.status(400).json({
        success: false,
        error: 'Password is required to resend verification email'
      });
    }

    // Send verification email via Firebase
    const emailResult = await sendFirebaseVerificationEmail(tokenToUse);

    if (emailResult.success) {
      console.log(`📧 Verification email resent to: ${email}`);
      res.json({
        success: true,
        message: 'Verification email sent! Please check your inbox and spam folder.',
        emailSent: true
      });
    } else {
      console.log(`⚠️ Failed to send verification email: ${emailResult.error}`);
      res.status(500).json({
        success: false,
        error: 'Failed to send verification email. Please try again.'
      });
    }

  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send verification email'
    });
  }
});

/**
 * POST /api/auth/check-verification
 * Check if user's email is verified
 */
router.post('/check-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    let userRecord;
    try {
      userRecord = await getAuth().getUserByEmail(email);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({
          success: false,
          error: 'No account found with this email'
        });
      }
      throw error;
    }

    console.log(`🔍 Verification check for ${email}: ${userRecord.emailVerified ? 'VERIFIED' : 'NOT VERIFIED'}`);

    res.json({
      success: true,
      emailVerified: userRecord.emailVerified,
      message: userRecord.emailVerified
        ? 'Email is verified. You can login now.'
        : 'Email not verified yet. Please check your inbox.'
    });

  } catch (error) {
    console.error('Check verification error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to check verification status'
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const userRecord = await getAuth().getUser(userId);
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(userId).get();

    let userData = null;
    if (userDoc.exists) {
      userData = userDoc.data();
    }

    res.json({
      success: true,
      user: {
        userId: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName || userRecord.email.split('@')[0],
        emailVerified: userRecord.emailVerified,
        createdAt: userRecord.metadata.creationTime,
        tier: userData?.tier || 'starter',
        reportsGenerated: userData?.reportsGenerated || 0
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/sync-user
 * Sync user profile to Firestore
 */
router.post('/sync-user', authenticateToken, async (req, res) => {
  try {
    const { userId, email, displayName } = req.body;

    if (req.user.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'User ID mismatch'
      });
    }

    const db = getFirestore();
    const userRef = db.collection('users').doc(userId);

    const now = new Date();
    const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        userId: userId,
        email: email,
        displayName: displayName || email.split('@')[0],
        tier: 'starter',
        reportsGenerated: 0,
        currentPeriod: currentPeriod,
        periodUsage: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      await userRef.update({
        email: email,
        displayName: displayName || email.split('@')[0],
        updatedAt: new Date().toISOString()
      });
    }

    console.log(`✅ User ${userId} synced`);

    res.json({
      success: true,
      message: 'User profile synced successfully'
    });

  } catch (error) {
    console.error('Sync user error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/auth/verify
 * Verify ID token
 */
router.post('/verify', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        error: 'ID token is required'
      });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);

    res.json({
      success: true,
      userId: decodedToken.uid,
      email: decodedToken.email
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
});

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    await getAuth().revokeRefreshTokens(userId);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
