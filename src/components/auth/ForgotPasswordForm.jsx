import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPasswordForm = ({ onBackToLogin, onShowResetForm }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { forgotPassword, loading, error, clearError } = useAuth();

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear field error when user starts typing
    if (fieldErrors.email) {
      setFieldErrors({});
    }
    
    // Clear general error when user starts typing
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await forgotPassword(email.trim());
      setIsSubmitted(true);
    } catch (err) {
      // Error is already handled by the auth context
    }
  };

  const handleResetAnotherEmail = () => {
    setEmail('');
    setIsSubmitted(false);
    setFieldErrors({});
    clearError();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Reset Code Sent
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset code to:
              </p>
              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="font-medium text-gray-900">{email}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Check your email and enter the code to reset your password. The code will expire in 15 minutes.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => onShowResetForm(email)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enter Reset Code
                </button>
                
                <button
                  onClick={handleResetAnotherEmail}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send to Different Email
                </button>
                
                <button
                  onClick={onBackToLogin}
                  className="w-full flex items-center justify-center py-2 px-4 text-sm text-blue-600 hover:text-blue-500 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <button
              onClick={onBackToLogin}
              className="flex items-center text-blue-600 hover:text-blue-500 font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </button>
          </div>

          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email address and we'll send you a code to reset your password.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    fieldErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                  disabled={loading}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Reset Code...
                </div>
              ) : (
                'Send Reset Code'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <button
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Need Help?</h4>
            <p className="text-sm text-yellow-700 mb-3">If you don't receive the email within a few minutes:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Check your spam or junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• Try sending the code again</li>
            </ul>
            <div className="mt-3 pt-3 border-t border-yellow-200">
              <p className="text-sm text-yellow-700">For immediate assistance, contact our support team:</p>
              <p className="text-sm text-yellow-700">📧 support@softwarewarehouse.co.zw</p>
              <p className="text-sm text-yellow-700">📞 +263 123 4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
