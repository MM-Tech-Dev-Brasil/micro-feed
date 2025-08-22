'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HeaderProps {
  onLogout: () => void;
  isAllSelected: boolean;
  handleIsAllSelected: (isAll: boolean) => void;
}

export function Header({
  onLogout,
  isAllSelected = true,
  handleIsAllSelected,
}: HeaderProps) {
  return (
    <div className='bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-10 flex justify-between items-center shadow-lg'>
      <div className='flex space-x-2 sm:space-x-4'>
        <Button
          variant={isAllSelected ? 'default' : 'ghost'}
          className={`
            transition-all duration-300 ease-in-out cursor-pointer 
            ${
              isAllSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'text-zinc-400 hover:text-blue-500 hover:bg-zinc-800'
            }
          `}
          onClick={() => handleIsAllSelected(true)}
        >
          All Posts
        </Button>

        <Button
          variant={!isAllSelected ? 'default' : 'ghost'}
          className={`
            transition-all duration-300 ease-in-out  cursor-pointer
            ${
              !isAllSelected
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'text-zinc-400 hover:text-blue-500 hover:bg-zinc-800'
            }
          `}
          onClick={() => handleIsAllSelected(false)}
        >
          My Posts
        </Button>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={onLogout}
              className='cursor-pointer text-zinc-400 hover:text-red-500 hover:bg-zinc-800 transition-colors duration-300'
            >
              <LogOut className='w-5 h-5' />
            </Button>
          </TooltipTrigger>

          <TooltipContent className='bg-zinc-700 text-white border-none'>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
