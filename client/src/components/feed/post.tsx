'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IPost } from '@/api/posts';

interface PostProps {
  post: IPost;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  isUserPost: boolean;
}

export function PostComponent({
  post,
  onLike,
  onDislike,
  onEdit,
  onDelete,
  isUserPost,
}: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSave = () => {
    onEdit(post.id, editedContent);
    setIsEditing(false);
  };

  return (
    <Card className='border-b border-neutral-700 p-4 bg-neutral-800'>
      <CardContent className='p-0'>
        <div className='flex items-center justify-between space-x-2 mb-2'>
          <span className='font-bold text-sky-400'>@{post.username}</span>
          <span className='text-neutral-500 text-xs'>
            {new Date(post.created_at).toLocaleString()}
          </span>
        </div>

        {isEditing ? (
          <textarea
            className='w-full p-2 mb-4 bg-neutral-700 text-white rounded resize-none'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
          />
        ) : (
          <p className='text-white mb-4'>{post.content}</p>
        )}

        <div className='flex items-center justify-between text-neutral-500 text-sm'>
          <div className='flex space-x-4'>
            {!isEditing && (
              <Button
                variant='ghost'
                className={`${
                  post.liked_by_current_user && 'text-pink-500'
                } hover:text-pink-500 transition-colors p-0 h-auto px-3 cursor-pointer`}
                onClick={() =>
                  post.liked_by_current_user
                    ? onDislike(post.like_by_current_user!)
                    : onLike(post.id)
                }
              >
                Like ({post.likes_count})
              </Button>
            )}

            {isUserPost && (
              <>
                {isEditing ? (
                  <>
                    <Button
                      variant='ghost'
                      onClick={handleSave}
                      className='hover:text-green-500 transition-colors p-0 h-auto px-3 cursor-pointer'
                    >
                      Save
                    </Button>
                    <Button
                      variant='ghost'
                      onClick={() => setIsEditing(false)}
                      className='hover:text-gray-400 transition-colors p-0 h-auto px-3 cursor-pointer'
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant='ghost'
                      onClick={() => setIsEditing(true)}
                      className='hover:text-yellow-500 transition-colors p-0 h-auto px-3 cursor-pointer'
                    >
                      Edit
                    </Button>
                    <Button
                      variant='ghost'
                      onClick={() => onDelete(post.id)}
                      className='hover:text-red-500 transition-colors p-0 h-auto px-3 cursor-pointer'
                    >
                      Delete
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
