"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  Trash2,
  Upload,
} from "lucide-react";

interface ImageUploaderProps {
  maxImages?: number;
  onChange: (files: File[]) => void;
}

export default function ImageUploader({
  maxImages = 3,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    setError("");

    if (!selectedFiles.length) {
      return;
    }

    if (files.length + selectedFiles.length > maxImages) {
      setError(
        `You can upload maximum ${maxImages} photos.`
      );
      return;
    }

    const invalidFile = selectedFiles.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (invalidFile) {
      setError(
        "Each image must be smaller than 5MB."
      );
      return;
    }

    const updatedFiles = [
      ...files,
      ...selectedFiles,
    ];

    setFiles(updatedFiles);
    onChange(updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter(
      (_, fileIndex) => fileIndex !== index
    );

    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-200">
            Poster Photos
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload up to {maxImages} photos. Maximum 5MB each.
          </p>
        </div>

        <span className="badge badge-muted">
          {files.length}/{maxImages}
        </span>
      </div>

      {/* Upload button */}
      {files.length < maxImages && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-4 py-6 text-center transition hover:border-emerald-500/50 hover:bg-emerald-500/5"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Upload className="h-5 w-5" />
          </div>

          <p className="text-sm font-semibold">
            Click to upload photos
          </p>

          <p className="mt-1 text-xs text-slate-500">
            PNG, JPG or WEBP
          </p>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      {/* Preview */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute right-2 top-2 rounded-lg bg-black/70 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-500"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="truncate text-[10px] text-white">
                  Photo {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
    </div>
  );
}