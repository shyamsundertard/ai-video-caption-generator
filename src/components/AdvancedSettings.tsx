'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export const AdvancedSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontStyle: 'Poppins Extra Bold',
    textColor: 'white',
    highlightColor: 'yellow',
    outlineColor: 'black',
    fontSize: 7,
    maxCharacters: 20,
    backgroundOpacity: 0,
    outlineWidth: 2.6,
    letterSpacing: -5,
    autoTranslate: false,
  });

  const fontStyles = [
    'Poppins Bold',
    'Poppins Bold Italic',
    'Poppins Extra Bold',
    'Poppins Extra Bold Italic',
    'Poppins Black',
    'Poppins Black Italic',
    'Atkinson Bold',
    'Atkinson Bold Italic',
    'M PLUS Rounded Extra Bold',
    'Arial Bold',
    'Arial Bold Italic',
    'Tajawal Bold',
    'Tajawal Extra Bold',
    'Tajawal Black',
  ];

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
      >
        Advanced Settings
        <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Font Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {settings.fontStyle}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white">
                {fontStyles.map((style) => (
                  <DropdownMenuItem 
                    key={style} 
                    onClick={() => setSettings({...settings, fontStyle: style})}
                    className="cursor-pointer"
                  >
                    {style}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="mt-1 text-xs text-gray-500">Select the font style for your subtitles</p>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
            <input
              type="text"
              value={settings.textColor}
              onChange={(e) => setSettings({...settings, textColor: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter color (e.g., white, #ffffff)"
            />
          </div>

          {/* Highlight Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Color</label>
            <input
              type="text"
              value={settings.highlightColor}
              onChange={(e) => setSettings({...settings, highlightColor: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter color (e.g., yellow, #ffff00)"
            />
          </div>

          {/* Outline Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outline Color</label>
            <input
              type="text"
              value={settings.outlineColor}
              onChange={(e) => setSettings({...settings, outlineColor: e.target.value})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter color (e.g., black, #000000)"
            />
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
            <input
              type="number"
              min="1"
              max="10"
              step="0.1"
              value={settings.fontSize}
              onChange={(e) => setSettings({...settings, fontSize: parseFloat(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">7.0 is good for videos, 4.0 is good for reels</p>
          </div>

          {/* Maximum Characters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Characters</label>
            <input
              type="number"
              min="1"
              max="50"
              value={settings.maxCharacters}
              onChange={(e) => setSettings({...settings, maxCharacters: parseInt(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">20 is good for videos, 10 is good for reels</p>
          </div>

          {/* Background Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Opacity</label>
            <input
              type="number"
              min="0"
              max="100"
              value={settings.backgroundOpacity}
              onChange={(e) => setSettings({...settings, backgroundOpacity: parseInt(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Outline Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outline Width</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={settings.outlineWidth}
              onChange={(e) => setSettings({...settings, outlineWidth: parseFloat(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Letter Spacing</label>
            <input
              type="number"
              min="-10"
              max="10"
              value={settings.letterSpacing}
              onChange={(e) => setSettings({...settings, letterSpacing: parseInt(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Auto-Translate */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="auto-translate"
                name="auto-translate"
                type="checkbox"
                checked={settings.autoTranslate}
                onChange={(e) => setSettings({...settings, autoTranslate: e.target.checked})}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="auto-translate" className="font-medium text-gray-700">
                Auto-Translate to English
              </label>
              <p className="text-gray-500">Automatically translate subtitles to English</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};