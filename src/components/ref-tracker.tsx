'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RefTracker() {
    const searchParams = useSearchParams();

  useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
                document.cookie = `gammacap_ref=${ref};path=/;max-age=2592000;SameSite=Lax`;
        }
  }, [searchParams]);

  return null;
}
