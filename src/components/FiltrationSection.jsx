import React from 'react'
import { Filter, ArrowRight, ShieldCheck, Sparkles, Layers, Zap, CheckCircle2, Wind } from 'lucide-react'

export default function FiltrationSection() {
  const stages = [
    {
      id: '01',
      name: 'Metal Mesh',
      desc: 'Captures large debris, leaves and coarse particles.',
      type: 'Debris Barrier',
      icon: Layers,
      accent: '#0799D8'
    },
    {
      id: '02',
      name: 'Pre-Filter',
      desc: 'Removes coarse dust and larger particulate matter.',
      type: 'Coarse Media',
      icon: Filter,
      accent: '#008F72'
    },
    {
      id: '03',
      name: 'Activated Carbon',
      desc: 'Adsorption stage for VOCs, odors and smoke-related gases.',
      type: 'Gas Adsorption',
      icon: Sparkles,
      accent: '#69BE16'
    },
    {
      id: '04',
      name: 'Zeolite 13X',
      desc: 'Supplementary adsorption support for selected gaseous pollutants.',
      type: 'Molecular Sieve',
      icon: Sparkles,
      accent: '#0799D8'
    },
    {
      id: '05',
      name: 'KMnO4 Filter',
      desc: 'Chemically treats selected gaseous pollutants including NOx.',
      type: 'Chemical Treatment',
      icon: Zap,
      accent: '#008F72'
    },
    {
      id: '06',
      name: 'Hopcalite',
      desc: 'Catalytic stage supporting carbon monoxide oxidation.',
      type: 'Catalytic Stage',
      icon: ShieldCheck,
      accent: '#69BE16'
    },
    {
      id: '07',
      name: 'H13 HEPA',
      desc: 'Final high-efficiency particulate filtration stage.',
      type: 'HIGH-EFFICIENCY FILTRATION',
      icon: ShieldCheck,
      accent: '#008F72'
    }
  ]

  return (
    <section id="filtration" className="bg-gradient-to-b from-slate-100/60 via-[#ECFAF4]/50 to-slate-100/60 pt-6 sm:pt-8 pb-16 sm:pb-20 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
            <Filter className="w-3.5 h-3.5 text-[#008F72]" />
            <span>ENGINEERED PURIFICATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233F] tracking-tight mb-3 font-display">
            7 Stages. One Cleaner Airflow.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            VAAYU combines layered particulate filtration, adsorption and catalytic treatment to progressively clean incoming air before it exits the system.
          </p>
        </div>

        {/* 2. 7-STAGE SEQUENTIAL GRID (2 Rows on Desktop, 2 Cols on Tablet, 1 Col on Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative mb-12">
          {stages.map((st, idx) => {
            const Icon = st.icon

            return (
              <div
                key={st.id}
                className="relative group rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 backdrop-blur-md bg-gradient-to-b from-white/95 via-white/90 to-white/80 border border-white/90 shadow-[0_8px_25px_-5px_rgba(8,35,63,0.04)] hover:shadow-[0_18px_35px_-8px_rgba(0,143,114,0.12)] hover:border-emerald-500/30 overflow-hidden"
              >
                {/* Glossy Top Edge Highlight Line */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 pointer-events-none" />

                {/* Subtle Top-Right Radial Gloss & Accent Glow */}
                <div
                  className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${st.accent}30 0%, rgba(255,255,255,0) 70%)`
                  }}
                />

                {/* Ambient Card Bottom Tint Glow */}
                <div
                  className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-50"
                  style={{
                    background: `radial-gradient(circle, ${st.accent}20 0%, rgba(255,255,255,0) 70%)`
                  }}
                />

                {/* Subtle Hover Light Sweep */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
                  <div className="absolute -left-[100%] top-0 h-full w-[60%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-1000 ease-in-out group-hover:left-[160%]" />
                </div>

                <div className="relative z-10">
                  {/* Stage Badge & Category Pill Header */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Glossy Number Badge */}
                    <span
                      className="w-10 h-10 rounded-2xl text-xs font-black flex items-center justify-center border shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md relative overflow-hidden"
                      style={{
                        backgroundColor: `${st.accent}14`,
                        color: st.accent,
                        borderColor: `${st.accent}35`,
                        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.8), 0 2px 8px ${st.accent}15`
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                      <span className="relative z-10">{st.id}</span>
                    </span>

                    {/* Glass Category Pill */}
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-white/75 backdrop-blur-xs text-slate-700 uppercase border border-slate-200/80 shadow-2xs tracking-wider">
                      {st.type}
                    </span>
                  </div>

                  {/* Stage Icon & Title */}
                  <div className="flex items-center gap-2.5 mb-2">
                    <div 
                      className="p-1.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${st.accent}12`
                      }}
                    >
                      <Icon 
                        className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,143,114,0.4)]" 
                        style={{ color: st.accent }} 
                      />
                    </div>
                    <h3 className="text-base font-extrabold text-[#08233F] group-hover:text-[#008F72] transition-colors">
                      {st.name}
                    </h3>
                  </div>

                  {/* Filter Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                    {st.desc}
                  </p>
                </div>

                {/* Connection Status Indicator */}
                <div className="relative z-10 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 text-[#008F72]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#008F72] drop-shadow-[0_0_4px_rgba(0,143,114,0.3)]" />
                    <span className="font-extrabold tracking-tight">Stage {st.id} Active</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* 3. BOTTOM OF SECTION STATEMENT & VISUAL FLOW */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-emerald-900/10 p-6 text-center shadow-xs">
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4">
            &ldquo;From coarse debris to fine particulate and selected gaseous pollutants, every stage has a defined role in the purification pathway.&rdquo;
          </p>

          {/* Visual Flow Strip: POLLUTED AIR -> 7-STAGE PURIFICATION -> CLEANER AIR */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 text-xs font-bold">
            <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 uppercase text-[11px]">
              POLLUTED AIR
            </span>

            <div className="flex items-center gap-1 text-[#008F72] font-black">
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
              <span>7-STAGE PURIFICATION</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </div>

            <span className="px-3 py-1 rounded-xl bg-[#ECFAF4] text-[#008F72] border border-[#008F72]/30 uppercase text-[11px]">
              CLEANER AIR
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
