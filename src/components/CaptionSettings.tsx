'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';

type CaptionSettingsProps = {
  onPositionChange : (position: string) => void;
}

export const CaptionSettings = ({ onPositionChange }: CaptionSettingsProps) => {
  
  const positionOptions = [
    { label: 'Top', value: 'top: 10%' },
    { label: 'Center', value: 'top: 45%' },
    { label: 'Bottom (75%)', value: 'top: 75%' },
    { label: 'Bottom', value: 'bottom: 5%' },
    { label: 'Left', value: 'left: 5%' },
    { label: 'Right', value: 'right: 5%' },
  ];
  
  const [position, setPosition] = useState(positionOptions[2]);

  return (
    <div className="mt-6">
      <h2 className="font-medium text-sm text-black pl-1">Subtitles Position</h2>
      <div className="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between mt-1 border-[1px] border-gray-200 shadow-xs rounded-sm py-2 px-3 cursor-pointer">
              {position.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white">
            {positionOptions.map((option) => (
              <DropdownMenuItem 
                key={option.label} 
                onClick={() => {
                  setPosition(option)
                  onPositionChange(option.value)
                }}
                className="cursor-pointer"
              > {option.label === position.label ? (
                <Check className='h-4 w-4 text-primary'/>
              ): (
                <div className='h-4 w-4'></div>
              )}
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-2 pl-1 text-sm text-gray-500">
        Choose where to position the subtitles in the video
      </p>
    </div>
  );
};