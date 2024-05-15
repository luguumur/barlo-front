import React, { ReactNode } from 'react'

type Props = {
  path: string
  w?: string
  h?: string
  size?: string | number | null
  className?: string
  children?: ReactNode
}

export default function Icon({
  path,
  w = 'w-[20px]',
  h = 'h-[20px]',
  size = null,
  className = '',
  children,
}: Props) {
  const iconSize = size ?? 14

  return (
    <span className={`inline-flex justify-center items-center ${w} ${h} ${className}`}>
      <svg viewBox="0 0 24 24" width={iconSize} height={iconSize} className="inline-block">
        <path fill="currentColor" d={path} />
      </svg>
      {children}
    </span>
  )
}
