import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
  preview?: string;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = 'image/*',
  onChange,
  error,
  helperText,
  preview,
  required = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {previewUrl ? (
        <div className="relative">
          <div className="overflow-hidden rounded-lg border-2 border-gray-200">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-48 w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
            error ? 'border-red-300' : 'border-gray-300'
          } bg-gray-50 px-6 py-10 hover:bg-gray-100 transition-colors`}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-3" />
          <p className="mb-1 text-sm text-gray-600">
            <span className="font-semibold text-purple-600">Click to upload</span> or
            drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FileUpload;