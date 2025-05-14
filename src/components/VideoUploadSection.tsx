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
      <h2 className="text-lg font-bold text-black">Upload Video</h2>
      <div className='flex justify-center items-center mt-4 border rounded-xl'>
      <div className="w-full border-[2px] border-dashed border-gray-200 hover:border-black rounded-lg p-5 m-6 text-center">
        <input
          type="file"
          id="video-upload"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col sm:flex-row items-center justify-center"
        >
          <UploadIcon className="w-8 h-8 text-gray-500" />
          <div className='flex flex-col'>
          <p className="text-gray-500 font-medium text-sm">Upload files</p>
          <UploadModal />
          </div>
        </label>
        {file && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
      </div>
      </div>
    </div>
  );
};