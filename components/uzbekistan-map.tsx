"use client"
import { useLanguage } from "@/components/language-provider"

interface UzbekistanMapProps {
  onRegionHover?: (regionId: string | null) => void
  activeRegion?: string | null
}

export function UzbekistanMap({ onRegionHover, activeRegion }: UzbekistanMapProps) {
  const { language } = useLanguage()

  // Define region colors
  const getRegionColor = (regionId: string) => {
    // Base color for all regions
    const baseColor = "#F5CBA7"
    // Hover/active color
    const activeColor = "#27AE60"

    return regionId === activeRegion ? activeColor : baseColor
  }

  return (
    <svg
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ background: "#4A5568" }}
    >
      {/* Karakalpakstan */}
      <path
        d="M50,50 L200,50 L200,150 L300,150 L300,250 L200,250 L200,350 L50,350 Z"
        fill={getRegionColor("karakalpakstan")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("karakalpakstan")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Khorezm */}
      <path
        d="M300,150 L350,150 L350,200 L300,200 Z"
        fill={getRegionColor("khorezm")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("khorezm")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Navoi */}
      <path
        d="M300,200 L350,200 L350,300 L400,300 L400,350 L300,350 L300,250 Z"
        fill={getRegionColor("navoi")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("navoi")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Bukhara */}
      <path
        d="M350,200 L450,200 L450,300 L400,300 L350,300 Z"
        fill={getRegionColor("bukhara")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("bukhara")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Kashkadarya */}
      <path
        d="M450,250 L500,250 L500,350 L400,350 L400,300 L450,300 Z"
        fill={getRegionColor("kashkadarya")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("kashkadarya")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Surkhandarya */}
      <path
        d="M500,250 L550,250 L550,350 L500,350 Z"
        fill={getRegionColor("surkhandarya")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("surkhandarya")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Samarkand */}
      <path
        d="M450,200 L500,200 L500,250 L450,250 Z"
        fill={getRegionColor("samarkand")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("samarkand")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Jizzakh */}
      <path
        d="M500,150 L550,150 L550,200 L500,200 Z"
        fill={getRegionColor("jizzakh")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("jizzakh")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Syrdarya */}
      <path
        d="M550,150 L600,150 L600,200 L550,200 Z"
        fill={getRegionColor("syrdarya")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("syrdarya")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Tashkent */}
      <path
        d="M600,100 L650,100 L650,150 L600,150 Z"
        fill={getRegionColor("tashkent")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("tashkent")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Tashkent City */}
      <circle
        cx="625"
        cy="125"
        r="10"
        fill={getRegionColor("tashkent_city")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("tashkent_city")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Namangan */}
      <path
        d="M650,100 L700,100 L700,150 L650,150 Z"
        fill={getRegionColor("namangan")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("namangan")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Fergana */}
      <path
        d="M700,100 L750,100 L750,150 L700,150 Z"
        fill={getRegionColor("fergana")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("fergana")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />

      {/* Andijan */}
      <path
        d="M700,150 L750,150 L750,200 L700,200 Z"
        fill={getRegionColor("andijan")}
        stroke="#1f2937"
        strokeWidth="1"
        onMouseEnter={() => onRegionHover?.("andijan")}
        onMouseLeave={() => onRegionHover?.(null)}
        className="cursor-pointer transition-colors duration-200"
      />
    </svg>
  )
}
