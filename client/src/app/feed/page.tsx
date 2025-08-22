'use client';

import { Feed } from '@/components/feed/feed';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function App() {
  const { logout } = useAuth();
  const [isAllSelected, setIsAllSelected] = useState(true);

  return (
    <div className='bg-neutral-900 min-h-screen font-sans'>
      <Header
        onLogout={() => logout()}
        isAllSelected={isAllSelected}
        handleIsAllSelected={setIsAllSelected}
      />
      <Feed isAllSelected={isAllSelected} />
    </div>
  );
}
