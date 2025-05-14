'use client';

import { useState } from 'react';
import { UploadIcon } from './Icons';
import { UploadModal } from './UploadModal';

type VideoUploadSectionProps = {
  onFileChange: (file: File | null ) => void;
};

export const VideoUploadSection = ({ onFileChange }: VideoUploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileChange(selectedFile);
    } else {
      setFile(null);
      onFileChange(null);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Upload Video</h2>
      <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Upload files</p>
          <UploadModal />
        </label>
        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
      </div>
    </div>
  );
};