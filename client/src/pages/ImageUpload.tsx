import { Button } from "../components/ui/button";
import { ImagePlus, X, Upload, Trash2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface ImageUploadDemoProps {
  UploadTitle?: string;
  label?: string;
  file?: File | null;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploadDemo({
  label,
  UploadTitle,
  file,
  onClear,
  onChange,
}: ImageUploadDemoProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile && droppedFile.type.startsWith("image/") && onChange) {
        const fakeEvent = {
          target: {
            files: [droppedFile],
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(fakeEvent);
      }
    },
    [onChange],
  );

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm mx-auto">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{UploadTitle || "Image Upload"}</h3>
        <p className="text-sm text-muted-foreground">
          Supported formats: JPG, PNG, GIF
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onChange}
      />

      {!file ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5",
          )}>
          <div className="rounded-full bg-background p-3 shadow-sm">
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-xs text-muted-foreground">
              or drag and drop file here
            </p>
          </div>
        </div>
      ) : (
        <div className="relative space-y-2">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-9 w-9 p-0"
                type="button">
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={onClear}
                className="h-9 w-9 p-0"
                type="button">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {file.name && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={onClear}
                className="ml-auto rounded-full p-1 hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
