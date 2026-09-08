import React from 'react'
import { Sparkles, Wind, Activity, ShieldCheck, ArrowRight, Play, Radio, Building2, Zap } from 'lucide-react'
import VaayuLogo from './VaayuLogo'
import vaayuTowerImg from '../assets/vaayu-tower.jpeg'

export default function HeroSection({ isDemoMode, setIsDemoMode, scrollTo }) {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* HERO LEFT SIDE */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFAF4] border border-[#008F72]/30 text-xs font-bold tracking-widest uppercase text-[#008F72] mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#69BE16]" />
            <span>CLEANER AIR &bull; HEALTHIER TOMORROW</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight font-display text-[#08233F] mb-1 leading-none">
            <span className="bg-gradient-to-r from-[#008F72] via-[#0799D8] to-[#008F72] bg-clip-text text-transparent">
              VAAYU
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#08233F] mb-3 tracking-tight">
            Smart Outdoor Air Purification
          </h2>

          {/* Main Tagline */}
          <div className="inline-block px-3 py-1 rounded-lg bg-[#EEF8FD] border border-[#0799D8]/20 text-[#0799D8] text-sm font-black tracking-wider uppercase mb-4">
            &ldquo;Measure. Purify. Prove.&rdquo;
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed font-medium">
            VAAYU combines multi-stage outdoor air purification with real-time inlet and outlet monitoring to show measurable pollutant reduction.
          </p>

          {/* 3 Compact Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8">
            <div className="p-3.5 rounded-2xl bg-white border border-emerald-900/10 shadow-xs flex flex-col items-start">
              <div className="w-8 h-8 rounded-xl bg-[#ECFAF4] border border-[#008F72]/20 flex items-center justify-center mb-2">
                <Wind className="w-4 h-4 text-[#008F72]" />
              </div>
              <h3 className="text-xs font-bold text-[#08233F] mb-0.5">Smart Purification</h3>
              <p className="text-[11px] text-slate-500 leading-snug">Active outdoor airflow filtration</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-emerald-900/10 shadow-xs flex flex-col items-start">
              <div className="w-8 h-8 rounded-xl bg-[#EEF8FD] border border-[#0799D8]/20 flex items-center justify-center mb-2">
                <Activity className="w-4 h-4 text-[#0799D8]" />
              </div>
              <h3 className="text-xs font-bold text-[#08233F] mb-0.5">Air Intelligence</h3>
              <p className="text-[11px] text-slate-500 leading-snug">Real-time monitoring</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-emerald-900/10 shadow-xs flex flex-col items-start">
              <div className="w-8 h-8 rounded-xl bg-lime-50 border border-[#69BE16]/30 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4 text-[#69BE16]" />
              </div>
              <h3 className="text-xs font-bold text-[#08233F] mb-0.5">Cleaner Communities</h3>
              <p className="text-[11px] text-slate-500 leading-snug">Healthier & safer tomorrow</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('flow')}
              className="bg-[#008F72] hover:bg-[#007A61] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-emerald-900/15 flex items-center gap-2.5 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Explore VAAYU</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>

            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="bg-white hover:bg-slate-50 text-[#08233F] border border-slate-200/90 font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs flex items-center gap-2.5 transition-all hover:border-emerald-300"
            >
              <Zap className={`w-4 h-4 ${isDemoMode ? 'text-amber-500 fill-amber-500' : 'text-[#008F72]'}`} />
              <span>{isDemoMode ? 'Stop Demo Surge' : '▶ Watch Demo Surge'}</span>
            </button>
          </div>
        </div>

        {/* HERO RIGHT SIDE: Animated Outdoor Tower Graphic Container */}
        <div className="lg:col-span-6 relative">
          <div className="p-6 rounded-3xl bg-white border border-emerald-900/10 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
            {/* Status Overlays */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#008F72]" />
                <span>Urban Zone Deployment</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/30 text-[11px] font-bold text-[#008F72]">
                <Radio className="w-3 h-3 text-[#008F72] animate-pulse" />
                <span>360° Clean Air Perimeter</span>
              </div>
            </div>

            {/* Outdoor Airflow Purification Visual Graphic */}
            <div className="h-[340px] sm:h-[380px] w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950 relative overflow-hidden flex items-center justify-center p-4 shadow-inner">
              {/* City Skyline SVG Silhouette */}
              <svg className="absolute bottom-0 inset-x-0 w-full h-32 opacity-25" viewBox="0 0 500 150" fill="none">
                <rect x="20" y="70" width="30" height="80" fill="#0799D8" />
                <rect x="60" y="40" width="45" height="110" fill="#008F72" />
                <rect x="115" y="80" width="35" height="70" fill="#69BE16" />
                <rect x="160" y="30" width="50" height="120" fill="#0799D8" />
                <circle cx="240" cy="110" r="25" fill="#008F72" opacity="0.6" />
                <circle cx="270" cy="115" r="20" fill="#69BE16" opacity="0.6" />
                <rect x="300" y="50" width="40" height="100" fill="#008F72" />
                <rect x="350" y="85" width="30" height="65" fill="#0799D8" />
                <rect x="390" y="35" width="55" height="115" fill="#69BE16" />
              </svg>

              {/* Airflow Particles & Paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" fill="none">
                {/* Raw Air Intake Streams (Left -> Center) */}
                <path d="M 20 100 Q 110 110 180 145" stroke={isDemoMode ? '#EF4444' : '#F59E0B'} strokeWidth={isDemoMode ? '3.5' : '2.5'} className="animate-airflow" opacity="0.85" />
                <path d="M 20 150 Q 100 140 180 150" stroke={isDemoMode ? '#EF4444' : '#F59E0B'} strokeWidth={isDemoMode ? '3' : '2'} className="animate-airflow" opacity="0.75" />
                <path d="M 20 200 Q 110 180 180 155" stroke={isDemoMode ? '#EF4444' : '#F59E0B'} strokeWidth={isDemoMode ? '3.5' : '2.5'} className="animate-airflow" opacity="0.85" />

                {/* Purified Air Exit Streams (Center -> Right) */}
                <path d="M 220 145 Q 290 100 380 90" stroke="#008F72" strokeWidth="3" className="animate-airflow" opacity="0.9" />
                <path d="M 220 150 Q 300 150 380 150" stroke="#0799D8" strokeWidth="3" className="animate-airflow" opacity="0.9" />
                <path d="M 220 155 Q 290 200 380 210" stroke="#69BE16" strokeWidth="3" className="animate-airflow" opacity="0.9" />
              </svg>

              {/* Central VAAYU Tower Image Visual */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full py-2">
                <img
                  src={vaayuTowerImg}
                  alt="VAAYU Purifier Tower Model"
                  className="max-h-[260px] sm:max-h-[300px] w-auto max-w-full object-contain rounded-2xl drop-shadow-[0_12px_30px_rgba(0,143,114,0.35)] transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Floating Metric Badges */}
              <div className={`absolute top-4 left-4 border p-2.5 rounded-xl text-left shadow-lg backdrop-blur-md transition-all ${
                isDemoMode ? 'bg-red-950/90 border-red-500/50' : 'bg-slate-900/90 border-amber-500/30'
              }`}>
                <div className={`text-[10px] uppercase font-extrabold ${isDemoMode ? 'text-red-400' : 'text-amber-400'}`}>
                  {isDemoMode ? 'POLLUTION SURGE INTAKE' : 'RAW AIR INTAKE'}
                </div>
                <div className="text-xs font-bold text-white">
                  {isDemoMode ? 'AQI 185 • Heavy Smog' : 'AQI 168 • Unhealthy'}
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 p-2.5 rounded-xl text-left shadow-lg">
                <div className="text-[10px] uppercase font-extrabold text-emerald-400">PURIFIED AIR OUTPUT</div>
                <div className="text-xs font-bold text-white">
                  {isDemoMode ? 'AQI 32 • Excellent (83% Cleaned)' : 'AQI 42 • Good'}
                </div>
              </div>
            </div>

            <div className="mt-3 text-center text-[11px] text-slate-500 font-medium">
              Outdoor atmospheric airflow purification & real-time monitoring container
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
