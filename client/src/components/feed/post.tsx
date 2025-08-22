"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/hooks/usePosts";

interface PostProps {
  post: Post;
  onLike: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onDelete: (id: string) => void;
  isUserPost: boolean;
}

export function PostComponent({
  post,
  onLike,
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

  const handleCancel = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  return (
    <Card className="border-b border-neutral-700 p-4 bg-neutral-800">
      <CardContent className="p-0">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-bold text-sky-400">@{post.userId}</span>
          <span className="text-neutral-500 text-xs">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        {isEditing ? (
          <textarea
            className="w-full p-2 mb-4 bg-neutral-700 text-white rounded resize-none"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
          />
        ) : (
          <p className="text-white mb-4">{post.content}</p>
        )}

        <div className="flex items-center justify-between text-neutral-500 text-sm">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              className="hover:text-red-500 transition-colors p-0 h-auto"
              onClick={() => onLike(post.id)}
            >
              Like ({post.likesCount})
            </Button>

            {isUserPost && (
              <>
                {isEditing ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleSave}
                      className="hover:text-green-500 transition-colors p-0 h-auto"
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      className="hover:text-gray-400 transition-colors p-0 h-auto"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditing(true)}
                      className="hover:text-yellow-500 transition-colors p-0 h-auto"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => onDelete(post.id)}
                      className="hover:text-red-500 transition-colors p-0 h-auto"
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
