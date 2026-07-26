
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import VideoUploadComponent from './VideoUploadComponent.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const VideoManagementModal = ({ isOpen, onClose, exercise, onUpdate }) => {
  const [isLinking, setIsLinking] = useState(false);

  const existingVideoUrl = exercise?.video_url || null;

  // VideoUploadComponent uploads the file itself and hands back the created
  // `videos` row here; we just link it to this exercise.
  const handleUploadSuccess = async (uploadedVideo) => {
    setIsLinking(true);
    try {
      const updatedRecord = await apiServerClient.fetch(`/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          video_url: uploadedVideo.video_url,
          thumbnail_url: uploadedVideo.thumbnail_url
        })
      });

      toast.success('Video linked to exercise');
      onUpdate(updatedRecord);
      onClose();
    } catch (error) {
      console.error('Error linking video to exercise:', error);
      toast.error('Video uploaded, but failed to link it to the exercise');
    } finally {
      setIsLinking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete the current video?')) return;

    try {
      const updatedRecord = await apiServerClient.fetch(`/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: null })
      });

      toast.success('Video deleted successfully');
      onUpdate(updatedRecord);
    } catch (error) {
      console.error('Error deleting video:', error);
      toast.error('Failed to delete video');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isLinking && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Exercise Video</DialogTitle>
          <DialogDescription>
            Upload a demonstration video for {exercise?.name}. Maximum size 500MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {existingVideoUrl && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Current Video</h4>
              <VideoPlayerComponent videoUrl={existingVideoUrl} thumbnailUrl={exercise.thumbnail_url} />
              <div className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2" disabled={isLinking}>
                  <Trash2 className="w-4 h-4" /> Delete Video
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium">{existingVideoUrl ? 'Replace Video' : 'Upload New Video'}</h4>
            <VideoUploadComponent onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLinking}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoManagementModal;
