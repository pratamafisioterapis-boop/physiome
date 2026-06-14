
import React from 'react';
import { VideoOff, ExternalLink } from 'lucide-react';

const VideoPlayerComponent = ({ videoUrl, thumbnailUrl, title = 'Exercise Video' }) => {
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-muted/50 rounded-xl border border-border flex flex-col items-center justify-center text-muted-foreground shadow-sm">
        <VideoOff className="w-12 h-12 mb-3 opacity-50" />
        <p className="font-medium text-foreground">No demonstration video available</p>
        <p className="text-sm">Please follow the written instructions.</p>
      </div>
    );
  }

  const cleanUrl = videoUrl.trim();

  // Deteksi jika URL adalah YouTube
  const isYouTube = cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be');

  if (isYouTube) {
    // Logika ekstraksi ID yang lebih kuat
    let videoId = null; // Default fallback video ID
    try {
      if (cleanUrl.includes('youtu.be/')) {
        videoId = cleanUrl.split('youtu.be/')[1]?.split(/[?#]/)[0];
      } else if (cleanUrl.includes('youtube.com/shorts/')) {
        videoId = cleanUrl.split('shorts/')[1]?.split(/[?#]/)[0];
      } else if (cleanUrl.includes('v=')) {
        videoId = cleanUrl.split('v=')[1]?.split('&')[0];
      } else if (cleanUrl.includes('embed/')) {
        videoId = cleanUrl.split('embed/')[1]?.split(/[?#]/)[0];
      }
    } catch (e) {
      console.error("Failed to parse YouTube URL", e);
    }

    if (!videoId) {
      return <div className="text-center p-4 border border-destructive rounded-xl text-destructive">Invalid YouTube Link</div>;
    }

    return (
      <div className="space-y-3">
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-muted">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a 
          href={cleanUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-1"
        >
          <ExternalLink className="w-3 h-3" /> Watch directly on YouTube if player doesn't load
        </a>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-border shadow-md bg-black relative">
      <video
        className="w-full h-full object-contain"
        controls
        poster={thumbnailUrl}
        preload="none"
        title={title}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/quicktime" />
      </video>
    </div>
  );
};

export default VideoPlayerComponent;
