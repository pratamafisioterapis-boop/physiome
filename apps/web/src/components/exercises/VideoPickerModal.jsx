import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal.jsx';
import Button from '@/components/Button.jsx';
import apiServerClient from '@/lib/apiServerClient.js';
import { FileVideo, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const VideoPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchVideos = async () => {
        setIsLoading(true);
        try {
          const data = await apiServerClient.fetch('/videos');
          setVideos(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
          console.error("Error fetching videos:", error);
          toast.error("Failed to load videos from library");
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideos();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Video from Library">
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading your video library...</p>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1">
            {videos.map((v) => (
              <div 
                key={v.id} 
                className="group relative aspect-video bg-secondary/10 rounded-xl overflow-hidden border border-border hover:border-primary cursor-pointer transition-all shadow-sm"
                onClick={() => onSelect(v)}
              >
                {v.thumbnail_url ? (
                  <img src={v.thumbnail_url} alt={v.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground p-1.5 rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                   <p className="text-[10px] text-white truncate font-medium">{v.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed">
            <FileVideo className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No videos found. Upload them in "My Videos" first.</p>
          </div>
        )}
        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default VideoPickerModal;