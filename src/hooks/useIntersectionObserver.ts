// src/hooks/useIntersectionObserver.ts

import { useEffect, useState, RefObject } from 'react'

const useIntersectionObserver = (targetRef: RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState<boolean>(true)

  useEffect(() => {
    if (!targetRef.current) return // Kiểm tra nếu `ref.current` là null

    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    )

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [targetRef])

  return isIntersecting
}

export default useIntersectionObserver
