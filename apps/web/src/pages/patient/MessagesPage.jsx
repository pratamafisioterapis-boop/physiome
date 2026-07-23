import React from 'react';
import { Helmet } from 'react-helmet';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ChatThread from '@/components/messages/ChatThread.jsx';

const MessagesPage = () => {
  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] flex flex-col animate-in fade-in duration-500">
      <Helmet><title>Messages | Physiome</title></Helmet>

      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Messages</h1>
        <p className="text-muted-foreground mt-1">Chat directly with your care team.</p>
      </header>

      <Card className="flex-1 border-0 shadow-soft flex flex-col overflow-hidden bg-card min-h-0">
        <div className="p-4 border-b border-border flex items-center gap-3 bg-muted/30 shrink-0">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-bold">CT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">Your Care Team</h3>
            <p className="text-xs text-muted-foreground">Usually replies within a day</p>
          </div>
        </div>

        <ChatThread emptyHint="No messages yet. Ask your therapist a question to get started." />
      </Card>
    </div>
  );
};

export default MessagesPage;
