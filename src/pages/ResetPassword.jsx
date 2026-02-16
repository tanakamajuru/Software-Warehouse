import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiService from '../services/api';

// Icon Components
const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="8" cy="8" r="6" />
    <path d="M15 13l6 6" />
    <path d="M17.5 15.5L19 17" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ZimbabweFlag = () => (
  <div className="zim-flag">
    <span className="zim-flag-text">🇿🇼</span>
  </div>
);

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    code: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (error) setError('');
    if (success) setSuccess('');

    // Check password strength
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const validateCode = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.code.trim()) {
      setError('Reset code is required');
      return false;
    }

    if (formData.code.length !== 6 || !/^\d+$/.test(formData.code)) {
      setError('Reset code must be 6 digits');
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    if (!formData.newPassword) {
      setError('New password is required');
      return false;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    
    if (!validateCode()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.verifyResetCode(formData.email.trim(), formData.code);
      setCodeVerified(true);
      setSuccess('Code verified! Please set your new password.');
    } catch (err) {
      setError(err.message || 'Invalid or expired reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await apiService.resetPassword(
        formData.email.trim(),
        formData.code,
        formData.newPassword
      );
      
      setSuccess('Password reset successfully! Redirecting to login...');
      
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'strong': return '#10b981';
      default: return '#e5e7eb';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'Weak';
      case 'medium': return 'Medium';
      case 'strong': return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="branding-content">
            <ZimbabweFlag />
            <h1>Reset Your Password</h1>
            <p>Secure your account with a new strong password</p>
            
            <div className="branding-features">
              <div className="feature-item">
                <div className="feature-icon">🔑</div>
                <div className="feature-text">
                  <h3>Secure Reset</h3>
                  <p>6-digit code verification for your protection</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🛡️</div>
                <div className="feature-text">
                  <h3>Strong Password</h3>
                  <p>Create a password that keeps your account safe</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✅</div>
                <div className="feature-text">
                  <h3>Quick Access</h3>
                  <p>Get back to your software solutions immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="auth-form-container">
          <div className="auth-form">
            <div className="auth-header">
              <div className="step-indicator">
                <div className={`step ${codeVerified ? 'completed' : 'active'}`}>
                  <KeyIcon />
                  <span>Verify Code</span>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${codeVerified ? 'active' : 'pending'}`}>
                  <LockIcon />
                  <span>New Password</span>
                </div>
              </div>
              <h2>{codeVerified ? 'Set New Password' : 'Verify Reset Code'}</h2>
              <p>
                {codeVerified 
                  ? 'Create a strong password for your account'
                  : 'Enter the 6-digit code sent to your email'
                }
              </p>
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

            {!codeVerified ? (
              // Code Verification Form
              <form onSubmit={handleVerifyCode} className="reset-form">
                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <LockIcon />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Reset Code Field */}
                <div className="form-group">
                  <label htmlFor="code">Reset Code</label>
                  <div className="input-with-icon">
                    <KeyIcon />
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                      disabled={loading}
                    />
                  </div>
                  <small className="form-help">
                    Check your email for the 6-digit reset code
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
                      Verifying code...
                    </span>
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </form>
            ) : (
              // New Password Form
              <form onSubmit={handleResetPassword} className="reset-form">
                {/* New Password Field */}
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="input-with-icon">
                    <LockIcon />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill" 
                          style={{ 
                            width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%',
                            backgroundColor: getPasswordStrengthColor()
                          }}
                        />
                      </div>
                      <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                  )}

                  {/* Password Requirements */}
                  <div className="password-requirements">
                    <h5>Password Requirements:</h5>
                    <ul>
                      <li className={formData.newPassword.length >= 6 ? 'valid' : ''}>
                        <CheckIcon /> At least 6 characters
                      </li>
                      <li className={/[a-z]/.test(formData.newPassword) ? 'valid' : ''}>
                        <CheckIcon /> One lowercase letter
                      </li>
                      <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : ''}>
                        <CheckIcon /> One uppercase letter
                      </li>
                      <li className={/\d/.test(formData.newPassword) ? 'valid' : ''}>
                        <CheckIcon /> One number
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="input-with-icon">
                    <LockIcon />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <small className="form-error">Passwords do not match</small>
                  )}
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
                      Resetting password...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            )}

            {/* Help Section */}
            <div className="help-section">
              <h4>Need Help?</h4>
              <ul>
                <li>Make sure you entered the correct 6-digit code</li>
                <li>Check that the email address matches your account</li>
                <li>Reset codes expire after 15 minutes for security</li>
                <li>Contact support if you continue to have issues</li>
              </ul>
              <div className="support-info">
                <p><strong>Support:</strong> support@zimsoftware.co.zw</p>
                <p><strong>Phone:</strong> +263 123 456 789</p>
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

export default ResetPassword;
