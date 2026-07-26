
import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Clock, Dumbbell, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage.js';
import { getExerciseTranslation } from '@/utils/translationHelpers.js';
import Modal from '@/components/Modal.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import ExerciseDemoPhotos from './ExerciseDemoPhotos.jsx';
import { exerciseCoverImage } from '@/lib/exerciseMedia.js';

const ExerciseCard = ({ exercise, onAdd, isBuilder = false, isAdded = false }) => {
  const { language, t } = useLanguage();
  const [translatedEx, setTranslatedEx] = useState(exercise);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    const loadTranslation = async () => {
      if (language !== 'en') {
        const translation = await getExerciseTranslation(exercise.id, language);
        if (translation) {
          setTranslatedEx({
            ...exercise,
            name: translation.name || exercise.name,
            description: translation.description || exercise.description
          });
        } else {
          setTranslatedEx(exercise);
        }
      } else {
        setTranslatedEx(exercise);
      }
    };
    loadTranslation();
  }, [exercise, language]);

  return (
    <>
    <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative aspect-video bg-muted">
        {/* Foto peragaan menggantikan poster video selama videonya belum ada. */}
        {exerciseCoverImage(translatedEx) ? (
          <img
            src={exerciseCoverImage(translatedEx)}
            alt={translatedEx.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary/5">
            <Dumbbell className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="secondary" 
            size="icon" 
            className="rounded-full w-12 h-12"
            onClick={() => setIsPreviewOpen(true)}
          >
            <Play className="w-6 h-6 ml-1" />
          </Button>
        </div>

        <div className="absolute top-2 right-2 flex gap-2">
          <span className="px-2 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-md shadow-sm">
            {translatedEx.difficulty || 'Beginner'}
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-foreground text-lg mb-1 line-clamp-1">{translatedEx.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
          {translatedEx.description || 'No description available.'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> {translatedEx.body_region}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5m</span>
          </div>
          
          {isBuilder && (
            <Button 
              size="sm" 
              variant={isAdded ? "secondary" : "default"}
              className={`rounded-full px-4 ${isAdded ? 'bg-success/10 text-success hover:bg-success/20' : ''}`}
              onClick={() => onAdd && onAdd(translatedEx)}
              disabled={isAdded}
            >
              {isAdded ? <><Check className="w-4 h-4 mr-1" /> Added</> : <><Plus className="w-4 h-4 mr-1" /> {t('exercises.assign')}</>}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>

    <Modal
      isOpen={isPreviewOpen}
      onClose={() => setIsPreviewOpen(false)}
      title={translatedEx.name}
      size="xl"
    >
      <div className="space-y-6">
        {(translatedEx.video_url || translatedEx.thumbnail_url) && (
          <VideoPlayerComponent
            videoUrl={translatedEx.video_url}
            thumbnailUrl={translatedEx.thumbnail_url}
            title={translatedEx.name}
          />
        )}

        <ExerciseDemoPhotos exercise={translatedEx} language={language} />
        
        {translatedEx.instructions && (
          <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {t('exercises.instructions') || 'Instructions'}
            </h4>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{translatedEx.instructions}</p>
          </div>
        )}
      </div>
    </Modal>
    </>
  );
};

export default ExerciseCard;
