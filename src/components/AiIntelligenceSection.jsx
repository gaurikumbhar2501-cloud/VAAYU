import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { Sparkles, TrendingUp, ShieldCheck, ArrowRight, Info, AlertTriangle } from 'lucide-react'

export default function AiIntelligenceSection() {
  // Simulated 6-hour forecast data
  const forecastData = [
    { time: 'Now', aqi: 78 },
    { time: '+1h', aqi: 81 },
    { time: '+2h', aqi: 86 },
    { time: '+3h', aqi: 92 },
    { time: '+4h', aqi: 88 },
    { time: '+5h', aqi: 82 }
  ]

  // Filter health breakdown data
  const filterList = [
    { name: 'Pre-Filter', health: 91, status: 'Healthy', color: '#008F72' },
    { name: 'Fine Filter', health: 86, status: 'Healthy', color: '#008F72' },
    { name: 'Activated Carbon', health: 82, status: 'Healthy', color: '#69BE16' },
    { name: 'H13 HEPA', health: 89, status: 'Healthy', color: '#008F72' }
  ]

  return (
    <section id="ai" className="pt-6 sm:pt-8 pb-16 sm:pb-20 bg-gradient-to-b from-transparent via-[#ECFAF4]/40 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. SECTION INTRO / HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#008F72]" />
            <span>AI-POWERED INSIGHT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233F] tracking-tight mb-3 font-display">
            Predict. Prepare. Purify.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-4">
            VAAYU transforms real-time air-quality data into predictive insights for smarter purification and maintenance.
          </p>

          {/* Transparent Hackathon Demo Disclaimer Banner */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100/80 border border-slate-200 text-[11px] font-bold text-slate-600">
            <Info className="w-3.5 h-3.5 text-[#0799D8]" />
            <span>Demo Intelligence • Simulated Data</span>
          </div>
        </div>

        {/* 2. PROCESS FLOW STRIP */}
        <div className="max-w-4xl mx-auto mb-12 hidden sm:block">
          <div className="grid grid-cols-4 gap-2 bg-white/80 backdrop-blur-md rounded-2xl p-2 border border-emerald-900/10 shadow-2xs text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
            <div className="py-2 px-1 rounded-xl bg-[#ECFAF4] text-[#008F72] flex items-center justify-center gap-1">
              <span>1. Real-Time Data</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-[#EEF8FD] text-[#0799D8] flex items-center justify-center gap-1">
              <span>2. Trend Analysis</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-[#F1F9E8] text-[#69BE16] flex items-center justify-center gap-1">
              <span>3. Predictive AI</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-[#ECFAF4] text-[#008F72] flex items-center justify-center gap-1">
              <span>4. Action Response</span>
            </div>
          </div>
        </div>

        {/* 3. THREE BALANCED CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* CARD 1 — AQI FORECAST */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-emerald-900/10 shadow-[0_8px_25px_-5px_rgba(8,35,63,0.04)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#08233F]">AQI Forecast</h3>
                  <span className="text-[11px] font-extrabold text-[#0799D8] uppercase tracking-wider">NEXT 6 HOURS</span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#EEF8FD] text-[#0799D8] border border-[#0799D8]/20">
                  Trend Model
                </span>
              </div>

              {/* Chart */}
              <div className="h-36 w-full -ml-3 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="aqiForecastGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0799D8" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#0799D8" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      domain={[60, 100]}
                      hide
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#08233F] text-white px-2.5 py-1 rounded-xl text-xs font-bold shadow-lg">
                              {payload[0].payload.time}: <span className="text-sky-300">AQI {payload[0].value}</span>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="aqi" 
                      stroke="#0799D8" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#aqiForecastGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-2xl bg-[#F7FCFB] border border-slate-200/80">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">Peak predicted AQI</span>
                  <span className="text-xl font-black text-[#08233F] font-display">92</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block">Trend</span>
                  <span className="text-xs font-extrabold text-amber-600 block">Moderate deterioration expected</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#0799D8] shrink-0" />
              <span>Demo prediction • Simulated sensor trends</span>
            </div>
          </div>

          {/* CARD 2 — FILTER HEALTH */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-emerald-900/10 shadow-[0_8px_25px_-5px_rgba(8,35,63,0.04)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-[#08233F]">Filter Health</h3>
                  <span className="text-[11px] font-bold text-slate-500">Estimated overall health</span>
                </div>
                <span className="text-2xl font-black text-[#008F72] font-display">87%</span>
              </div>

              {/* Overall Progress Bar */}
              <div className="mb-5">
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                  <div className="h-full bg-gradient-to-r from-[#008F72] to-[#69BE16] rounded-full transition-all duration-1000 shadow-2xs" style={{ width: '87%' }} />
                </div>
              </div>

              {/* Sub-Filters Progress Bars */}
              <div className="space-y-3 mb-4">
                {filterList.map((f) => (
                  <div key={f.name} className="p-2.5 rounded-xl bg-[#F7FCFB] border border-slate-200/70">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#08233F] mb-1">
                      <span>{f.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#008F72] border border-[#008F72]/20">
                          {f.status}
                        </span>
                        <span className="text-slate-700">{f.health}%</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700" 
                        style={{ width: `${f.health}%`, backgroundColor: f.color }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008F72] shrink-0" />
              <span>AI-assisted maintenance estimate • Demo data</span>
            </div>
          </div>

          {/* CARD 3 — VAAYU INSIGHT (PROMINENT AI CARD) */}
          <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-b from-white via-[#F7FCFB] to-[#ECFAF4]/30 backdrop-blur-md rounded-3xl border border-[#008F72]/30 shadow-[0_10px_30px_-5px_rgba(0,143,114,0.12)] p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
            
            {/* Soft Ambient Gloss Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#008F72]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#008F72]/25 transition-all duration-500" />

            <div>
              {/* Header with Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-2xl bg-[#008F72] text-white shadow-xs">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <h3 className="text-base font-black text-[#08233F]">VAAYU Insight</h3>
                </div>

                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#008F72] text-white shadow-2xs tracking-wider uppercase">
                  DEMO INTELLIGENCE
                </span>
              </div>

              {/* Main Insight Body */}
              <div className="p-4 rounded-2xl bg-white/90 border border-emerald-900/10 shadow-2xs mb-4">
                <p className="text-xs sm:text-sm text-[#08233F] font-semibold leading-relaxed">
                  &ldquo;Particulate levels are currently elevated at the inlet. Based on the simulated trend, PM2.5 may continue rising over the next few hours.&rdquo;
                </p>
              </div>

              {/* Subsection: Recommended Response */}
              <div className="p-4 rounded-2xl bg-[#ECFAF4] border border-[#008F72]/30">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#008F72] uppercase tracking-wider mb-1">
                  <ArrowRight className="w-3.5 h-3.5 text-[#008F72]" />
                  <span>Recommended response</span>
                </div>
                <p className="text-xs font-bold text-slate-700 leading-normal">
                  Maintain active purification and monitor filter loading.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-emerald-900/10 text-[11px] font-bold text-[#008F72] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#008F72]" />
                <span>Simulated Predictive Engine</span>
              </span>
              <span className="text-[10px] bg-[#008F72]/10 px-2 py-0.5 rounded-full">Hackathon Demo</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
