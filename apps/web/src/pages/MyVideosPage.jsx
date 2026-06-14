
import React, { useState, useEffect } from 'react';
import { FileVideo, MoreVertical, Edit2, Trash2, Play, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import apiServerClient from '@/lib/apiServerClient.js';
import { useAuth } from '@/contexts/AuthContext.jsx';
import Sidebar from '@/components/Sidebar.jsx';
import Header from '@/components/Header.jsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import VideoUploadComponent from '@/components/VideoUploadComponent.jsx';
import Modal from '@/components/Modal.jsx';
import { toast } from 'sonner';

export default function MyVideosPage() {
  const { currentUser } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const fetchVideos = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await apiServerClient.fetch('/videos');
      setVideos(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [currentUser]);

  const handleUploadSuccess = (newVideo) => {
    toast.success("Video added to your library");
    setShowUpload(false);
    fetchVideos();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await apiServerClient.fetch(`/videos/${id}`, { method: 'DELETE' });
        toast.success("Video deleted successfully");
        setVideos(videos.filter(v => v.id !== id));
      } catch (error) {
        toast.error("Failed to delete video");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 flex flex-col min-w-0">
        <Header title="My Videos" />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Video Library</h1>
              <p className="text-muted-foreground mt-1">Manage and upload your exercise demonstration videos.</p>
            </div>
            <Button 
              onClick={() => setShowUpload(!showUpload)} 
              className="shadow-glow-primary gap-2"
              variant={showUpload ? "secondary" : "default"}
            >
              {showUpload ? 'Cancel Upload' : <><Plus className="w-4 h-4" /> Upload Video</>}
            </Button>
          </div>

          {showUpload && (
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
              <VideoUploadComponent onUploadSuccess={handleUploadSuccess} />
            </div>
          )}
          
          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-56 bg-muted animate-pulse rounded-2xl"></div>)}
             </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map(v => (
                <Card key={v.id} className="border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col">
                  <div className="relative aspect-video bg-secondary/10 flex items-center justify-center overflow-hidden">
                    {v.thumbnail_url ? (
                      <img src={v.thumbnail_url} alt={v.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <FileVideo className="w-12 h-12 text-muted-foreground/30" />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button 
                        size="icon" 
                        variant="secondary" 
                        className="rounded-full w-12 h-12 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300"
                        onClick={() => setPlayingVideo(v)}
                      >
                        <Play className="w-6 h-6 ml-1 text-foreground" />
                      </Button>
                    </div>
                    {v.duration > 0 && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                        {Math.floor(v.duration / 60)}:{String(v.duration % 60).padStart(2, '0')}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex items-start justify-between flex-1">
                    <div className="overflow-hidden pr-2 flex-1">
                      <h4 className="font-semibold text-foreground line-clamp-1" title={v.name}>{v.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 h-8">
                        {v.description || 'No description provided.'}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shrink-0 text-muted-foreground hover:text-foreground">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit2 className="w-4 h-4 mr-2" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => handleDelete(v.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
             <div className="text-center py-20 px-4 border-2 border-dashed border-border rounded-3xl bg-card/50">
               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                 <FileVideo className="w-10 h-10 text-muted-foreground/50" />
               </div>
               <h3 className="text-xl font-bold text-foreground mb-2">No videos found</h3>
               <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                 You haven't uploaded any exercise videos yet. Upload your first video to start building your library.
               </p>
               <Button onClick={() => setShowUpload(true)} className="shadow-glow-primary gap-2">
                 <Plus className="w-4 h-4" /> Upload First Video
               </Button>
             </div>
          )}

        </main>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <Modal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          title={playingVideo.name}
        >
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <video 
              src={playingVideo.video_url} 
              controls 
              autoPlay 
              className="w-full h-full"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
