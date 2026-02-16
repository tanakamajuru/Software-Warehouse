import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

// Icon Components
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const MailSentIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
    <path d="M22 7v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7" />
  </svg>
);

const ZimbabweFlag = () => (
  <div className="zim-flag">
    <span className="zim-flag-text">🇿🇼</span>
  </div>
);

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.forgotPassword(email.trim());
      setSuccess('Reset code has been sent to your email');
      setEmailSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setEmailSent(false);
    setError('');
    setSuccess('');
  };

  if (emailSent) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          {/* Left Side - Branding */}
          <div className="auth-branding">
            <div className="branding-content">
              <ZimbabweFlag />
              <h1>Reset Your Password</h1>
              <p>Follow the instructions sent to your email to reset your password</p>
              
              <div className="email-sent-illustration">
                <MailSentIcon />
                <h3>Check Your Email</h3>
                <p>We've sent a 6-digit reset code to:</p>
                <div className="sent-email">{email}</div>
                
                <div className="next-steps">
                  <h4>Next Steps:</h4>
                  <ol>
                    <li>Open your email inbox</li>
                    <li>Find the reset code from Zimbabwe Software Solutions</li>
                    <li>Click the link or visit the reset page</li>
                    <li>Enter the code and your new password</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Success Message */}
          <div className="auth-form-container">
            <div className="auth-form">
              <div className="auth-header">
                <div className="success-icon">
                  <MailSentIcon />
                </div>
                <h2>Email Sent Successfully!</h2>
                <p>Check your inbox for the password reset instructions</p>
              </div>

              <div className="success-message">
                <h3>What's Next?</h3>
                <ul>
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Look for an email from Zimbabwe Software Solutions</li>
                  <li>Use the 6-digit code to reset your password</li>
                  <li>The code will expire in 15 minutes for security</li>
                </ul>
              </div>

              <div className="email-info">
                <p><strong>Sent to:</strong> {email}</p>
                <p><strong>Didn't receive it?</strong></p>
                <ul>
                  <li>Check your spam/junk folder</li>
                  <li>Make sure the email address is correct</li>
                  <li>Wait a few minutes for delivery</li>
                </ul>
              </div>

              <div className="auth-actions">
                <button
                  onClick={handleReset}
                  className="auth-submit-btn secondary"
                  disabled={loading}
                >
                  <ArrowLeftIcon />
                  Try Different Email
                </button>
                
                <Link to="/verify-reset-code" className="auth-submit-btn">
                  Enter Reset Code
                </Link>
              </div>

              <div className="auth-footer">
                <p>
                  Remember your password?{' '}
                  <Link to="/login" className="auth-link">
                    Back to login
                  </Link>
                </p>
              </div>

              <div className="help-section">
                <h4>Need Help?</h4>
                <p>If you don't receive the email within 10 minutes:</p>
                <ul>
                  <li>Check your spam folder</li>
                  <li>Contact our support team</li>
                  <li>Make sure you entered the correct email</li>
                </ul>
                <div className="support-info">
                  <p><strong>Support:</strong> support@zimsoftware.co.zw</p>
                  <p><strong>Phone:</strong> +263 123 456 789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <ZimbabweFlag />
            <h1>Forgot Password?</h1>
            <p>No worries! We'll help you reset your password and get back to accessing your software solutions</p>
            
            <div className="branding-features">
              <div className="feature-item">
                <div className="feature-icon">🔐</div>
                <div className="feature-text">
                  <h3>Secure Reset</h3>
                  <p>6-digit code sent to your email for verification</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⏰</div>
                <div className="feature-text">
                  <h3>Quick Process</h3>
                  <p>Reset your password in under 5 minutes</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h3>Safe & Private</h3>
                  <p>Your account security is our top priority</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="auth-form-container">
          <div className="auth-form">
            <div className="auth-header">
              <Link to="/login" className="back-link">
                <ArrowLeftIcon />
                Back to Login
              </Link>
              <h2>Reset Password</h2>
              <p>Enter your email address and we'll send you a reset code</p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="auth-message success">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="auth-message error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="forgot-password-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <EmailIcon />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your registered email"
                    required
                    disabled={loading}
                  />
                </div>
                <small className="form-help">
                  Enter the email address associated with your account
                </small>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner">
                    <span className="spinner"></span>
                    Sending reset code...
                  </span>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>

            {/* Alternative Options */}
            <div className="auth-alternatives">
              <div className="divider">
                <span>OR</span>
              </div>
              
              <div className="alternative-options">
                <h4>Other Options:</h4>
                <ul>
                  <li>
                    <Link to="/login" className="auth-link">
                      Try signing in with a different email
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="auth-link">
                      Create a new account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Help Section */}
            <div className="help-section">
              <h4>Having Trouble?</h4>
              <p>If you don't receive the reset email:</p>
              <ul>
                <li>Check your spam/junk folder</li>
                <li>Make sure the email address is correct</li>
                <li>Contact our support team for assistance</li>
              </ul>
              <div className="support-info">
                <p><strong>Email:</strong> support@zimsoftware.co.zw</p>
                <p><strong>Phone:</strong> +263 123 456 789</p>
                <p><strong>Hours:</strong> Mon-Fri 8AM-5PM (Zimbabwe Time)</p>
              </div>
            </div>

            {/* Back to Login */}
            <div className="auth-footer">
              <p>
                Remember your password?{' '}
                <Link to="/login" className="auth-link">
                  Back to login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
