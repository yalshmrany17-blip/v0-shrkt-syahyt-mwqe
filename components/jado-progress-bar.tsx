"use client"

import type React from "react"
import { BookingStage } from "@/lib/jado-types"

interface ProgressBarProps {
  currentStage: BookingStage
}

const JadoProgressBar: React.FC<ProgressBarProps> = ({ currentStage }) => {
  const stages = [
    { id: BookingStage.Discovery, label: "التعرف", icon: "👋" },
    { id: BookingStage.Diagnosis, label: "التشخيص", icon: "🧠" },
    { id: BookingStage.Planning, label: "الخدمات", icon: "🛠️" },
    { id: BookingStage.Invoicing, label: "الفاتورة", icon: "🧾" },
  ]

  const getCurrentIndex = () => {
    return stages.findIndex((s) => s.id === currentStage)
  }

  const currentIndex = getCurrentIndex()

  return (
    <div className="w-full px-4 mb-4">
      <div className="relative flex items-center justify-between w-full max-w-lg mx-auto">
        {/* Connection Line Background */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>

        {/* Active Line Progress */}
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 bg-[#001c43] -z-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        ></div>

        {stages.map((stage, index) => {
          const isActive = index <= currentIndex

          return (
            <div key={stage.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${
                  isActive
                    ? "bg-[#001c43] border-[#001c43] text-white scale-110 shadow-lg"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                <span className="text-sm">{stage.icon}</span>
              </div>
              <span
                className={`text-[10px] font-bold transition-colors duration-300 ${isActive ? "text-[#001c43]" : "text-gray-400"}`}
              >
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JadoProgressBar
