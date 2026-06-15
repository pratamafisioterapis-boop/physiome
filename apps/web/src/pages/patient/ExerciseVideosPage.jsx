import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, Filter, PlayCircle, Loader2, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import apiServerClient from '@/lib/apiServerClient.js';
import { toast } from 'sonner';
import Modal from '@/components/Modal.jsx';
import VideoPlayerComponent from '@/components/exercises/VideoPlayerComponent.jsx';

const ExerciseVideosPage = () => {
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiServerClient.fetch('/program-assignments/my-exercises'); // Mengambil latihan dari program yang ditugaskan
        setVideos(Array.isArray(data) ? data : (data.data || []));
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Failed to load video library");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const categories = ['All', ...new Set(videos.map(v => v.body_region).filter(Boolean))];

  const filteredVideos = videos.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || v.body_region === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Helmet><title>Video Library | Physiome</title></Helmet>
      
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Exercise Videos</h1>
        <p className="text-muted-foreground mt-1">Browse your prescribed exercise demonstrations.</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search exercises..." 
            className="pl-9 bg-card border-border rounded-xl h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-xl h-11 shrink-0">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <Badge 
            key={cat} 
            variant={selectedCategory === cat ? 'default' : 'secondary'} 
            className="px-4 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <Card key={i} className="border-0 shadow-soft overflow-hidden">
              <Skeleton className="h-48 w-full rounded-none" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Card 
              key={video.id} 
              className="border-0 shadow-soft overflow-hidden group cursor-pointer"
              onClick={() => setPlayingVideo(video)}
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                {video.thumbnail_url ? (
                  <img src={video.thumbnail_url} alt={video.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/5">
                    <Dumbbell className="w-12 h-12 text-muted-foreground/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-1 truncate">{video.name}</h3>
                <p className="text-sm text-muted-foreground">{video.body_region || 'General'}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border">
            <p className="text-muted-foreground text-lg">No exercises found in your video library.</p>
          </div>
        )}
      </div>

      {playingVideo && (
        <Modal
          isOpen={!!playingVideo}
          onClose={() => setPlayingVideo(null)}
          title={playingVideo.name}
          size="xl"
        >
          <div className="space-y-6">
            <VideoPlayerComponent 
              videoUrl={playingVideo.video_url} 
              thumbnailUrl={playingVideo.thumbnail_url} 
              title={playingVideo.name} 
            />
            {playingVideo.instructions && (
              <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Instructions</h4>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">{playingVideo.instructions}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ExerciseVideosPage;
