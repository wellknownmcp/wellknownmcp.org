'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useTrackPageView() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] ?? 'en'

  useEffect(() => {
    fetch('/api/log-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, lang })
    }).catch(() => {})
  }, [pathname])
}
