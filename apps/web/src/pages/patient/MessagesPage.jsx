
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Send, Image as ImageIcon, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Pastikan Button diimpor
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockMessages = [
  { id: 1, text: "Hi! How is the knee feeling after yesterday's exercises?", sender: 'therapist', time: '10:30 AM' },
  { id: 2, text: "Much better! The swelling has gone down significantly.", sender: 'patient', time: '10:45 AM' },
  { id: 3, text: "That's great news. Let's increase the reps to 15 for the straight leg raises today.", sender: 'therapist', time: '11:00 AM' },
];

const MessagesPage = () => {
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] flex flex-col animate-in fade-in duration-500">
      <Helmet><title>Messages | Physiome</title></Helmet>
      
      <header className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Messages</h1>
      </header>

      <Card className="flex-1 border-0 shadow-soft flex flex-col overflow-hidden bg-card">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary font-bold">SJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">Dr. Sarah Jenkins</h3>
              <p className="text-xs text-success font-medium">Online</p>
            </div>
          </div>
          <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl p-3 px-4 ${
                msg.sender === 'patient' 
                  ? 'bg-primary text-primary-foreground rounded-br-sm' 
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0">
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Input 
              placeholder="Type a message..." 
              className="flex-1 rounded-full bg-muted/50 border-transparent h-11"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button size="icon" className="rounded-full h-11 w-11 shrink-0 shadow-glow-primary">
              <Send className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MessagesPage;
