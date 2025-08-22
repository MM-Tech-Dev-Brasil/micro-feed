'use client';

import { Feed } from '@/components/feed/feed';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { useEffect, useState } from 'react';
import { Post } from '@/hooks/usePosts';

export default function App() {
  const { logout, currentUser } = useAuth();
  const { getPosts } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterAll, setFilterAll] = useState(true);
  const handleLogout = () => logout();
  const user = currentUser()
const handleFilterToggle = (isAll: boolean) => {
  setFilterAll(isAll); 
  console.log(`Toggling filter to ${isAll ? 'all' : 'mine'}`);
  console.log('teste', filterAll)
};

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getPosts();
      if (posts) {
        setPosts(posts);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className='bg-neutral-900 min-h-screen font-sans'>
      <Header onLogout={handleLogout} onToggleFilter={handleFilterToggle} />
      <Feed posts={posts} />
    </div>
  );
}
