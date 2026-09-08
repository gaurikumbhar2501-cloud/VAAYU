import React from 'react'
import { Sparkles, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import VaayuLogo from './VaayuLogo'

export default function AboutSection({ scrollTo }) {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-24">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFAF4] border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#69BE16]" />
          <span>ABOUT VAAYU PLATFORM</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-[#08233F] tracking-tight mb-4 font-display">
          &ldquo;Measure. Purify. Prove.&rdquo;
        </h2>
        <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
          VAAYU is built on a simple fundamental principle: environmental purification must be verifiable, transparent, and continuous.
        </p>
      </div>

      {/* 3 Storytelling Cards: PROBLEM -> SOLUTION -> PROOF */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* PROBLEM */}
        <div className="bg-white rounded-3xl border border-amber-200/80 shadow-md p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">
              THE PROBLEM
            </span>
            <h3 className="text-xl font-extrabold text-[#08233F] mb-3">
              Unverifiable Air Monitoring
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Outdoor air pollution is often measured at generalized regional stations miles away, leaving hyper-local street-level exposure unmonitored and unaddressed.
            </p>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-md p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#ECFAF4] border border-[#008F72]/30 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-[#008F72]" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#008F72] block mb-2">
              THE SOLUTION
            </span>
            <h3 className="text-xl font-extrabold text-[#08233F] mb-3">
              Active Outdoor Purification
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              VAAYU actively draws in polluted ambient city air, passes it through a 7-stage industrial barrier core, and outputs clean, breathable air back into public spaces.
            </p>
          </div>
        </div>

        {/* PROOF */}
        <div className="bg-white rounded-3xl border border-sky-200/80 shadow-md p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#EEF8FD] border border-[#0799D8]/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-[#0799D8]" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0799D8] block mb-2">
              THE PROOF
            </span>
            <h3 className="text-xl font-extrabold text-[#08233F] mb-3">
              Paired Dual Sensing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Paired inlet and outlet sensor arrays continuously measure pollutant concentrations before and after purification, providing indisputable proof of reduction.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-[#008F72] via-teal-800 to-[#08233F] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
            <VaayuLogo className="w-12 h-12" />
          </div>
          <div>
            <h4 className="text-2xl font-black font-display mb-1">Experience VAAYU Intelligence Live</h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
              Smart outdoor air purification engineered for live hackathon demonstration.
            </p>
          </div>
        </div>

        <button
          onClick={() => scrollTo('hero')}
          className="bg-white text-[#08233F] hover:bg-slate-100 font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg shrink-0 flex items-center gap-2 transition-all hover:scale-105"
        >
          <span>Return to Top</span>
          <ArrowRight className="w-4 h-4 text-[#008F72]" />
        </button>
      </div>
    </section>
  )
}
