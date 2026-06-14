
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import { Helmet } from 'react-helmet';
import { User, Stethoscope, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const user = await login(formData.email, formData.password);
      
      toast.success('Successfully logged in');
      
      if (user.role === 'patient') {
        navigate('/patient/dashboard');
      } else if (user.clinic_id || user.clinicId || user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.message || error?.message || 'Invalid email or password';
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role, email) => {
    setDemoLoading(role);
    try {
      const user = await login(email, 'demo123456');
      toast.success(`Logged in as ${role}`);
      if (user.role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      const errorMessage = error?.response?.message || error?.message || `Failed to login as ${role}`;
      toast.error(errorMessage);
    } finally {
      setDemoLoading(null);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Login - Physiome</title>
        <meta name="description" content="Login to your Physiome account to manage your physiotherapy clinic" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-4xl flex flex-col items-center">
          
          {/* Main Login Card */}
          <div className="w-full max-w-md bg-card rounded-2xl shadow-soft-lg border border-border p-8 mb-8 relative z-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your Physiome account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="you@example.com"
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter your password"
                required
              />
              
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              
              {errors.submit && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{errors.submit}</p>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base font-medium shadow-glow-primary"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign in'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="w-full max-w-3xl">
            <div className="relative flex items-center py-4 mb-6">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                OR TRY DEMO
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Patient Demo */}
              <button
                onClick={() => handleDemoLogin('Patient', 'patient@demo.com')}
                disabled={demoLoading !== null}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:bg-card disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#2DB8B5]"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2DB8B5]/10 flex items-center justify-center text-[#2DB8B5] group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6" />
                  </div>
                  {demoLoading === 'Patient' && <Loader2 className="w-5 h-5 animate-spin text-[#2DB8B5]" />}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Patient</h3>
                <p className="text-sm text-muted-foreground mb-4">Patient Portal</p>
                <span className="text-sm font-medium text-[#2DB8B5] group-hover:underline">Click to login &rarr;</span>
              </button>

              {/* Therapist Demo */}
              <button
                onClick={() => handleDemoLogin('Therapist', 'therapist@demo.com')}
                disabled={demoLoading !== null}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:bg-card disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#7AE582]"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7AE582]/10 flex items-center justify-center text-[#7AE582] group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  {demoLoading === 'Therapist' && <Loader2 className="w-5 h-5 animate-spin text-[#7AE582]" />}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Therapist</h3>
                <p className="text-sm text-muted-foreground mb-4">Therapist Dashboard</p>
                <span className="text-sm font-medium text-[#7AE582] group-hover:underline">Click to login &rarr;</span>
              </button>

              {/* Admin Demo */}
              <button
                onClick={() => handleDemoLogin('Admin', 'admin@demo.com')}
                disabled={demoLoading !== null}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:bg-card disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#202B52]"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#202B52]/10 flex items-center justify-center text-[#202B52] group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-6 h-6" />
                  </div>
                  {demoLoading === 'Admin' && <Loader2 className="w-5 h-5 animate-spin text-[#202B52]" />}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Admin</h3>
                <p className="text-sm text-muted-foreground mb-4">Admin Panel</p>
                <span className="text-sm font-medium text-[#202B52] group-hover:underline">Click to login &rarr;</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
