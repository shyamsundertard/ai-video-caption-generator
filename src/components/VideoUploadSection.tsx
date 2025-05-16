'use client';

import { useEffect, useRef, useState } from 'react';
import { UploadIcon, XIcon } from './Icons';
import { UploadModal } from './UploadModal';
import { Button } from './ui/button';
import { RiFileCheckLine, RiFile3Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";

type VideoUploadSectionProps = {
  onFileUploaded: (file: File) => void;
  onClear: () => void;
};

export const VideoUploadSection = ({ onFileUploaded, onClear }: VideoUploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadStatus, setShowUploadStatus] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setShowUploadStatus(true);
      simulateUpload(selectedFile);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }
    
    uploadIntervalRef.current = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(uploadIntervalRef.current);
          setIsUploading(false);
          setTimeout(() => onFileUploaded(file), 0);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleDone = () => {
    setShowUploadStatus(false);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = '';
    // }
  };

  const handleClear = () => {
    setFile(null);
    setShowUploadStatus(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
    }
    setTimeout(() => onClear(), 0);
  };

  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) {
        clearInterval(uploadIntervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold text-black">Upload Video</h2>
      <div className='flex justify-center items-center mt-4 border rounded-md'>
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
      </div>
      </div>

      {file && !isUploading && (
        <div className='mt-4 relative border rounded-lg bg-gray-50'>
          <button
            onClick={handleClear}
            className='absolute top-2 right-2 text-white bg-red-600/80 hover:bg-red-600/75 rounded-full text-sm flex items-center cursor-pointer z-10 p-[2px]'>
            <XIcon className='w-4 h-4 m-1.5' />
          </button>
          <video
            src={URL.createObjectURL(file)}
            controls
            className='w-full rounded-md max-h-80 object-contain bg-black'
          />
        </div>
      )}

      {/* Upload status popup */}
      {showUploadStatus && file && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-opacity-50" onClick={handleDone}></div>
          <div className="relative border rounded-xl w-[430px] h-[160px] bg-white">
            <div className="flex justify-between items-center p-2 border-b">
              {isUploading ? (
                <span className="font-medium truncate text-sm">Uploading 1 file</span>
              ) : (
                <span className="font-medium truncate text-sm">1 file uploaded</span>
              )}
              <button 
                onClick={handleClear} 
                className="text-gray-500 hover:text-gray-700 p-1.5 cursor-pointer hover:bg-gray-100 hover:rounded-lg"
              >
                <XIcon strokeWidth={1} className="w-5 h-5 text-black" />
              </button>
            </div>

            <div className="flex flex-col mx-3 bg-neutral-100 rounded-lg">
              <div className='w-full p-3 flex justify-between items-center'>
                <div className='flex flex-row gap-3 items-center'>
                  {isUploading ? (
                    <RiFile3Line size="35" className='p-2 bg-gray-200 rounded-lg'/>
                  ) : (
                    <RiFileCheckLine size="35" className='p-2 bg-gray-200 rounded-lg'/>
                  )}
                  <span>{file.name}</span>
                </div>
                <button onClick={handleClear}>
                  <AiOutlineDelete size={30} className="hover:bg-gray-200 p-1 rounded-lg cursor-pointer" />
                </button>
              </div>

              {isUploading && (
                <div className="w-full h-[2px] rounded-b-xl">
                  <div 
                    className="bg-blue-600 h-[2px] rounded-b-lg" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center p-2 border-t">
              <Button
                size="sm"
                onClick={handleClear}
                variant="secondary"
                className='bg-gray-100 text-sm hover:bg-gray-200 cursor-pointer'
              >
                Clear
              </Button>
              <div>
                <Button
                  size="sm"
                  variant="secondary"
                  className='text-gray-400 font-sans bg-gray-50'
                >
                  Add more
                </Button>
                <Button
                  size="sm"
                  onClick={handleDone}
                  variant="outline"
                  className="bg-blue-700 text-white hover:bg-blue-600 hover:text-white ml-1 cursor-pointer"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};