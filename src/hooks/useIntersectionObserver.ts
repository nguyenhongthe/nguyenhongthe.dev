// src/hooks/useIntersectionObserver.ts

import React, { useEffect, useState } from 'react'

const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(true)

  useEffect(() => {
    if (!targetRef.current) return

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [targetRef])

  return isIntersecting
}

export default useIntersectionObserver
