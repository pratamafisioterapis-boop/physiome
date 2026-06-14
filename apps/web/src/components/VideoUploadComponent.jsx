
import React, { useState, useRef } from 'react';
import { Upload, X, FileVideo, AlertCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';

const VideoUploadComponent = ({ 
  onUploadSuccess, 
  maxFileSize = 524288000, // 500MB default
  acceptedFormats = ['mp4', 'mov', 'webm'] 
}) => {
  const { currentUser } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const inputRef = useRef(null);
  const xhrRef = useRef(null);

  const mimeTypeMap = {
    'mp4': 'video/mp4',
    'mov': 'video/quicktime',
    'webm': 'video/webm'
  };

  const allowedMimeTypes = acceptedFormats.map(ext => mimeTypeMap[ext.toLowerCase()]).filter(Boolean);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(Math.round(video.duration));
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const validateFile = (file) => {
    if (!allowedMimeTypes.includes(file.type)) {
      toast.error(`Invalid file type. Allowed formats: ${acceptedFormats.join(', ').toUpperCase()}`);
      return false;
    }
    if (file.size > maxFileSize) {
      toast.error(`File size exceeds ${(maxFileSize / (1024 * 1024)).toFixed(0)}MB limit.`);
      return false;
    }
    return true;
  };

  const processFile = async (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, name: file.name.split('.').slice(0, -1).join('.') }));
      const duration = await getVideoDuration(file);
      setVideoDuration(duration);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setVideoDuration(0);
    setFormData({ name: '', description: '' });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleCancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    if (!formData.name.trim()) {
      toast.error('Please provide a title for the video');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Ambil token secara konsisten. 
    // Cek di tab Application -> Local Storage, pastikan key mana yang berisi JWT.
    let token = localStorage.getItem('token') || 
                localStorage.getItem('accessToken') || 
                localStorage.getItem('auth_token');

    // Membersihkan token dari tanda kutip jika tersimpan sebagai JSON string
    if (token && (token.startsWith('"') || token.startsWith("'"))) {
      token = token.slice(1, -1);
    }

    if (!token || token === 'null' || token === 'undefined') {
      toast.error('Session expired. Please login again.');
      setIsUploading(false);
      return;
    }

    const uploadData = new FormData();
    uploadData.append('video_file', selectedFile);
    uploadData.append('name', formData.name.trim());
    uploadData.append('description', formData.description.trim());
    uploadData.append('duration', videoDuration);
    uploadData.append('uploaded_by', currentUser?.id);
    uploadData.append('clinic_id', currentUser?.clinic_id);
    
    // Note: file_size is not in the schema, but we append it as requested. 
    // PocketBase will ignore it if not in schema, or we can omit it to prevent strict schema errors.
    // We will omit it to ensure the upload succeeds based on the provided schema.

    const xhr = new XMLHttpRequest();
    xhrRef.current = xhr;

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        toast.success('Video uploaded successfully');
        const response = JSON.parse(xhr.responseText);
        if (onUploadSuccess) onUploadSuccess(response);
        handleRemove();
      } else {
        try {
          const errorResponse = JSON.parse(xhr.responseText);
          toast.error(`Upload failed (${xhr.status}): ${errorResponse.message || 'Unknown error'}`);
        } catch (e) {
          toast.error('Upload failed. Please try again.');
        }
      }
      setIsUploading(false);
    });

    xhr.addEventListener('error', () => {
      toast.error('Network error occurred during upload');
      setIsUploading(false);
    });

    xhr.addEventListener('abort', () => {
      toast.info('Upload cancelled');
      setIsUploading(false);
      setUploadProgress(0);
    });

    xhr.open('POST', '/hcgi/api/videos', true);
    xhr.setRequestHeader('Authorization', `Bearer ${token?.trim()}`);
    xhr.send(uploadData);
  };

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <CardContent className="p-6">
        {!selectedFile ? (
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer ${
              dragActive ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-border bg-card hover:bg-muted/50 hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={inputRef}
              onChange={handleChange} 
              accept={allowedMimeTypes.join(',')}
              className="hidden"
            />
            
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl text-foreground mb-2">Upload Video</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              Drag and drop your video file here, or click to browse your computer.
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="px-2 py-1 bg-secondary/20 rounded-md">Formats: {acceptedFormats.join(', ').toUpperCase()}</span>
              <span className="px-2 py-1 bg-secondary/20 rounded-md">Max size: {(maxFileSize / (1024 * 1024)).toFixed(0)}MB</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                <PlayCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-semibold text-foreground truncate" title={selectedFile.name}>
                  {selectedFile.name}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{Math.floor(videoDuration / 60)}:{String(videoDuration % 60).padStart(2, '0')}</span>
                </div>
              </div>
              {!isUploading && (
                <Button variant="ghost" size="icon" onClick={handleRemove} className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="video-title">Video Title <span className="text-destructive">*</span></Label>
                <Input 
                  id="video-title"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Knee Extension Exercise"
                  disabled={isUploading}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-desc">Description (Optional)</Label>
                <Textarea 
                  id="video-desc"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Add instructions or notes about this video..."
                  disabled={isUploading}
                  className="resize-none h-24 bg-background"
                />
              </div>
            </div>

            {isUploading ? (
              <div className="space-y-3 p-4 bg-card border border-border rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-foreground">Uploading...</span>
                  <span className="text-primary">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <div className="flex justify-end pt-2">
                  <Button variant="outline" size="sm" onClick={handleCancelUpload} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    Cancel Upload
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={handleRemove}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} className="shadow-glow-primary gap-2">
                  <Upload className="w-4 h-4" />
                  Start Upload
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoUploadComponent;
