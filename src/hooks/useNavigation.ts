// src/hooks/useNavigation.ts

'use client'

import { useEffect, useRef, useState } from 'react'
import useIntersectionObserver from '@/src/hooks/useIntersectionObserver'
import { getMenuList } from '@/src/apis/common_api'
import type { MenuProps } from '@/src/types/common'

export const useNavigation = () => {
  const ref = useRef<HTMLElement>(null)
  // @ts-ignore
  const isIntersecting = useIntersectionObserver(ref)
  const [navigation, setNavigation] = useState<MenuProps[]>([])

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuList = await getMenuList()
        setNavigation(menuList)
      } catch (error) {
        console.error('Error fetching menu list:', error)
        setNavigation([])
      }
    }
    fetchMenu().then(r => r)
  }, [])

  return { ref, isIntersecting, navigation }
}
