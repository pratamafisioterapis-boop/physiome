
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { PlayCircle } from 'lucide-react';
import { exerciseCoverImage } from '@/lib/exerciseMedia.js';

const ExerciseCard = ({ exercise, onComplete, isCompleted }) => {
  return (
    <Card className={`overflow-hidden transition-all duration-200 ${isCompleted ? 'opacity-60 bg-muted/50' : 'shadow-sm hover:shadow-md'}`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 relative overflow-hidden">
          {exerciseCoverImage(exercise) ? (
            <img src={exerciseCoverImage(exercise)} alt={exercise.name} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <PlayCircle className="w-6 h-6 text-primary" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-base truncate ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {exercise.name}
          </h4>
          <p className="text-sm text-muted-foreground mt-0.5">
            {exercise.sets} sets × {exercise.reps} reps
          </p>
          {exercise.duration && (
            <p className="text-xs text-muted-foreground mt-0.5">{exercise.duration}</p>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-center w-12 h-12">
          <Checkbox 
            checked={isCompleted} 
            onCheckedChange={() => onComplete(exercise.id)}
            className="w-6 h-6 rounded-full data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
