
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { formatPeriod, formatRupiah } from '@/lib/billing.js';
import Button from '@/components/Button.jsx';
import Input from '@/components/Input.jsx';
import { Helmet } from 'react-helmet';
import Select from '@/components/Select.jsx';

import { Building2, Stethoscope, User, UserCog, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ACCOUNT_TYPES = [
  { value: 'clinic', label: 'Klinik', description: 'Daftarkan klinik baru dan jadi adminnya', icon: Building2 },
  { value: 'solo', label: 'Praktek Mandiri', description: 'Untuk fisioterapis yang berpraktik sendiri', icon: UserCog },
  { value: 'therapist', label: 'Terapis', description: 'Bergabung ke klinik dengan kode undangan', icon: Stethoscope },
  { value: 'patient', label: 'Pasien', description: 'Mulai program latihan, atau bergabung ke klinik Anda', icon: User },
];

// Klinik dan praktek mandiri sama-sama membuat tenant baru; bedanya hanya
// default nama dan paket. Praktek mandiri bukan jenis tenant ketiga.
const CREATES_PRACTICE = ['clinic', 'solo'];

const SignupPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup } = useAuth();
  const [accountType, setAccountType] = useState('clinic');
  const [hasInviteCode, setHasInviteCode] = useState(false);
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    clinicName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    packagePlan: 'demo-14',
    alsoPractises: true
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Paket dibaca dari database, bukan daftar hardcode, supaya halaman
  // pendaftaran tidak pernah menawarkan harga yang sudah tidak berlaku.
  useEffect(() => {
    let cancelled = false;
    apiServerClient
      .fetch('/subscription/plans')
      .then((data) => { if (!cancelled) setPlans(Array.isArray(data) ? data : []); })
      .catch(() => { if (!cancelled) setPlans([]); });
    return () => { cancelled = true; };
  }, []);

  // Datang dari halaman harga: /register?plan=solo-monthly
  useEffect(() => {
    const plan = searchParams.get('plan');
    if (!plan) return;
    setFormData((prev) => ({ ...prev, packagePlan: plan }));
    if (plan.startsWith('solo')) setAccountType('solo');
    else if (plan.startsWith('patient')) setAccountType('patient');
    else if (plan.startsWith('clinic')) setAccountType('clinic');
  }, [searchParams]);

  const handleAccountTypeChange = (value) => {
    setAccountType(value);
    setHasInviteCode(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const needsInviteCode = accountType === 'therapist' || (accountType === 'patient' && hasInviteCode);

  // Terapis dan pasien-via-undangan ditanggung kliniknya, jadi tidak memilih
  // paket. Sisanya mendapat uji coba gratis plus paket yang relevan.
  const planAudience = accountType === 'solo' ? 'solo' : accountType === 'patient' ? 'patient' : 'clinic';
  const planOptions = needsInviteCode || accountType === 'therapist'
    ? []
    : [
        { label: 'Uji coba gratis', value: 'demo-14' },
        ...plans
          .filter((p) => p.audience === planAudience)
          .map((p) => ({ label: `${p.name_id} — ${formatRupiah(p.price_idr)} ${formatPeriod(p)}`, value: p.code })),
      ];

  const validate = () => {
    const newErrors = {};
    if (accountType === 'clinic' && !formData.clinicName) newErrors.clinicName = 'Nama klinik wajib diisi';
    if (needsInviteCode && !formData.inviteCode) {
      newErrors.inviteCode = 'Kode undangan dari klinik Anda wajib diisi';
    }
    if (!formData.fullName) newErrors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    if (!formData.password) newErrors.password = 'Kata sandi wajib diisi';
    if (formData.password.length < 8) newErrors.password = 'Kata sandi minimal 8 karakter';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Kata sandi tidak cocok';
    }
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
      const { user, checkoutPlanCode } = await signup({
        accountType,
        clinicName: formData.clinicName,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        inviteCode: needsInviteCode ? formData.inviteCode : undefined,
        packagePlan: formData.packagePlan,
        alsoPractises: accountType === 'clinic' ? formData.alsoPractises : true
      });
      toast.success('Akun berhasil dibuat.');

      // Paket berbayar dipilih saat daftar: langsung ke pembayaran. Uji coba
      // tetap berjalan, jadi tidak ada yang terkunci sambil menimbang-nimbang.
      if (checkoutPlanCode) {
        navigate(`/billing/checkout?plan=${encodeURIComponent(checkoutPlanCode)}`);
      } else if (CREATES_PRACTICE.includes(accountType)) {
        navigate('/onboarding', { state: { clinicName: formData.clinicName } });
      } else if (user.role === 'patient') {
        navigate('/patient/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error?.response?.message || error?.message || 'Gagal membuat akun. Silakan coba lagi.';
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up - Physiome</title>
        <meta name="description" content="Create your Physiome account and start managing your physiotherapy clinic" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-soft-lg border border-border p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Create your account</h1>
              <p className="text-muted-foreground">Choose how you'd like to join Physiome</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {ACCOUNT_TYPES.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAccountTypeChange(value)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-sm font-medium transition-colors ${
                    accountType === value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center -mt-3 mb-6">
              {ACCOUNT_TYPES.find((t) => t.value === accountType)?.description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {accountType === 'clinic' && (
                <>
                  <Input
                    label="Nama klinik"
                    type="text"
                    name="clinicName"
                    value={formData.clinicName}
                    onChange={handleChange}
                    error={errors.clinicName}
                    placeholder="Nama Klinik Anda"
                    required
                  />
                  {/* Tanpa baris `therapists`, admin klinik tidak bisa dijadwalkan
                      pada janji temu — appointments.therapist_id menunjuk ke sana. */}
                  <label className="flex items-start gap-2.5 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      name="alsoPractises"
                      checked={formData.alsoPractises}
                      onChange={handleChange}
                      className="mt-0.5 rounded border-border"
                    />
                    <span>Saya juga praktik sebagai fisioterapis di klinik ini</span>
                  </label>
                </>
              )}

              {accountType === 'solo' && (
                <Input
                  label="Nama praktek"
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={handleChange}
                  error={errors.clinicName}
                  placeholder={formData.fullName ? `Praktik ${formData.fullName}` : 'Nama praktek Anda'}
                />
              )}

              {accountType === 'patient' && (
                <div className="rounded-xl border border-border p-3">
                  <label className="flex items-start gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasInviteCode}
                      onChange={(e) => setHasInviteCode(e.target.checked)}
                      className="mt-0.5 rounded border-border"
                    />
                    <span>Punya kode undangan dari klinik?</span>
                  </label>
                  <p className="mt-1.5 ml-6 text-xs text-muted-foreground">
                    {hasInviteCode
                      ? 'Anda akan bergabung ke klinik yang menerbitkan kode tersebut.'
                      : 'Tanpa kode, Anda mendaftar langsung dan program latihan Anda didampingi terapis Kaffah.'}
                  </p>
                </div>
              )}

              {needsInviteCode && (
                <Input
                  label="Kode undangan"
                  type="text"
                  name="inviteCode"
                  value={formData.inviteCode}
                  onChange={handleChange}
                  error={errors.inviteCode}
                  placeholder="mis. ABC123XYZ"
                  required
                />
              )}

              <Input
                label="Full name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="John Smith"
                required
              />

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

              {accountType === 'patient' && (
                <Input
                  label="Phone (optional)"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="+62 812 3456 7890"
                />
              )}

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="At least 8 characters"
                required
              />

              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Re-enter your password"
                required
              />

              {planOptions.length > 1 && (
                <div>
                  <Select
                    label="Pilih paket"
                    id="packagePlan"
                    name="packagePlan"
                    value={formData.packagePlan}
                    onChange={handleChange}
                    options={planOptions}
                    isSearchable={false}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.packagePlan === 'demo-14'
                      ? 'Uji coba gratis, tanpa perlu pembayaran.'
                      : 'Uji coba tetap berjalan. Setelah mendaftar Anda akan diarahkan ke pembayaran QRIS.'}
                  </p>
                </div>
              )}

              {errors.submit && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{errors.submit}</p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-base font-medium shadow-glow-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
