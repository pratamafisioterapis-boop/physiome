
import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient.js';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import Button from '@/components/Button.jsx'; // Menggunakan Button kustom
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const PatientProfilePage = () => {
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { icon: User, label: 'Personal Information' },
    { icon: Shield, label: 'Medical History' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Account Settings' },
    { icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="mobile-page-container space-y-6">
      <Helmet><title>Profile | Physiome</title></Helmet>
      
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      <div className="bg-card rounded-3xl p-6 shadow-sm border border-border flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={currentUser?.avatar ? pb.files.getUrl(currentUser, currentUser.avatar) : ''} />
          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
            {currentUser?.fullName?.charAt(0) || 'P'}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold">{currentUser?.fullName || 'Patient Name'}</h2>
        <p className="text-muted-foreground text-sm">{currentUser?.email}</p>
        <Button variant="outline" size="sm" className="mt-4 rounded-full px-6">Edit Profile</Button>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
        {menuItems.map((item, index) => (
          <button 
            key={index}
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
    </div>
  );
};

export default PatientProfilePage;
