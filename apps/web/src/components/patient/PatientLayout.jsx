
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Dumbbell, Video, TrendingUp, Activity, 
  Calendar, MessageSquare, MonitorPlay, ClipboardList, 
  Trophy, BookOpen, User, LogOut, Menu, X, Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { toast } from 'sonner';

const PatientLayout = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success(t('common.loggedOut') || 'Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { name: t('nav.dashboard'), path: '/patient/dashboard', icon: LayoutDashboard },
    { name: t('nav.myPrograms'), path: '/patient/programs', icon: Dumbbell },
    { name: t('nav.exerciseVideos'), path: '/patient/videos', icon: Video },
    { name: t('nav.recoveryProgress'), path: '/patient/recovery', icon: TrendingUp },
    { name: t('nav.painTracking'), path: '/patient/pain-tracking', icon: Activity },
    { name: t('nav.appointments'), path: '/patient/appointments', icon: Calendar },
    { name: t('nav.messages'), path: '/patient/messages', icon: MessageSquare },
    { name: t('nav.telehealth'), path: '/patient/telehealth', icon: MonitorPlay },
    { name: t('nav.assessments'), path: '/patient/assessments', icon: ClipboardList },
    { name: t('nav.achievements'), path: '/patient/achievements', icon: Trophy },
    { name: t('nav.educationCenter'), path: '/patient/education', icon: BookOpen },
    { name: t('nav.myProfile'), path: '/patient/profile', icon: User },
  ];

  const bottomNavItems = [
    { name: t('nav.home'), path: '/patient/dashboard', icon: LayoutDashboard },
    { name: t('nav.myPrograms'), path: '/patient/programs', icon: Dumbbell },
    { name: t('nav.recoveryProgress'), path: '/patient/recovery', icon: TrendingUp },
    { name: t('nav.messages'), path: '/patient/messages', icon: MessageSquare },
    { name: t('nav.myProfile'), path: '/patient/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border z-20">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">P</div>
            <span className="font-bold text-xl tracking-tight text-foreground">Physiome</span>
          </div>
        </div>
        <ScrollArea className="flex-1 py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/5 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border space-y-2">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => navigate('/patient/settings/language')}>
            <Globe className="w-4 h-4 mr-2" /> {t('nav.languageSettings')}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> {t('nav.logout')}
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">P</div>
          <span className="font-bold text-lg tracking-tight text-foreground">Physiome</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-20 overflow-y-auto pb-20">
          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/5 hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 mt-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground px-4 py-3 h-auto text-base" onClick={() => { navigate('/patient/settings/language'); setMobileMenuOpen(false); }}>
                <Globe className="w-5 h-5 mr-3" /> {t('nav.languageSettings')}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive px-4 py-3 h-auto text-base" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-3" /> {t('nav.logout')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0 pb-20 md:pb-0 relative">
        <div className="hidden md:block absolute top-4 right-8 z-10">
          <LanguageSwitcher />
        </div>
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-30 pb-safe">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default PatientLayout;
