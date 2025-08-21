"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PostProps {
  post: any;
  onLike: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isUserPost: boolean;
}

export function Post({ post, onLike, onEdit, onDelete, isUserPost }: PostProps) {
  return (
    <Card className="border-b border-neutral-700 p-4 bg-neutral-800">
      <CardContent className="p-0">
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-bold text-sky-400">@{post.username}</span>
          <span className="text-neutral-500 text-xs">{post.timestamp}</span>
        </div>
        <p className="text-white mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-neutral-500 text-sm">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              className="hover:text-red-500 transition-colors p-0 h-auto"
              onClick={() => onLike(post.id)}
            >
              Like ({post.likes})
            </Button>
            {isUserPost && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onEdit(post.id)}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
