
import React from 'react';
import { useAuth } from '@/contexts/AuthContext.jsx';
// import { useLanguage } from '@/hooks/useLanguage.js';
import { useTranslation } from 'react-i18next';
import { Bell, User, LogOut, Settings, Globe, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { SidebarContent } from '@/components/Sidebar.jsx';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userRole = currentUser?.role || 'therapist';
  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu untuk Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <div className="p-6 border-b border-border/50">
                <SheetTitle className="text-xl font-bold text-primary">Physiome</SheetTitle>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <div className="w-8 h-8 bg-primary rounded-lg hidden md:flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">Physiome</span>
        </div>
        
        <div className="flex-1 flex justify-center px-2">
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {currentUser?.clinic_id ? t('common.clinicDashboard') : t('common.welcome')}
          </span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground hidden md:block">
                  {currentUser?.full_name || currentUser?.email}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser?.full_name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize mt-1">Role: {userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('nav.profileSettings')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings/language" className="cursor-pointer flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>{t('nav.languageSettings')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('nav.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
