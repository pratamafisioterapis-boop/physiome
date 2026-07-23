
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Loader2 } from 'lucide-react';
import Button from '@/components/Button.jsx'; // Menggunakan Button kustom
import Input from '@/components/Input.jsx';
import Modal from '@/components/Modal.jsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const PatientProfilePage = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || ''
  });

  const openEditProfile = () => {
    setForm({
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || ''
    });
    setIsEditOpen(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(form);
      toast.success('Profil berhasil diperbarui');
      setIsEditOpen(false);
    } catch (error) {
      toast.error(error?.message || 'Gagal memperbarui profil');
    } finally {
      setIsSaving(false);
    }
  };

  const menuItems = [
    { icon: User, label: 'Personal Information', onClick: openEditProfile },
    { icon: Shield, label: 'Medical History', onClick: () => navigate('/patient/assessments') },
    { icon: Bell, label: 'Notifications', onClick: () => navigate('/patient/settings/account') },
    { icon: Settings, label: 'Account Settings', onClick: () => navigate('/patient/settings/account') },
    { icon: HelpCircle, label: 'Help & Support', onClick: () => window.open('mailto:support@physiome.app', '_blank') },
  ];

  return (
    <div className="mobile-page-container space-y-6">
      <Helmet><title>Profile | Physiome</title></Helmet>

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={currentUser?.avatar || ''} />
          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
            {currentUser?.fullName?.charAt(0) || 'P'}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{currentUser?.fullName || 'Patient Name'}</h2>
        <p className="text-muted-foreground text-sm">{currentUser?.email}</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-full px-6" onClick={openEditProfile}>
          Edit Profile
        </Button>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className={`w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-border' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-medium text-foreground">{item.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 rounded-2xl py-6"
        onClick={logout}
      >
        <LogOut className="w-5 h-5 mr-2" /> Log Out
      </Button>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Personal Information"
        footer={(
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </div>
        )}
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
          />
          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+62 812 3456 7890"
          />
        </form>
      </Modal>
    </div>
  );
};

export default PatientProfilePage;
