
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import VideoUploadComponent from './VideoUploadComponent.jsx';
import VideoPlayerComponent from './VideoPlayerComponent.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const VideoManagementModal = ({ isOpen, onClose, exercise, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const existingVideoUrl = exercise?.video_url || null;

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(10); // Start progress immediately for UX

    try {
      const formData = new FormData();
      formData.append('video_file', selectedFile);

      // Fake progress interval while real upload happens
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const uploadedVideo = await apiServerClient.fetch('/videos', {
        method: 'POST',
        body: formData
      });

      const updatedRecord = await apiServerClient.fetch(`/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: uploadedVideo.video_url })
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      toast.success('Video uploaded successfully');
      onUpdate(updatedRecord);
      setSelectedFile(null);

      setTimeout(() => {
        onClose();
        setUploadProgress(0);
        setIsUploading(false);
      }, 500);

    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
      setIsUploading(false);
      setUploadProgress(0);
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
    <Dialog open={isOpen} onOpenChange={(open) => !isUploading && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Exercise Video</DialogTitle>
          <DialogDescription>
            Upload a demonstration video for {exercise?.name}. Maximum size 100MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {existingVideoUrl && !selectedFile && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Current Video</h4>
              <VideoPlayerComponent videoUrl={existingVideoUrl} thumbnailUrl={exercise.thumbnail_url} />
              <div className="flex justify-end">
                <Button variant="destructive" size="sm" onClick={handleDelete} className="gap-2" disabled={isUploading}>
                  <Trash2 className="w-4 h-4" /> Delete Video
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-medium">{existingVideoUrl ? 'Replace Video' : 'Upload New Video'}</h4>
            <VideoUploadComponent 
              onFileSelect={setSelectedFile} 
              isUploading={isUploading} 
              uploadProgress={uploadProgress} 
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Save Video'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoManagementModal;
