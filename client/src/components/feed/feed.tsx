import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { PostComponent } from './post';
import { PostComposer } from './postComposer';
import { useAuth } from '@/hooks/useAuth';
import {
  getAllPosts,
  getPostsByAuthorId,
  create,
  deletePost,
  editPost,
  IPost,
} from '@/api/posts';
import { createLike, deleteLike } from '@/api/likes';

interface IFeedProps {
  isAllSelected: boolean;
}

export function Feed({ isAllSelected }: IFeedProps) {
  const { currentUser } = useAuth();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = currentUser();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isAllSelected, searchQuery]);

  const fetchPosts = async () => {
    setIsLoading(true);

    const posts = isAllSelected
      ? await getAllPosts(page, searchQuery)
      : await getPostsByAuthorId(user?.sub as string, page);

    setIsLoading(false);
    if (posts) setPosts(posts);
  };

  const createPost = async (content: string) => {
    setIsLoading(true);
    const created = await create(content);

    setPosts([
      {
        ...created,
        like_by_current_user: false,
        likes_count: 0,
        username: user?.username,
      },
      ...posts,
    ]);
    setIsLoading(false);
  };

  const handleLike = async (postId: string) => {
    const liked = posts.map((post) => {
      if (post.id === postId) {
        post.liked_by_current_user = true;
        post.likes_count++;
      }
      return post;
    });
    setPosts(liked);

    const created = await createLike(postId);

    const updated = posts.map((post) => {
      if (post.id === postId) post.like_by_current_user = created.id;
      return post;
    });
    setPosts(updated);
  };

  const handleDislike = async (like_id: string) => {
    const updated = posts.map((post) => {
      if (post.like_by_current_user === like_id) {
        post.liked_by_current_user = false;
        post.like_by_current_user = null;
        post.likes_count--;
      }
      return post;
    });
    setPosts(updated);

    await deleteLike(like_id);
  };

  const handleEdit = async (postId: string, newContent: string) => {
    editPost(postId, newContent);

    posts.forEach((post) => {
      if (post.id === postId) post.content = newContent;
    });
  };

  const handleDelete = async (postId: string) => {
    deletePost(postId);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className='max-w-xl mx-auto p-4 pt-28'>
      <div className='fixed top-20 left-0 right-0 flex justify-center z-50'>
        <div className='w-full max-w-xl px-4'>
          <PostComposer onPost={createPost} isLoading={isLoading} />
        </div>
      </div>

      <div className='mb-4 mt-25'>
        <Input
          className='text-white'
          type='text'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='mt-4 space-y-4'>
        {posts.map((post) => (
          <PostComponent
            key={post.id}
            post={post}
            onLike={handleLike}
            onDislike={handleDislike}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isUserPost={post.author_id === user?.sub}
          />
        ))}
        {posts.length === 0 && (
          <p className='text-center text-neutral-500 mt-8'>
            {isLoading ? 'Loading posts...' : 'No posts found.'}
          </p>
        )}
      </div>

      <div className='mt-8 flex justify-center gap-4'>
        <button
          className={`px-4 py-2 rounded-full bg-zinc-800 text-white text-xl disabled:opacity-50 disabled:cursor-default cursor-pointer ${
            page === 1 ? '' : 'hover:text-sky-400'
          }`}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          &#8592;
        </button>

        <button
          className='px-4 py-2 rounded-full bg-zinc-800 text-white text-xl disabled:opacity-50 disabled:cursor-default cursor-pointer hover:text-sky-400'
          onClick={() => setPage(page + 1)}
          disabled={posts.length === 0}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
