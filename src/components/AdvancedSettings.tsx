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
import { Check } from 'lucide-react';

type AdvancedSettingsProps = {
  fontStyle: string;
  onFontStyleChange: (value: string) => void;
  textColor: string,
  onTextColorChange: (value: string) => void;
  highlightColor: string,
  onHighlightColorChange: (value: string) => void;
  outlineColor: string,
  onOutlineColorChange: (value: string) => void;
  fontSize: number,
  onFontSizeChange: (value: number) => void;
  maxCharacters: number,
  onMaxCharactersChange: (value: number) => void;
  backgroundOpacity: number,
  onBackgroundOpacityChange: (value: number) => void;
  outlineWidth: number,
  onOutlineWidthChange: (value: number) => void;
  letterSpacing: number,
  onLetterSpacingChange: (value: number) => void;
  autoTranslate: boolean,
  onAutoTranslateChange: (value: boolean) => void;
}

export const AdvancedSettings = ({
  fontStyle,
  onFontStyleChange,
  textColor,
  onTextColorChange,
  highlightColor,
  onHighlightColorChange,
  outlineColor,
  onOutlineColorChange,
  fontSize,
  onFontSizeChange,
  maxCharacters,
  onMaxCharactersChange,
  backgroundOpacity,
  onBackgroundOpacityChange,
  outlineWidth,
  onOutlineWidthChange,
  letterSpacing,
  onLetterSpacingChange,
  autoTranslate,
  onAutoTranslateChange,
}: AdvancedSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center font-medium rounded-sm py-2 px-3 shadow-xs border-[1px] border-gray-200 text-sm cursor-pointer"
      >
        Advanced Settings
        <ChevronDownIcon className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[100%]' : 'max-h-0'}`}>
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Font Style */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Font Style</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between mt-1 border-[1px] border-gray-200 shadow-xs rounded-sm py-2 px-3 cursor-pointer">
                  {fontStyle}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white max-h-80 overflow-y-auto">
                {fontStyles.map((style) => (
                  <DropdownMenuItem 
                    key={style} 
                    onClick={() => onFontStyleChange(style)}
                    className="cursor-pointer"
                  >
                    {style === fontStyle ? (
                      <Check className='h-4 w-4 text-primary'/>
                    ): (
                      <div className='h-4 w-4'></div>
                    )}
                    {style}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="mt-1 pl-1 text-sm text-gray-500">Select the font style for your subtitles</p>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Text Color</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="text"
                value={textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Choose the color for your subtitles</p>
          </div>

          {/* Highlight Color */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Highlight Color</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="text"
                value={highlightColor}
                onChange={(e) => onHighlightColorChange(e.target.value)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Choose the color for highlighted text</p>
          </div>

          {/* Outline Color */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Outline Color</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="text"
                value={outlineColor}
                onChange={(e) => onOutlineColorChange(e.target.value)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Choose the color for text outline</p>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Font Size</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="number"
                min="1"
                max="20"
                step="0.1"
                value={fontSize}
                onChange={(e) => onFontSizeChange(parseFloat(e.target.value) || 1)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">7.0 is good for videos, 4.0 is good for reels</p>
          </div>

          {/* Maximum Characters */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Maximum Characters</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="number"
                min="1"
                max="50"
                value={maxCharacters}
                onChange={(e) => onMaxCharactersChange(parseFloat(e.target.value) || 1)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">20 is good for videos, 10 is good for reels</p>
          </div>

          {/* Background Opacity */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Background Opacity</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={backgroundOpacity}
                onChange={(e) => onBackgroundOpacityChange(parseFloat(e.target.value) || 0)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Adjust the opacity of subtitle background</p>
          </div>

          {/* Outline Width */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Outline Width</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={outlineWidth}
                onChange={(e) => onOutlineWidthChange(parseFloat(e.target.value) || 0)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Adjust the width of text outline</p>
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-sm font-medium text-black mb-1 pl-1">Letter Spacing</label>
            <div className="flex rounded-md border-2 border-white focus-within:border-black">
              <input
                type="number"
                min="-20"
                max="20"
                value={letterSpacing}
                onChange={(e) => onLetterSpacingChange(parseFloat(e.target.value) || 0)}
                className="m-[2px] block w-full border-[1px] border-gray-200 rounded-sm py-2 px-3 focus:outline-none font-medium sm:text-base"
              />
            </div>
            <p className="mt-1 pl-1 text-sm text-gray-500">Adjust the spacing between letters</p>
          </div>

          {/* Auto-Translate */}
          <div className="flex items-start justify-between w-full pl-1">
            <div className="text-sm">
              <label htmlFor="auto-translate" className="block font-semibold text-black">
                Auto-Translate to English
              </label>
              <p className="text-gray-500 pt-3  ">Automatically translate subtitles to English</p>
            </div>

            <div className="ml-3">
              <label htmlFor="auto-translate" className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="auto-translate"
                  className="sr-only peer"
                  checked={autoTranslate}
                  onChange={(e) => onAutoTranslateChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-all duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-all duration-100 peer-checked:translate-x-5 shadow-md"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};