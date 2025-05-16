'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type ProcessingStatus = {
  status: 'processing' | 'completed' | 'failed';
  sourceUrl?: string;
  processedUrl?: string;
  error?: string;
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId');
  const [status, setStatus] = useState<ProcessingStatus>({ status: 'processing' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/status?jobId=${jobId}`);
        const data = await response.json();
        
        if (data.status === 'completed' || data.status === 'failed') {
          setStatus(data);
          setLoading(false);
          return;
        }

        setTimeout(checkStatus, 5000);
      } catch {
        setStatus({
          status: 'failed',
          error: 'Failed to check status'
        });
        setLoading(false);
      }
    };

    checkStatus();
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6">Video Processing Status</h1>
        
        {loading ? (
          <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p>Processing your video...</p>
          </div>
        ) : status.status === 'completed' ? (
          <div className="space-y-6">
            <div className="bg-green-50 text-green-800 p-4 rounded-md">
              <h2 className="font-medium">Processing Complete!</h2>
              <p>Your captioned video is ready.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Original Video</h3>
                <video 
                  src={status.sourceUrl} 
                  controls 
                  className="w-full rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-medium mb-2">Captioned Video</h3>
                <video 
                  src={status.processedUrl} 
                  controls 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            
            <a
              href={status.processedUrl}
              download="captioned-video.mp4"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Download Captioned Video
            </a>
          </div>
        ) : (
          <div className="bg-red-50 text-red-800 p-4 rounded-md">
            <h2 className="font-medium">Processing Failed</h2>
            <p>{status.error || 'An unknown error occurred'}</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}