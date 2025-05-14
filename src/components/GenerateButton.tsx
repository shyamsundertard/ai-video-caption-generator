'use client';
import { LuVideo } from "react-icons/lu";

import { useState } from 'react';

type GenerateButtonProps = {
    disabled?: boolean;
};

export const GenerateButton = ({ disabled = false }: GenerateButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    //Generation logic
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="mt-8 text-center w-full">
      <button
        onClick={handleGenerate}
        disabled={disabled || isGenerating}
        className={`w-full inline-flex items-center justify-center px-[10px] py-[6px] border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
            disabled ? 'bg-violet-300 cursor-not-allowed' :
     'bg-[rgba(79,70,229,0.9)] hover:bg-[#4f46e5]' } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isGenerating ? 'opacity-75 cursor-not-allowed' : ''
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
    </div>
  );
};