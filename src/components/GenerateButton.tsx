'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuVideo } from 'react-icons/lu';

type GenerateButtonProps = {
  disabled: boolean;
  userId: string;
  videoFile: File | null;
  settings: {
    position: string;
    fontStyle: string;
    textColor: string;
    highlightColor: string;
    outlineColor: string;
    fontSize: number;
    maxCharacters: number;
    backgroundOpacity: number;
    outlineWidth: number;
    letterSpacing: number;
    autoTranslate: boolean;
  };
};

export const GenerateButton = ({ disabled, userId, videoFile, settings }: GenerateButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // const positionToApiFormat = (positionValue: string) => {
  //   const [property, value] = positionValue.split(':').map(s => s.trim());
  //   return {
  //     property,  // 'top', 'bottom', 'left', 'right'
  //     value: parseFloat(value) / 100  // Convert percentage to decimal (5% → 0.05)
  //   };
  // };

  const handleGenerate = async () => {
    if (!videoFile) {
      setError('No video file selected');
      return;
    };
    
    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      formData.append('userId', userId);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload video');
      }

      const contentType = uploadResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await uploadResponse.text();
        throw new Error(text || 'Server returned non-JSON response');
      }

      const uploadData = await uploadResponse.json();

      // In your API route
      console.log('Processing request with:', {
        videoUrl: uploadData.url,
        settings,
        userId
      });

      // const positionData = positionToApiFormat(settings.position);

      const processResponse = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: uploadData.url,
          settings,
          userId
        })
      });

      if (!processResponse.ok) {
        const errorData = await processResponse.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to process video');
      }

      const processContentType = processResponse.headers.get('content-type');
      if (!processContentType || !processContentType.includes('application/json')) {
        const text = await processResponse.text();
        throw new Error(text || 'Server returned non-JSON response');
      }

      const processData = await processResponse.json();

      if (!processResponse.ok) {
        throw new Error(processData.message || 'Failed to process video');
      }

      // Update video document with caption settings
      // const updateResponse = await fetch('/api/videos/update', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     sourceUrl: uploadData.url,
      //     captionSettings: settings
      //   })
      // });

      // if (!updateResponse.ok) {
      //   console.warn('Failed to update video document:', await updateResponse.text());
      // }

      router.push(`/result?jobId=${processData.jobId}`);
      
    } catch (err) {
      let errorMessage = 'Failed to generate captions';
      if (err instanceof Error) {
        if (err.message.startsWith('<!DOCTYPE html>')) {
          errorMessage = 'Server error occurred. Please try again later.';
        } else {
          errorMessage = err.message;
        }
        // Add more detailed error logging
        console.error('Detailed error:', {
          message: err.message,
          stack: err.stack,
          name: err.name
        });
      }
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full mt-8 text-center">
      <button
        onClick={handleGenerate}
        disabled={disabled || isGenerating}
        className={`w-full inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
          disabled ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isGenerating ? 'opacity-75' : ''
        }`}
      >
        {isGenerating ? (
           <>
           Generating...
         </>
       ) : (
           <>
           <LuVideo/>
           <h1 className="pl-2 font-bold">
         Generate Captions
           </h1>
           </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};