
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import { Check } from 'lucide-react';
import { Helmet } from 'react-helmet';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, updateUserClinicId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [clinicData, setClinicData] = useState({
    name: location.state?.clinicName || '',
    phone: '',
    address: '',
    city: ''
  });
  
  const [therapistData, setTherapistData] = useState({
    name: currentUser?.fullName || '',
    specialization: '',
    licenseNumber: ''
  });
  
  const handleClinicChange = (e) => {
    const { name, value } = e.target;
    setClinicData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleTherapistChange = (e) => {
    const { name, value } = e.target;
    setTherapistData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    if (!clinicData.name) newErrors.name = 'Clinic name is required';
    return newErrors;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    if (!therapistData.name) newErrors.therapistName = 'Therapist name is required';
    return newErrors;
  };
  
  const handleNext = () => {
    if (currentStep === 1) {
      const newErrors = validateStep1();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    } else if (currentStep === 2) {
      const newErrors = validateStep2();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Update user profile, therapist details, and clinic contact info in one call
      await apiServerClient.fetch('/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: therapistData.name,
          specialization: therapistData.specialization,
          licenseNumber: therapistData.licenseNumber,
          phone: clinicData.phone,
          address: clinicData.address,
          city: clinicData.city
        })
      });
      
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to complete onboarding' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const steps = [
    { number: 1, title: 'Clinic information' },
    { number: 2, title: 'First therapist' },
    { number: 3, title: 'Summary' }
  ];
  
  return (
    <>
      <Helmet>
        <title>Onboarding - Physiome</title>
        <meta name="description" content="Complete your clinic setup" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Set up your clinic</h1>
              <p className="text-muted-foreground">Complete these steps to get started</p>
            </div>
            
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.number 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep === step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block ${
                      currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${
                      currentStep > step.number ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <div className="min-h-[300px]">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Clinic information</h2>
                  <Input
                    label="Clinic name"
                    name="name"
                    value={clinicData.name}
                    onChange={handleClinicChange}
                    error={errors.name}
                    placeholder="Your Clinic Name"
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={clinicData.phone}
                    onChange={handleClinicChange}
                    placeholder="+1 (555) 123-4567"
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={clinicData.address}
                    onChange={handleClinicChange}
                    placeholder="123 Main Street"
                  />
                  <Input
                    label="City"
                    name="city"
                    value={clinicData.city}
                    onChange={handleClinicChange}
                    placeholder="New York"
                  />
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Professional Information</h2>
                  <Input
                    label="Full Name"
                    name="name"
                    value={therapistData.name}
                    onChange={handleTherapistChange}
                    error={errors.therapistName}
                    required
                  />
                  <Input
                    label="Specialization"
                    name="specialization"
                    value={therapistData.specialization}
                    onChange={handleTherapistChange}
                    placeholder="e.g. Musculoskeletal Physiotherapy"
                  />
                  <Input
                    label="License Number (STR)"
                    name="licenseNumber"
                    value={therapistData.licenseNumber}
                    onChange={handleTherapistChange}
                    placeholder="Your professional license number"
                  />
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Review and confirm</h2>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Clinic details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground font-medium">{clinicData.name}</span>
                      </div>
                      {clinicData.phone && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span className="text-foreground">{clinicData.phone}</span>
                        </div>
                      )}
                      {clinicData.address && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="text-foreground">{clinicData.address}</span>
                        </div>
                      )}
                      {clinicData.city && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City:</span>
                          <span className="text-foreground">{clinicData.city}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-3">Professional details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground font-medium">{therapistData.name}</span>
                      </div>
                      {therapistData.specialization && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Specialization:</span>
                          <span className="text-foreground">{therapistData.specialization}</span>
                        </div>
                      )}
                      {therapistData.licenseNumber && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">License:</span>
                          <span className="text-foreground">{therapistData.licenseNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {errors.submit && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{errors.submit}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isLoading}
              >
                Back
              </Button>
              
              {currentStep < 3 ? (
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={handleComplete}
                  disabled={isLoading}
                >
                  {isLoading ? 'Setting up...' : 'Complete setup'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
