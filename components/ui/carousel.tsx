'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect } from 'react'

export function Carousel({
  children,
  autoplay = true,
  interval = 5000,
  className = '',
}: {
  children: React.ReactNode
  autoplay?: boolean
  interval?: number
  className?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!autoplay || !emblaApi) return
    const id = setInterval(() => {
      emblaApi.scrollNext()
    }, interval)
    return () => clearInterval(id)
  }, [emblaApi, autoplay, interval])

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex">{children}</div>
    </div>
  )
}

export function CarouselContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function CarouselItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`min-w-full px-4 ${className}`}>{children}</div>
}