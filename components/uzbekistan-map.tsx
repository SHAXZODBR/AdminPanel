"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"

// Define region data with default colors and names
const defaultRegions = {
  tashkent: {
    name: {
      uz: "Toshkent",
      "uz-cyrl": "Тошкент",
      ru: "Ташкент",
    },
    color: "#4f46e5",
    hoverColor: "#818cf8",
  },
  tashkent_city: {
    name: {
      uz: "Toshkent shahri",
      "uz-cyrl": "Тошкент шаҳри",
      ru: "город Ташкент",
    },
    color: "#7c3aed",
    hoverColor: "#a78bfa",
  },
  andijan: {
    name: {
      uz: "Andijon",
      "uz-cyrl": "Андижон",
      ru: "Андижан",
    },
    color: "#0ea5e9",
    hoverColor: "#38bdf8",
  },
  bukhara: {
    name: {
      uz: "Buxoro",
      "uz-cyrl": "Бухоро",
      ru: "Бухара",
    },
    color: "#10b981",
    hoverColor: "#34d399",
  },
  fergana: {
    name: {
      uz: "Farg'ona",
      "uz-cyrl": "Фарғона",
      ru: "Фергана",
    },
    color: "#f59e0b",
    hoverColor: "#fbbf24",
  },
  jizzakh: {
    name: {
      uz: "Jizzax",
      "uz-cyrl": "Жиззах",
      ru: "Джизак",
    },
    color: "#ef4444",
    hoverColor: "#f87171",
  },
  karakalpakstan: {
    name: {
      uz: "Qoraqalpog'iston",
      "uz-cyrl": "Қорақалпоғистон",
      ru: "Каракалпакстан",
    },
    color: "#8b5cf6",
    hoverColor: "#a78bfa",
  },
  kashkadarya: {
    name: {
      uz: "Qashqadaryo",
      "uz-cyrl": "Қашқадарё",
      ru: "Кашкадарья",
    },
    color: "#06b6d4",
    hoverColor: "#22d3ee",
  },
  khorezm: {
    name: {
      uz: "Xorazm",
      "uz-cyrl": "Хоразм",
      ru: "Хорезм",
    },
    color: "#84cc16",
    hoverColor: "#a3e635",
  },
  namangan: {
    name: {
      uz: "Namangan",
      "uz-cyrl": "Наманган",
      ru: "Наманган",
    },
    color: "#ec4899",
    hoverColor: "#f472b6",
  },
  navoi: {
    name: {
      uz: "Navoiy",
      "uz-cyrl": "Навоий",
      ru: "Навои",
    },
    color: "#14b8a6",
    hoverColor: "#2dd4bf",
  },
  samarkand: {
    name: {
      uz: "Samarqand",
      "uz-cyrl": "Самарқанд",
      ru: "Самарканд",
    },
    color: "#f97316",
    hoverColor: "#fb923c",
  },
  surkhandarya: {
    name: {
      uz: "Surxondaryo",
      "uz-cyrl": "Сурхондарё",
      ru: "Сурхандарья",
    },
    color: "#db2777",
    hoverColor: "#ec4899",
  },
  syrdarya: {
    name: {
      uz: "Sirdaryo",
      "uz-cyrl": "Сирдарё",
      ru: "Сырдарья",
    },
    color: "#d946ef",
    hoverColor: "#e879f9",
  },
}

export function UzbekistanMap() {
  const { language } = useLanguage()
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [regions, setRegions] = useState(defaultRegions)

  return (
    <div className="relative w-full">
      <div className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-md shadow-sm">
        {hoveredRegion ? (
          <span className="font-medium">
            {regions[hoveredRegion as keyof typeof regions]?.name[language as keyof typeof regions.tashkent.name] ||
              hoveredRegion}
          </span>
        ) : (
          <span className="text-gray-500">
            {language === "uz" ? "Hududni tanlang" : language === "uz-cyrl" ? "Ҳудудни танланг" : "Выберите регион"}
          </span>
        )}
      </div>

      <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Karakalpakstan */}
        <path
          d="M50,50 L200,50 L200,150 L300,150 L300,250 L200,250 L200,350 L50,350 Z"
          fill={hoveredRegion === "karakalpakstan" ? regions.karakalpakstan.hoverColor : regions.karakalpakstan.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("karakalpakstan")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Khorezm */}
        <path
          d="M300,150 L350,150 L350,200 L300,200 Z"
          fill={hoveredRegion === "khorezm" ? regions.khorezm.hoverColor : regions.khorezm.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("khorezm")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Navoi */}
        <path
          d="M300,200 L350,200 L350,300 L400,300 L400,350 L300,350 L300,250 Z"
          fill={hoveredRegion === "navoi" ? regions.navoi.hoverColor : regions.navoi.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("navoi")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Bukhara */}
        <path
          d="M350,200 L450,200 L450,300 L400,300 L350,300 Z"
          fill={hoveredRegion === "bukhara" ? regions.bukhara.hoverColor : regions.bukhara.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("bukhara")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Kashkadarya */}
        <path
          d="M450,250 L500,250 L500,350 L400,350 L400,300 L450,300 Z"
          fill={hoveredRegion === "kashkadarya" ? regions.kashkadarya.hoverColor : regions.kashkadarya.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("kashkadarya")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Surkhandarya */}
        <path
          d="M500,250 L550,250 L550,350 L500,350 Z"
          fill={hoveredRegion === "surkhandarya" ? regions.surkhandarya.hoverColor : regions.surkhandarya.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("surkhandarya")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Samarkand */}
        <path
          d="M450,200 L500,200 L500,250 L450,250 Z"
          fill={hoveredRegion === "samarkand" ? regions.samarkand.hoverColor : regions.samarkand.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("samarkand")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Jizzakh */}
        <path
          d="M500,150 L550,150 L550,200 L500,200 Z"
          fill={hoveredRegion === "jizzakh" ? regions.jizzakh.hoverColor : regions.jizzakh.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("jizzakh")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Syrdarya */}
        <path
          d="M550,150 L600,150 L600,200 L550,200 Z"
          fill={hoveredRegion === "syrdarya" ? regions.syrdarya.hoverColor : regions.syrdarya.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("syrdarya")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Tashkent */}
        <path
          d="M600,100 L650,100 L650,150 L600,150 Z"
          fill={hoveredRegion === "tashkent" ? regions.tashkent.hoverColor : regions.tashkent.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("tashkent")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Tashkent City */}
        <circle
          cx="625"
          cy="125"
          r="10"
          fill={hoveredRegion === "tashkent_city" ? regions.tashkent_city.hoverColor : regions.tashkent_city.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("tashkent_city")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Namangan */}
        <path
          d="M650,100 L700,100 L700,150 L650,150 Z"
          fill={hoveredRegion === "namangan" ? regions.namangan.hoverColor : regions.namangan.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("namangan")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Fergana */}
        <path
          d="M700,100 L750,100 L750,150 L700,150 Z"
          fill={hoveredRegion === "fergana" ? regions.fergana.hoverColor : regions.fergana.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("fergana")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />

        {/* Andijan */}
        <path
          d="M700,150 L750,150 L750,200 L700,200 Z"
          fill={hoveredRegion === "andijan" ? regions.andijan.hoverColor : regions.andijan.color}
          stroke="#1f2937"
          strokeWidth="1"
          onMouseEnter={() => setHoveredRegion("andijan")}
          onMouseLeave={() => setHoveredRegion(null)}
          className="cursor-pointer transition-colors duration-200"
        />
      </svg>
    </div>
  )
}

