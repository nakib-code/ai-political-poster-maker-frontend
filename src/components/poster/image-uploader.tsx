"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import {
  ImagePlus,
  Trash2,
  Upload,
} from "lucide-react";

interface ImageUploaderProps {
  maxImages?: number;
  onChange: (files: File[]) => void;
}

interface PreviewFile {
  file: File;
  url: string;
}

export default function ImageUploader({
  maxImages = 3,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<PreviewFile[]>([]);
  const [error, setError] = useState("");

  const handleFiles = (
    event: ChangeEvent<HTMLInputElement>
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
        `You can upload a maximum of ${maxImages} photo${
          maxImages === 1 ? "" : "s"
        }.`
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

    const newPreviews = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedFiles = [
      ...files,
      ...selectedFiles,
    ];

    setFiles(updatedFiles);
    setPreviews((current) => [
      ...current,
      ...newPreviews,
    ]);

    onChange(updatedFiles);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const previewToRemove = previews[index];

    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove.url);
    }

    const updatedFiles = files.filter(
      (_, fileIndex) => fileIndex !== index
    );

    const updatedPreviews = previews.filter(
      (_, previewIndex) => previewIndex !== index
    );

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);

    onChange(updatedFiles);
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-200">
            Poster Photos
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload up to {maxImages} photo
            {maxImages === 1 ? "" : "s"}. Maximum 5MB each.
          </p>
        </div>

        <span className="badge badge-muted shrink-0">
          {files.length}/{maxImages}
        </span>
      </div>

      {/* Upload Area */}
      {files.length < maxImages && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/50 px-4 py-6 text-center transition hover:border-emerald-500/50 hover:bg-emerald-500/5"
        >
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Upload className="h-5 w-5" />
          </div>

          <p className="text-sm font-semibold text-slate-200">
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
      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <div
              key={`${preview.file.name}-${preview.file.lastModified}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900"
            >
              <img
                src={preview.url}
                alt={preview.file.name}
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeFile(index)}
                aria-label={`Remove photo ${index + 1}`}
                title="Remove"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white opacity-100 transition hover:bg-red-500 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1.5">
                <p className="truncate text-[10px] font-medium text-white">
                  Photo {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
          <ImagePlus className="h-4 w-4" />
          No photos selected
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
    </div>
  );
}