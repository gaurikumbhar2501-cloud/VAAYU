import React from 'react'
import { Sparkles, Info, RefreshCw } from 'lucide-react'

export default function AQICard({ aqi = 78, lastUpdated = 'Just now' }) {
  // AQI Category helper logic
  const getAQIDetails = (val) => {
    if (val <= 50) {
      return {
        label: 'GOOD',
        color: '#69BE16',
        bgColor: '#ECFAF4',
        borderColor: '#69BE16',
        desc: 'Air quality is satisfactory and poses little or no risk.'
      }
    }
    if (val <= 100) {
      return {
        label: 'MODERATE',
        color: '#0799D8',
        bgColor: '#EEF8FD',
        borderColor: '#0799D8',
        desc: 'Air quality is acceptable for most outdoor activities.'
      }
    }
    if (val <= 150) {
      return {
        label: 'SENSITIVE',
        color: '#D97706',
        bgColor: '#FEF3C7',
        borderColor: '#D97706',
        desc: 'Sensitive groups may experience health effects.'
      }
    }
    return {
      label: 'UNHEALTHY',
      color: '#DC2626',
      bgColor: '#FEE2E2',
      borderColor: '#DC2626',
      desc: 'Everyone may begin to experience health effects.'
    }
  }

  const details = getAQIDetails(aqi)

  // Circular gauge calculation (0 to 300 scale)
  const maxAQI = 300
  const percentage = Math.min(Math.max((aqi / maxAQI) * 100, 0), 100)
  const strokeDasharray = 283 // Circumference of r=45 circle (2 * PI * 45 ≈ 282.7)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Decorative top-right accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50 via-sky-50 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Current Air Quality
          </h2>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mt-0.5">
            <RefreshCw className="w-3 h-3 text-slate-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>

        {/* Demo sensor data pill */}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-semibold text-slate-600">
          <Info className="w-3 h-3 text-slate-400" />
          <span>Demo sensor data</span>
        </div>
      </div>

      {/* Main AQI Value & Visual Gauge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-2 relative z-10">
        {/* Value & Category */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="text-[11px] font-extrabold text-[#008F72] uppercase tracking-widest mb-1">
            AIR QUALITY INDEX
          </span>
          <div className="text-6xl sm:text-7xl font-black text-[#08233F] font-display tracking-tight leading-none mb-3">
            {aqi}
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold shadow-2xs border"
            style={{
              backgroundColor: details.bgColor,
              color: details.color,
              borderColor: `${details.color}40`
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: details.color }}
            />
            <span>{details.label}</span>
          </div>
        </div>

        {/* SVG Circular Gauge Ring */}
        <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Animated Value Arc */}
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke={details.color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Gauge Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-[#08233F] font-display">
              {aqi}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              AQI
            </span>
          </div>
        </div>
      </div>

      {/* Description Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 relative z-10 flex items-center justify-between text-xs text-slate-500">
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          {details.desc}
        </p>
      </div>
    </div>
  )
}
