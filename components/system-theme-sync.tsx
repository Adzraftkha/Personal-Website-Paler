'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

export function SystemThemeSync() {
  const { setTheme } = useTheme()
  const hasRun = useRef(false)

  useEffect(() => {
    // ⛔ cegah jalan ulang
    if (hasRun.current) return
    hasRun.current = true

    const source = localStorage.getItem('theme-source')

    // ✅ hanya set system kalau BELUM pernah di-override user
    if (source !== 'user') {
      setTheme('system')
      // ❌ jangan overwrite ke "system" terus
    }
  }, [setTheme])

  return null
}