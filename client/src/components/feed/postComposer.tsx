'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

const MAX_CHARS = 280;

interface IPostComposerProps {
  onPost: (content: string) => void;
  isLoading: boolean;
}

export function PostComposer({
  onPost,
  isLoading = false,
}: IPostComposerProps) {
  const [content, setContent] = useState('');

  const remainingChars = MAX_CHARS - content.length;

  useEffect(() => {
    if (!isLoading) setContent('');
  }, [isLoading]);

  return (
    <div className='fixed top-28 left-0 right-0 flex justify-center z-50 transition-all duration-300'>
      <div className='w-full max-w-xl px-4'>
        <Card className='rounded-2xl bg-zinc-900 p-4 shadow-xl border border-zinc-800'>
          <div className='space-y-2'>
            <Textarea
              className='w-full bg-zinc-900 text-white placeholder:text-zinc-500 focus:ring-1 focus:ring-blue-500 focus:outline-none resize-none'
              placeholder='What is happening?!'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />

            <div className='flex justify-between items-center'>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  remainingChars < 0 ? 'text-red-500' : 'text-zinc-400'
                }`}
              >
                {remainingChars} characters left
              </span>

              <Button
                onClick={() => onPost(content)}
                disabled={!content.length || isLoading || remainingChars < 0}
                className='bg-blue-600 hover:bg-blue-700 transition-colors duration-300 cursor-pointer'
              >
                {isLoading ? 'Loading...' : 'Post'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
