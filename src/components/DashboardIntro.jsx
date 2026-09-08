import React from 'react'
import { Activity } from 'lucide-react'

export default function DashboardIntro() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 pt-2 border-b border-emerald-900/5 mb-6">
      {/* Left: Compact Dashboard Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#08233F] tracking-tight">
          Air Quality Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
          Real-time monitoring of the air entering and leaving VAAYU.
        </p>
      </div>

      {/* Right: Live Data Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-xs font-extrabold text-[#008F72] shadow-xs self-start sm:self-auto">
        <span className="h-2 w-2 rounded-full bg-[#008F72] animate-pulse" />
        <span>LIVE DATA</span>
      </div>
    </div>
  )
}
