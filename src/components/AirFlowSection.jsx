import React from 'react'
import { Radio, ArrowRight, ArrowDown, Info, ShieldCheck, AlertCircle, Sparkles, Activity } from 'lucide-react'
import VaayuLogo from './VaayuLogo'

export default function AirFlowSection({ isDemoMode, liveMetrics }) {
  // Inlet live metrics with defaults
  const inletPm25 = isDemoMode ? 120 : (liveMetrics?.inletPm25 || 86)
  const inletPm10 = isDemoMode ? 210 : (liveMetrics?.inletPm10 || 142)
  const inletCo = isDemoMode ? 3.8 : (liveMetrics?.coInlet || 1.8)
  const inletO3 = isDemoMode ? 115 : (liveMetrics?.o3Inlet || 62)

  // Outlet live metrics with defaults
  const outletPm25 = isDemoMode ? 32 : (liveMetrics?.outletPm25 || 24)
  const outletPm10 = isDemoMode ? 68 : (liveMetrics?.outletPm10 || 48)
  const outletCo = isDemoMode ? 1.4 : (liveMetrics?.coOutlet || 1.1)
  const outletO3 = isDemoMode ? 42 : (liveMetrics?.o3Outlet || 39)

  // Dynamic percentage reductions: ((inlet - outlet) / inlet) * 100 rounded to nearest integer
  const pm25Reduction = Math.round(((inletPm25 - outletPm25) / inletPm25) * 100)
  const pm10Reduction = Math.round(((inletPm10 - outletPm10) / inletPm10) * 100)
  const coReduction = Math.round(((inletCo - outletCo) / inletCo) * 100)
  const o3Reduction = Math.round(((inletO3 - outletO3) / inletO3) * 100)

  // Comparison parameters array
  const comparisons = [
    { name: 'PM2.5', inlet: inletPm25, outlet: outletPm25, unit: 'µg/m³', reduction: pm25Reduction, accent: '#0799D8' },
    { name: 'PM10', inlet: inletPm10, outlet: outletPm10, unit: 'µg/m³', reduction: pm10Reduction, accent: '#008F72' },
    { name: 'CO', inlet: inletCo, outlet: outletCo, unit: 'ppm', reduction: coReduction, accent: '#0799D8' },
    { name: 'O₃ / NOx', inlet: inletO3, outlet: outletO3, unit: 'ppb', reduction: o3Reduction, accent: '#69BE16' }
  ]

  return (
    <section id="flow" className="bg-gradient-to-b from-slate-100/70 via-[#ECFAF4]/40 to-slate-100/70 pt-6 sm:pt-8 pb-16 sm:pb-20 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 transition-all">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
            <Radio className="w-3.5 h-3.5 text-[#008F72] animate-pulse" />
            <span>REAL-TIME PURIFICATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233F] tracking-tight mb-3 font-display">
            See the difference VAAYU makes.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Paired inlet and outlet sensing shows how air quality changes through the purification system.
          </p>
        </div>

        {/* 2. MAIN AIRFLOW VISUALIZATION CONTAINER */}
        <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xl p-6 sm:p-8 mb-10 relative">
          
          {/* Main 3-Zone Airflow Grid (Horizontal on Desktop, Vertical Stack on Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT SIDE — AIR IN CARD */}
            <div className="lg:col-span-4 bg-[#FFFBEB] rounded-3xl border border-amber-200 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-extrabold text-amber-950 font-display">Air IN</h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                    INLET
                  </span>
                </div>
                <span className="text-xs font-semibold text-amber-800/80 block mb-4">
                  Ambient air
                </span>

                {/* Polluted Air Status Indicator (Warm/Red Warning Accent ONLY inside this card) */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-800 text-xs font-bold mb-5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Polluted air detected</span>
                </div>

                {/* Parameter Readings List */}
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">PM2.5</span>
                    <span className="font-black text-amber-700 text-sm">{inletPm25} <span className="text-[10px] font-normal text-slate-500">µg/m³</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">PM10</span>
                    <span className="font-black text-amber-700 text-sm">{inletPm10} <span className="text-[10px] font-normal text-slate-500">µg/m³</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">CO</span>
                    <span className="font-black text-amber-700 text-sm">{inletCo} <span className="text-[10px] font-normal text-slate-500">ppm</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-amber-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">O₃ / NOx</span>
                    <span className="font-black text-amber-700 text-sm">{inletO3} <span className="text-[10px] font-normal text-slate-500">ppb</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER — VAAYU PURIFICATION CORE */}
            <div className="lg:col-span-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-500/40 p-6 text-white flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[380px] shadow-2xl">
              
              {/* Animated 2D Particle Streams SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 380" fill="none">
                {/* Incoming Polluted Particles (Warm Amber/Red) */}
                <path d="M 10 120 Q 80 140 150 170" stroke="#F59E0B" strokeWidth="3" className="animate-airflow" opacity="0.85" />
                <path d="M 10 190 Q 80 190 150 190" stroke="#EF4444" strokeWidth="3.5" className="animate-airflow" opacity="0.85" />
                <path d="M 10 260 Q 80 240 150 210" stroke="#F59E0B" strokeWidth="3" className="animate-airflow" opacity="0.85" />

                {/* Exiting Clean Particles (Cyan/Green - Visibly fewer & clean) */}
                <path d="M 150 190 Q 220 160 290 130" stroke="#0799D8" strokeWidth="3.5" className="animate-airflow" opacity="0.9" />
                <path d="M 150 190 Q 220 220 290 250" stroke="#008F72" strokeWidth="3.5" className="animate-airflow" opacity="0.9" />
              </svg>

              {/* Top Header inside center unit */}
              <div className="relative z-10 w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <VaayuLogo className="w-6 h-6" />
                  <span className="text-sm font-black text-emerald-300 font-display tracking-wider">VAAYU</span>
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  8-STAGE PURIFICATION
                </span>
              </div>

              {/* Center Unit Glowing Core */}
              <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="w-28 h-48 rounded-2xl bg-slate-900/90 border border-emerald-400/60 p-3 shadow-2xl flex flex-col justify-between items-center text-center animate-pulse-subtle">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-300 block font-display">VAAYU</span>
                    <span className="text-[9px] font-bold text-emerald-200/90 uppercase block mt-0.5">
                      PURIFIER TOWER
                    </span>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                    ACTIVE CORE
                  </span>
                </div>
              </div>

              {/* Subtitle below visual */}
              <div className="relative z-10 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-500/40">
                Air enters &rarr; filtration &rarr; sensing
              </div>
            </div>

            {/* RIGHT SIDE — AIR OUT CARD */}
            <div className="lg:col-span-4 bg-[#ECFAF4] rounded-3xl border border-[#008F72]/30 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-extrabold text-[#08233F] font-display">Air OUT</h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#008F72] text-white">
                    OUTLET
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#008F72] block mb-4">
                  After purification
                </span>

                {/* Cleaner Air Status Indicator (VAAYU Green/Blue Accents) */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#008F72] text-xs font-bold mb-5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008F72] shrink-0" />
                  <span>Cleaner air detected</span>
                </div>

                {/* Parameter Readings List */}
                <div className="space-y-2.5 text-xs font-medium">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">PM2.5</span>
                    <span className="font-black text-[#008F72] text-sm">{outletPm25} <span className="text-[10px] font-normal text-slate-500">µg/m³</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">PM10</span>
                    <span className="font-black text-[#008F72] text-sm">{outletPm10} <span className="text-[10px] font-normal text-slate-500">µg/m³</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">CO</span>
                    <span className="font-black text-[#008F72] text-sm">{outletCo} <span className="text-[10px] font-normal text-slate-500">ppm</span></span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white/90 border border-emerald-200/80 shadow-2xs">
                    <span className="font-bold text-slate-700">O₃ / NOx</span>
                    <span className="font-black text-[#008F72] text-sm">{outletO3} <span className="text-[10px] font-normal text-slate-500">ppb</span></span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. CENTRAL IMPACT METRIC */}
          <div className="my-8 flex justify-center">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#008F72] via-teal-700 to-[#08233F] text-white text-center shadow-lg border border-emerald-300/30 max-w-sm w-full">
              <div className="text-5xl font-black font-display text-white tracking-tight mb-1">
                {pm25Reduction}%
              </div>
              <div className="text-sm font-extrabold text-emerald-200 uppercase tracking-wider mb-1">
                PM2.5 Reduction
              </div>
              <div className="text-[11px] font-bold text-emerald-100/80 bg-white/10 px-3 py-1 rounded-full inline-block border border-white/20">
                Inlet &rarr; Outlet
              </div>
            </div>
          </div>

          {/* 4. PARAMETER COMPARISON ROW */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black uppercase text-[#08233F] tracking-wider">
                Parameter Reduction Comparison
              </h4>
              <span className="text-[11px] font-semibold text-slate-500">
                Demo data &bull; Simulated sensors
              </span>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {comparisons.map((c) => (
                <div key={c.name} className="p-4 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{c.name}</span>
                      <span className="text-[#008F72] font-black">{c.reduction}%</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mb-2">
                      {c.inlet} &rarr; {c.outlet} <span className="text-[10px] font-normal text-slate-500">{c.unit}</span>
                    </div>
                  </div>

                  {/* Animated Progress / Reduction Bar */}
                  <div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${c.reduction}%`, backgroundColor: c.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 13. IMPORTANT PRODUCT MESSAGING STATEMENT */}
        <div className="bg-white rounded-2xl border border-emerald-900/10 p-6 text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-base sm:text-lg font-black text-[#08233F] font-display tracking-tight">
            &ldquo;VAAYU doesn&apos;t just purify air. It measures the difference.&rdquo;
          </p>
          <span className="text-xs text-[#008F72] font-bold uppercase tracking-wider block mt-1">
            Paired Inlet/Outlet Sensing Standard
          </span>
        </div>

      </div>
    </section>
  )
}
