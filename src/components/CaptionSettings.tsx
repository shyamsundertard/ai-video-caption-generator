'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const CaptionSettings = () => {
  const [position, setPosition] = useState('Bottom (75%)');

  const positionOptions = [
    'Top',
    'Center',
    'Bottom (75%)',
    'Bottom',
    'Left',
    'Right'
  ];

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900">Subtitles Position</h2>
      <div className="mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {position}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white">
            {positionOptions.map((option) => (
              <DropdownMenuItem 
                key={option} 
                onClick={() => setPosition(option)}
                className="cursor-pointer"
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Choose where to position the subtitles in the video
      </p>
    </div>
  );
};