
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import { Helmet } from 'react-helmet';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const getAccessTokenFromUrl = () => {
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  return hashParams.get('access_token') || new URLSearchParams(window.location.search).get('access_token');
};

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [accessToken, setAccessToken] = useState(null);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAccessToken(getAccessTokenFromUrl());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(accessToken, formData.password);
      toast.success('Password updated. Please sign in with your new password.');
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error?.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - Physiome</title>
        <meta name="description" content="Set a new password for your Physiome account" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-soft-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Set a new password</h1>
            <p className="text-muted-foreground">Choose a new password for your account</p>
          </div>

          {!accessToken ? (
            <div className="text-center">
              <p className="text-sm text-destructive mb-4">
                This reset link is invalid or has expired. Please request a new one.
              </p>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Request a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter your new password"
                required
              />

              <Input
                label="Confirm new password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Re-enter your new password"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base font-medium shadow-glow-primary"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Reset password'}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary font-medium hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
