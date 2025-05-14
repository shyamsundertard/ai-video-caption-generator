'use client';

import { useState, useCallback } from 'react';
import { 
  DeviceIcon, 
  LinkIcon, 
  CameraIcon, 
  DropboxIcon, 
  FacebookIcon, 
  GoogleDriveIcon, 
  GooglePhotosIcon, 
  UploadIcon
} from './Icons';

type UploadOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const uploadOptions: UploadOption[] = [
    { id: 'device', name: 'From device', icon: <DeviceIcon strokeWidth={1/10} className="w-5 h-5" /> },
    { id: 'link', name: 'From link', icon: <LinkIcon className="w-5 h-5" /> },
    { id: 'camera', name: 'Camera', icon: <CameraIcon strokeWidth={1.5} className="w-5 h-5" /> },
    { id: 'dropbox', name: 'Dropbox', icon: <DropboxIcon strokeWidth={2} className="w-5 h-5" /> },
    { id: 'facebook', name: 'Facebook', icon: <FacebookIcon strokeWidth={1.5} className="w-5 h-5" /> },
    { id: 'google-drive', name: 'Google Drive', icon: <GoogleDriveIcon strokeWidth={1.5} className="w-5 h-5" /> },
    { id: 'google-photos', name: 'Google Photos', icon: <GooglePhotosIcon strokeWidth={0.5} className="w-4 h-4" /> },
  ];

  const handleOptionSelect = (optionId: string) => {
    console.log('Selected option:', optionId);
    setIsOpen(false);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      console.log('Dropped files:', files);
      // Upload logic here
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 underline rounded-md font-medium text-sm"
      >
        Browse Files
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl h-[558px] w-[430px] max-w-md overflow-hidden">
            <div 
              className={`px-6 py-9 border-1 border-dashed hover:bg-indigo-50 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg m-4 transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-2 gap-2">
                <div className="flex justify-center items-center w-16 h-16 bg-black/7 opacity-60 rounded-full p-3">
                  <UploadIcon className="w-4 h-4" />
                </div>
                <p className="font-medium text-black">Drop files here
                </p>
              </div>
            </div>
            
            <div className="px-4 py-2">
              <div className="flex flex-col">
                {uploadOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className="flex flex-row items-center justify-start px-5 py-2 hover:bg-indigo-50 rounded-lg transition-colors gap-4"
                  >
                    <span className="text-gray-600 mb-1">{option.icon}</span>
                    <span className="text-sm text-black text-center">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-2 px-3 flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mx-2 py-1 text-sm text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              > 
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};