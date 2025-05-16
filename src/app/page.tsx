'use client';

import { useState } from "react";
import { AdvancedSettings } from "@/components/AdvancedSettings";
import { CaptionSettings } from "@/components/CaptionSettings";
import { GenerateButton } from "@/components/GenerateButton";
import { VideoUploadSection } from "@/components/VideoUploadSection";

export default function Home() {
  const [hasVideo, setHasVideo] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [position, setPosition] = useState<string>('Bottom (75%)');

  const [fontStyle, setFontStyle] = useState('Poppins Extra Bold');
  const [textColor, setTextColor] = useState('white');
  const [highlightColor, setHighlightColor] = useState('yellow');
  const [outlineColor, setOutlineColor] = useState('black');
  const [fontSize, setFontSize] = useState(7);
  const [maxCharacters, setMaxCharacters] = useState(20);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [outlineWidth, setOutlineWidth] = useState(2.6);
  const [letterSpacing, setLetterSpacing] = useState(-5);
  const [autoTranslate, setAutoTranslate] = useState(false);


  const captionSettings = {
    position,
    fontStyle,
    textColor,
    highlightColor,
    outlineColor,
    fontSize,
    maxCharacters,
    backgroundOpacity,
    outlineWidth,
    letterSpacing,
    autoTranslate
  };

  const handleFileUploaded = (file: File) => {
    setVideoFile(file);
    setHasVideo(true);
  };

  const handleClearFile = () => {
    setVideoFile(null);
    setHasVideo(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10 px-8 sm:px-10 lg:px-12">
      <div className="w-full mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">
            AI Video Caption Generator
          </h1>
          <p className="mt-3 text-xl text-gray-500 font-medium">
            Add professional captions to your video using AI
          </p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="bg-white shadow rounded-lg border py-4 px-10 pb-11">
          {/* Components */}
          <VideoUploadSection onFileUploaded={handleFileUploaded}
          onClear={handleClearFile}
          />
          <CaptionSettings onPositionChange={(position) => setPosition(position)}/>
          <AdvancedSettings
          fontStyle={fontStyle}
          onFontStyleChange={setFontStyle}
          textColor={textColor}
          onTextColorChange={setTextColor}
          highlightColor={highlightColor}
          onHighlightColorChange={setHighlightColor}
          outlineColor={outlineColor}
          onOutlineColorChange={setOutlineColor}
          fontSize={fontSize}
          onFontSizeChange={setFontSize}
          maxCharacters={maxCharacters}
          onMaxCharactersChange={setMaxCharacters}
          backgroundOpacity={backgroundOpacity}
          onBackgroundOpacityChange={setBackgroundOpacity}
          outlineWidth={outlineWidth}
          onOutlineWidthChange={setOutlineWidth}
          letterSpacing={letterSpacing}
          onLetterSpacingChange={setLetterSpacing}
          autoTranslate={autoTranslate}
          onAutoTranslateChange={setAutoTranslate}
          />
          <GenerateButton 
          disabled={!hasVideo} 
          userId="1" 
          videoFile={videoFile} 
          settings={captionSettings} />
        </div>
        
        <div className="flex flex-col p-4 justify-start items-center bg-white shadow rounded-lg border min-h-[474px] w-full max-w-[642px]">
          <div className="flex justify-center items-center flex-col w-[438px] h-[400px]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-wand-sparkles w-16 h-16 text-muted-foreground/30" 
              aria-hidden="true"
            >
              <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"></path>
              <path d="m14 7 3 3"></path>
              <path d="M5 6v4"></path>
              <path d="M19 14v4"></path>
              <path d="M10 2v2"></path>
              <path d="M7 8H3"></path>
              <path d="M21 16h-4"></path>
              <path d="M11 3H9"></path>
            </svg>
            <h1 className="text-lg font-medium pt-4">Ready to Create Your Video</h1>
            <h2 className="text-gray-500 text-sm font-medium pt-1">Enter details of the video you want to create</h2>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}