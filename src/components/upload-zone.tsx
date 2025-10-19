'use client';

import { useState, useCallback } from 'react';
import { Upload, X, FileVideo, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function UploadZone({
  onFilesChange,
  maxFiles = 10,
  accept = 'image/*,video/*',
  className,
}: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const fileArray = Array.from(newFiles).slice(0, maxFiles - files.length);
      
      // Validate files
      const validFiles: File[] = [];
      const errors: string[] = [];
      
      fileArray.forEach((file) => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          errors.push(`${file.name} is too large (max 10MB)`);
          return;
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
        if (!allowedTypes.includes(file.type)) {
          errors.push(`${file.name} has unsupported file type`);
          return;
        }
        
        validFiles.push(file);
      });
      
      if (errors.length > 0) {
        console.warn('File validation errors:', errors);
        // You could show these errors to the user
      }
      
      if (validFiles.length === 0) return;
      
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);

      // Generate previews
      validFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setPreviews((prev) => ({
              ...prev,
              [file.name]: e.target?.result as string,
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [files, maxFiles, onFilesChange]
  );

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
    
    const removedFile = files[index];
    setPreviews((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[removedFile.name];
      return newPreviews;
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <div className={cn('space-y-4', className)}>
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        )}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={accept}
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          disabled={files.length >= maxFiles}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
          <p className="text-sm font-medium mb-1">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            Images and videos ({files.length}/{maxFiles})
          </p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group rounded-xl overflow-hidden border bg-card"
            >
              {file.type.startsWith('image/') && previews[file.name] ? (
                <img
                  src={previews[file.name]}
                  alt={file.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 flex items-center justify-center bg-muted">
                  <FileVideo className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
              <div className="p-2 bg-background/95 backdrop-blur">
                <p className="text-xs truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

