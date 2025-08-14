"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!hasError ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          } object-cover w-full h-full`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true)
            setIsLoading(false)
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Image unavailable</span>
        </div>
      )}

      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </div>
  )
}
