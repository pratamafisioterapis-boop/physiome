
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Settings, LogOut, 
  Activity, Video, Dumbbell, ClipboardList, TrendingUp, BarChart3, Presentation, PlusSquare,
  Building2, User, HeartPulse, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { cn } from '@/lib/utils.js';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/Logo.jsx';

export const SidebarContent = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = currentUser?.role || 'therapist';
  
  // Super Admin gets only their own menu
  if (role === 'super_admin') {
    const superAdminMenuGroups = [
      {
        title: t('nav.superAdmin') || 'Super Admin',
        items: [
          { name: 'Super Admin Console', path: '/super-admin', icon: LayoutDashboard, roles: ['super_admin'] },
          { name: 'Clinics', path: '/super-admin/clinics', icon: Building2, roles: ['super_admin'] },
          { name: 'Users', path: '/super-admin/users', icon: User, roles: ['super_admin'] },
          { name: 'Payment Settings', path: '/super-admin/payment-settings', icon: Settings, roles: ['super_admin'] },
        ]
      },
      {
        title: t('nav.exerciseEcosystem') || 'Exercise Ecosystem',
        items: [
          { name: t('nav.library') || 'Exercise Library', path: '/exercise-library', icon: Dumbbell, roles: ['super_admin'] },
          { name: t('nav.templates') || 'Program Templates', path: '/program-templates', icon: Presentation, roles: ['super_admin'] },
          { name: t('nav.builder') || 'Program Builder', path: '/program-builder', icon: PlusSquare, roles: ['super_admin'] },
        ]
      }
    ];
    
    return (
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 py-4 px-4">
          <div className="space-y-8">
            {superAdminMenuGroups.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                        isActive 
                          ? "bg-blue-50 text-blue-700 border-blue-300 shadow-sm" 
                          : "text-muted-foreground hover:bg-gray-50 hover:text-foreground border-transparent"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium">
              {currentUser?.fullName?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">{currentUser?.fullName || 'Super Admin'}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">super_admin</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-transparent"
            onClick={() => {
              logout();
              toast.success('Logged out successfully');
              navigate('/login');
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('nav.logout')}
          </Button>
        </div>
      </div>
    );
  }

  // Regular admin/therapist menu
  const menuGroups = [
    {
      title: t('common.general') || 'General',
      items: [
        { name: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'therapist'] },
        { name: t('nav.patients'), path: '/patients', icon: Users, roles: ['admin', 'therapist'] },
        { name: t('nav.therapists'), path: '/therapists', icon: Users, roles: ['admin'] },
        { name: t('nav.appointments'), path: '/appointments', icon: Calendar, roles: ['admin', 'therapist'] },
        { name: t('nav.monitoring') || 'Monitoring', path: '/patient-monitoring', icon: HeartPulse, roles: ['admin', 'therapist'] },
        { name: t('nav.messages') || 'Messages', path: '/messages', icon: MessageSquare, roles: ['admin', 'therapist'] },
      ]
    },
    {
      title: t('nav.exerciseEcosystem') || 'Exercise Ecosystem',
      items: [
        { name: t('nav.overview'), path: '/exercise-dashboard', icon: Activity, roles: ['admin', 'therapist'] },
        { name: t('nav.library'), path: '/exercise-library', icon: Dumbbell, roles: ['super_admin','admin', 'therapist'] },
        { name: t('nav.myVideos'), path: '/my-videos', icon: Video, roles: ['admin', 'therapist'] },
        { name: 'My Programs', path: '/exercise-programs', icon: ClipboardList, roles: ['admin', 'therapist'] },
        { name: t('nav.builder'), path: '/program-builder', icon: PlusSquare, roles: ['super_admin', 'admin', 'therapist'] },
        { name: t('nav.templates'), path: '/program-templates', icon: Presentation, roles: ['super_admin','admin', 'therapist'] },
        { name: t('nav.assigned'), path: '/assigned-programs', icon: ClipboardList, roles: ['admin', 'therapist'] },
        { name: t('nav.patientProgress'), path: '/patient-progress', icon: TrendingUp, roles: ['admin', 'therapist'] },
        { name: t('nav.analytics'), path: '/exercise-analytics', icon: BarChart3, roles: ['admin', 'therapist'] },
      ]
    },
    {
      title: t('nav.settings'),
      items: [
        { name: t('nav.settings'), path: '/settings', icon: Settings, roles: ['admin', 'therapist'] },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 py-4 px-4">
        <div className="space-y-8">
          {menuGroups.map((group, idx) => {
            const visibleItems = group.items.filter(item => item.roles.includes(role));
            if (visibleItems.length === 0) return null;
            
            return (
              <div key={idx}>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  {group.title}
                </h4>
                <div className="space-y-1">
                  {visibleItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                        isActive 
                          ? "bg-blue-50 text-blue-700 border-blue-300 shadow-sm" 
                          : "text-muted-foreground hover:bg-gray-50 hover:text-foreground border-transparent"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-medium">
            {currentUser?.fullName?.charAt(0) || currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-foreground">{currentUser?.fullName || currentUser?.name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate capitalize">{role}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-transparent"
          onClick={() => {
            logout();
            toast.success('Logged out successfully');
            navigate('/login');
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('nav.logout')}
        </Button>
      </div>
    </div>
  );
};

export default function Sidebar() {
  return (
    <div className="w-64 bg-card border-r border-border h-screen flex-col fixed left-0 top-0 z-40 hidden md:flex">
      <div className="p-6 border-b border-border/50">
        <Logo />
      </div>
      
      <div className="flex-1 overflow-hidden">
        <SidebarContent />
      </div>
    </div>
  );
}
