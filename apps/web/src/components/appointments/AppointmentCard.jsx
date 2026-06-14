
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppointmentCard = ({ appointment, className, style }) => {
  const navigate = useNavigate();
  
  const statusStyles = {
    'Scheduled': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    'Confirmed': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    'Completed': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
  };

  return (
    <div 
      onClick={() => navigate(`/appointments/${appointment.id}`)}
      className={cn(
        'appointment-card flex flex-col gap-1',
        statusStyles[appointment.status] || 'bg-muted text-foreground',
        className
      )}
      style={style}
    >
      <div className="font-semibold truncate">{appointment.patients?.name || 'Unknown Patient'}</div>
      <div className="text-[10px] opacity-80 truncate">{appointment.time} ({appointment.duration}m)</div>
      <div className="text-[10px] opacity-80 truncate">{appointment.therapists?.user?.fullName || 'Unknown Therapist'}</div>
    </div>
  );
};

export default AppointmentCard;
