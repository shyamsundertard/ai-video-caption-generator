'use client';

import { useState } from 'react';
import { 
  XIcon, 
  DeviceIcon, 
  LinkIcon, 
  CameraIcon, 
  DropboxIcon, 
  FacebookIcon, 
  GoogleDriveIcon, 
  GooglePhotosIcon 
} from './Icons';

type UploadOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export const UploadModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const uploadOptions: UploadOption[] = [
    { id: 'device', name: 'From device', icon: <DeviceIcon className="w-6 h-6" /> },
    { id: 'link', name: 'From link', icon: <LinkIcon className="w-6 h-6" /> },
    { id: 'camera', name: 'Camera', icon: <CameraIcon className="w-6 h-6" /> },
    { id: 'dropbox', name: 'Dropbox', icon: <DropboxIcon className="w-6 h-6" /> },
    { id: 'facebook', name: 'Facebook', icon: <FacebookIcon className="w-6 h-6" /> },
    { id: 'google-drive', name: 'Google Drive', icon: <GoogleDriveIcon className="w-6 h-6" /> },
    { id: 'google-photos', name: 'Google Photos', icon: <GooglePhotosIcon className="w-6 h-6" /> },
  ];

  const handleOptionSelect = (optionId: string) => {
    console.log('Selected option:', optionId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Browse Files
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium text-gray-900">Upload Video</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {uploadOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600 mb-2">{option.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
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