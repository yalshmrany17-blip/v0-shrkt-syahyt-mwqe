"use client"

interface JadoLogoProps {
  variant?: "icon" | "full"
  size?: "xs" | "sm" | "md" | "lg"
  color?: "navy" | "white" | "beige"
  className?: string
}

const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
}

const colors = {
  navy: "#001c43",
  white: "#ffffff",
  beige: "#cac3b0",
}

export function JadoLogo({ variant = "full", size = "md", color = "navy", className = "" }: JadoLogoProps) {
  const iconSize = sizes[size]
  const fillColor = colors[color]

  const LogoIcon = () => (
    <svg viewBox="0 0 100 100" width={iconSize} height={iconSize} fill={fillColor} className="flex-shrink-0">
      {/* Jado Logo Icon */}
      <path d="M50,35c0,2.5,2,4.5,4.5,4.5s4.5-2,4.5-4.5-2-4.5-4.5-4.5-4.5,2-4.5,4.5Z" />
      <path d="M83,28c-.05.02-.13.06-.24.11-7.4,3.46-13.86,6.31-19.5,8.63-15.23,6.26-24.4,8.7-29.57,9.15-3.71.33-5.36-.37-5.71-1.42-.1-.31-.16-.6-.16-.9-.02-.99.53-1.94,1.9-3.08,6.11-6.07,25.14-12.16,38.55-15.88,1.31-.36,2.56-.7,3.74-1.02.05-.02.1-.03.15-.04,1.98-.52,3.75-.98,5.24-1.36,3.06-.76,4.93-1.19,4.93-1.19l-1.22-7.71-2.26-14.23v-.03s-.01,0-.01,0c0,0,0,0,0,0h0s0,0,0,0c-30.65,26.7-57.12,0-57.12,0h0s0,0,0,0c0,0,0,0,0,0v16.12c5.81,6.78,16.38,9.72,22.53,10.89,1.51.39,3.1.65,4.79.72-11.62,4.7-24.43,9.14-25.32,19.04-.76,8.41,6.86,10.78,13.22,10.72h0s46.12,0,46.12,0v-28.56s-.02.01-.06.03Z" />
    </svg>
  )

  if (variant === "icon") {
    return (
      <div className={className}>
        <LogoIcon />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <span className="font-bold leading-tight" style={{ color: fillColor, fontSize: iconSize * 0.5 }}>
          جادوا
        </span>
        <span className="text-xs leading-tight" style={{ color: fillColor, opacity: 0.7, fontSize: iconSize * 0.25 }}>
          Jado Travel
        </span>
      </div>
    </div>
  )
}
