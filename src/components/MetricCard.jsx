import React from 'react'

export default function MetricCard({
  icon: Icon,
  name,
  sensorTitle,
  hardwareName,
  measurementLabel,
  value,
  unit,
  status,
  statusType = 'normal', // 'normal' | 'moderate' | 'good'
  accentColor = '#008F72',
  accentBg = '#ECFAF4'
}) {
  // Status badge styling logic
  const getStatusBadge = () => {
    if (statusType === 'moderate') {
      return {
        bg: '#EEF8FD',
        text: '#0799D8',
        border: '#0799D8/30'
      }
    }
    if (statusType === 'good') {
      return {
        bg: '#ECFAF4',
        text: '#008F72',
        border: '#008F72/30'
      }
    }
    return {
      bg: '#F1F5F9',
      text: '#475569',
      border: '#CBD5E1'
    }
  }

  const badgeStyle = getStatusBadge()

  return (
    <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-5 flex flex-col justify-between transition-all hover:shadow-md hover:border-emerald-900/20 group">
      {/* Icon & Status Row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
          style={{ backgroundColor: accentBg, color: accentColor }}
        >
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        <span
          className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border tracking-wider"
          style={{
            backgroundColor: badgeStyle.bg,
            color: badgeStyle.text,
            borderColor: badgeStyle.border
          }}
        >
          {status}
        </span>
      </div>

      {/* Parameter Hierarchy & Large Value */}
      <div>
        {sensorTitle ? (
          <div className="mb-2">
            <h3 className="text-xs font-black text-[#08233F] uppercase tracking-wider">
              {sensorTitle}
            </h3>
            {hardwareName && (
              <div className="text-[11px] font-semibold text-slate-500">
                {hardwareName}
              </div>
            )}
            {measurementLabel && (
              <div className="text-xs font-extrabold text-[#008F72] mt-1.5 uppercase tracking-wider">
                {measurementLabel}
              </div>
            )}
          </div>
        ) : (
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            {name}
          </h3>
        )}

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black text-[#08233F] font-display">
            {value}
          </span>
          <span className="text-xs font-bold text-slate-400">
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}
