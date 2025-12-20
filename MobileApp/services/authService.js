// Authentication Service - Uses Backend REST API
// This service calls the FlacronAI backend instead of Firebase client SDK

const API_URL = 'https://flacronai.onrender.com/api';

/**
 * Sign up with email and password
 * Calls backend: POST /api/auth/register
 */
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    console.log('\n📝 REGISTRATION ATTEMPT:');
    console.log('   Name:', displayName);
    console.log('   Email:', email);
    console.log('   API URL:', `${API_URL}/auth/register`);

    const requestBody = { email, password, displayName };
    console.log('   Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('   Response Status:', response.status);
    console.log('   Response OK:', response.ok);

    const responseText = await response.text();
    console.log('   Response Text:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('   Parsed Data:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('   JSON Parse Error:', parseError);
      return {
        success: false,
        error: `Server response is not JSON: ${responseText.substring(0, 100)}`
      };
    }

    if (data.success) {
      console.log('   ✅ Registration successful!');
      return {
        success: true,
        message: data.message,
        userId: data.userId,
        emailSent: data.emailSent
      };
    } else {
      console.error('   ❌ Registration failed:', data.error);
      return {
        success: false,
        error: data.error || 'Registration failed'
      };
    }
  } catch (error) {
    console.error('   ❌ Network Error:', error);
    console.error('   Error details:', JSON.stringify(error, null, 2));
    return {
      success: false,
      error: `Network error: ${error.message}. Please check your internet connection.`
    };
  }
};

/**
 * Sign in with email and password
 * Calls backend: POST /api/auth/login
 */
export const signInWithEmail = async (email, password) => {
  try {
    console.log('\n🔐 LOGIN ATTEMPT:');
    console.log('   Email:', email);
    console.log('   API URL:', `${API_URL}/auth/login`);

    const requestBody = { email, password };
    console.log('   Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('   Response Status:', response.status);
    console.log('   Response OK:', response.ok);

    const responseText = await response.text();
    console.log('   Response Text:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('   Parsed Data:', JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error('   JSON Parse Error:', parseError);
      return {
        success: false,
        error: `Server response is not JSON: ${responseText.substring(0, 100)}`
      };
    }

    // Check for email verification error
    if (!response.ok && response.status === 403 && data.emailVerified === false) {
      console.log('   ⚠️ Email not verified');
      return {
        success: false,
        error: data.error || 'Please verify your email before logging in',
        emailVerified: false,
        idToken: data.idToken // Backend provides this for resending verification
      };
    }

    // Check HTTP status code first
    if (!response.ok) {
      console.error('   ❌ HTTP Error:', response.status);
      const errorMsg = data.error || data.message || 'Login failed';
      return {
        success: false,
        error: errorMsg
      };
    }

    // Check success flag and required data
    if (data.success && data.token && data.user) {
      console.log('   ✅ Login successful!');
      console.log('   Token received:', data.token ? 'YES' : 'NO');
      console.log('   User data:', data.user ? 'YES' : 'NO');

      return {
        success: true,
        token: data.token,
        user: data.user
      };
    } else {
      console.error('   ❌ Login failed:', data.error || 'Invalid credentials');
      return {
        success: false,
        error: data.error || 'Invalid email or password. Please try again.'
      };
    }
  } catch (error) {
    console.error('   ❌ Network Error:', error);
    console.error('   Error details:', JSON.stringify(error, null, 2));
    return {
      success: false,
      error: `Network error: ${error.message}. Please check your internet connection.`
    };
  }
};

/**
 * Reset password
 * Calls backend: POST /api/auth/reset-password
 */
export const resetPassword = async (email) => {
  try {
    console.log('\n🔑 PASSWORD RESET ATTEMPT:');
    console.log('   Email:', email);
    console.log('   API URL:', `${API_URL}/auth/reset-password`);

    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    console.log('   Response Status:', response.status);
    const data = await response.json();
    console.log('   Response Data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('   ✅ Password reset email sent!');
      return {
        success: true,
        message: data.message || 'Password reset email sent! Please check your inbox.'
      };
    } else {
      console.error('   ❌ Password reset failed:', data.error);
      return {
        success: false,
        error: data.error || 'Failed to send password reset email'
      };
    }
  } catch (error) {
    console.error('   ❌ Network Error:', error);
    return {
      success: false,
      error: `Network error: ${error.message}. Please check your internet connection.`
    };
  }
};

/**
 * Resend verification email
 * Calls backend: POST /api/auth/resend-verification
 */
export const resendVerificationEmail = async (email, password) => {
  try {
    console.log('\n📧 RESEND VERIFICATION ATTEMPT:');
    console.log('   Email:', email);

    const response = await fetch(`${API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    console.log('   Response Status:', response.status);
    const data = await response.json();
    console.log('   Response Data:', JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('   ✅ Verification email sent!');
      return {
        success: true,
        message: data.message || 'Verification email sent! Please check your inbox.'
      };
    } else {
      console.error('   ❌ Resend verification failed:', data.error);
      return {
        success: false,
        error: data.error || 'Failed to send verification email'
      };
    }
  } catch (error) {
    console.error('   ❌ Network Error:', error);
    return {
      success: false,
      error: `Network error: ${error.message}`
    };
  }
};

/**
 * Sign out user
 * Clears local session (no backend call needed as backend uses JWT)
 */
export const signOutUser = async () => {
  try {
    console.log('🚪 Logging out user...');
    // JWT tokens are stateless, so we just need to clear local storage
    // The actual clearing is done by the calling component
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Social Authentication imports
 */
export { signInWithGoogle, signInWithApple, isGoogleSignInAvailable, isAppleSignInAvailable } from './socialAuthService';

// Export all functions
export default {
  signUpWithEmail,
  signInWithEmail,
  resetPassword,
  resendVerificationEmail,
  signOutUser
};
