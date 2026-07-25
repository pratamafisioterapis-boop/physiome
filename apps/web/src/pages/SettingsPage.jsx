
import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Pastikan Label diimpor
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import InviteCodeManager from '@/components/admin/InviteCodeManager.jsx';
import { getChatPushStatus, enableChatPushNotifications, disableChatPushNotifications, isPushSupported } from '@/lib/push.js';

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const [chatPushEnabled, setChatPushEnabled] = React.useState(false);
  const [chatPushBusy, setChatPushBusy] = React.useState(false);

  React.useEffect(() => {
    getChatPushStatus().then((status) => setChatPushEnabled(status === 'subscribed'));
  }, []);

  const handleToggleChatPush = async (checked) => {
    if (!isPushSupported()) {
      toast.error('This browser does not support push notifications');
      return;
    }
    setChatPushBusy(true);
    try {
      if (checked) {
        await enableChatPushNotifications();
        setChatPushEnabled(true);
        toast.success('Patient message notifications enabled');
      } else {
        await disableChatPushNotifications();
        setChatPushEnabled(false);
        toast.success('Patient message notifications disabled');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update notification settings');
    } finally {
      setChatPushBusy(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved successfully');
  };

  return (
  <>
    <Helmet>
      <title>Settings | Physiome</title>
    </Helmet>

    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">

            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and clinic preferences.
              </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8 h-auto flex-wrap">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="clinic">Clinic</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences" className="hidden md:block">
                  Preferences
                </TabsTrigger>
                {currentUser?.role === 'admin' && (
                  <TabsTrigger value="invite-codes">
                    Invite Codes
                  </TabsTrigger>
                )}
                <TabsTrigger value="account" className="hidden lg:block">
                  Account
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Therapist Profile
                  </h2>

                  <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={currentUser?.fullName || ''} />
                      </div>

                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          defaultValue={currentUser?.email || ''}
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input placeholder="+1 (555) 000-0000" />
                      </div>

                      <div className="space-y-2">
                        <Label>License Number</Label>
                        <Input placeholder="PT-123456" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        placeholder="Brief professional biography..."
                        className="min-h-[100px]"
                      />
                    </div>

                    <Button type="submit">
                      Save Profile
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="clinic">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Clinic Settings
                  </h2>

                  <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                    <div className="space-y-2">
                      <Label>Clinic Name</Label>
                      <Input defaultValue="Physiome Clinic" />
                    </div>

                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea placeholder="123 Medical Center Blvd..." />
                    </div>

                    <Button type="submit">
                      Save Clinic Details
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6 max-w-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive daily summaries and alerts via email.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Appointment Reminders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified 15 minutes before appointments.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Patient Messages
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get a push notification when a patient sends a new message, even when the app is closed.
                        </p>
                      </div>
                      <Switch checked={chatPushEnabled} disabled={chatPushBusy} onCheckedChange={handleToggleChatPush} />
                    </div>

                    <Button onClick={handleSave}>
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    Security & Privacy
                  </h2>

                  <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                    <div className="space-y-4 border-b border-border pb-6">
                      <h3 className="font-medium">Change Password</h3>

                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" />
                      </div>

                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" />
                      </div>

                      <Button type="button" variant="secondary">
                        Update Password
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <Label className="text-base">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account.
                        </p>
                      </div>

                      <Switch />
                    </div>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="preferences">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">
                    App Preferences
                  </h2>

                  <p className="text-muted-foreground">
                    Theme and localization settings coming soon.
                  </p>
                </div>
              </TabsContent>

              {currentUser?.role === 'admin' && (
                <TabsContent value="invite-codes">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <InviteCodeManager />
                  </div>
                </TabsContent>
              )}

              <TabsContent value="account">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-6 text-destructive">
                    Danger Zone
                  </h2>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>

                    <Button
                      variant="destructive"
                      onClick={() =>
                        window.confirm('Are you absolutely sure?')
                      }
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </TabsContent>

            </Tabs>

          </div>
        </main>
      </div>
    </div>
  </>
);
}
