'use client';

import { useState } from 'react';

export const CaptionSettings = () => {
  const [position, setPosition] = useState(75);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">Subtitles Position</h2>
      <div className="mt-4 flex items-center">
        <span className="text-sm text-gray-500 w-24">Bottom ({position}%)</span>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Choose where to position the subtitles in the video
      </p>
    </div>
  );
};