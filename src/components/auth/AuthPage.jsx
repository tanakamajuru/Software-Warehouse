import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import { CheckCircle } from 'lucide-react';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState('login'); // login, signup, forgot, reset
  const [resetEmail, setResetEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleToggleForm = () => {
    setCurrentView(currentView === 'login' ? 'signup' : 'login');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot');
  };

  const handleShowResetForm = (email) => {
    setResetEmail(email);
    setCurrentView('reset');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setResetEmail('');
  };

  const handleBackToForgot = () => {
    setCurrentView('forgot');
  };

  const handleSignupSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/');
    }, 3000);
  };

  const handleLoginSuccess = () => {
    navigate('/');
  };

  const handleResetSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCurrentView('login');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Success!
            </h2>
            <p className="text-gray-600">
              {currentView === 'signup' && 'Your account has been created successfully!'}
              {currentView === 'reset' && 'Your password has been reset successfully!'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting you...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {currentView === 'login' && (
          <LoginForm
            onToggleForm={handleToggleForm}
            onForgotPassword={handleForgotPassword}
            onSuccess={handleLoginSuccess}
          />
        )}
        
        {currentView === 'signup' && (
          <SignupForm
            onToggleForm={handleToggleForm}
            onSuccess={handleSignupSuccess}
          />
        )}
        
        {currentView === 'forgot' && (
          <ForgotPasswordForm
            onBackToLogin={handleBackToLogin}
            onShowResetForm={handleShowResetForm}
          />
        )}
        
        {currentView === 'reset' && (
          <ResetPasswordForm
            email={resetEmail}
            onBackToLogin={handleBackToLogin}
            onBackToForgot={handleBackToForgot}
            onSuccess={handleResetSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
