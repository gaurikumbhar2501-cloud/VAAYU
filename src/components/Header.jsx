import React, { useState, useEffect } from 'react'
import { Clock, Zap, Menu } from 'lucide-react'
import VaayuLogo from './VaayuLogo'

export default function Header({ isDemoMode, setIsDemoMode, activeSection, scrollTo, isNavOpen, setIsNavOpen }) {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      )
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left Side: Navigation Trigger (Logo + Menu Icon) & System Active Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Navigation Drawer Trigger Button */}
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/80 hover:bg-[#ECFAF4] border border-emerald-900/10 shadow-2xs group transition-all"
            title="Open Navigation Menu"
          >
            <div className="p-1 rounded-xl bg-slate-100 group-hover:bg-[#008F72] text-slate-700 group-hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <VaayuLogo className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-lg sm:text-xl font-black tracking-tight font-display text-[#08233F] leading-none">
                  VAAYU
                </span>
                <span className="text-[9px] font-bold tracking-wider text-[#008F72] uppercase hidden sm:block mt-0.5">
                  Menu
                </span>
              </div>
            </div>
          </button>

          {/* System Active Badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-xs font-bold text-[#008F72]">
            <span className="h-2 w-2 rounded-full bg-[#008F72] animate-pulse" />
            <span>SYSTEM ACTIVE</span>
          </div>
        </div>

        {/* Right Side: Demo Mode Toggle & Timestamp */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* DEMO MODE TOGGLE */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all border shadow-xs ${
              isDemoMode
                ? 'bg-amber-500 text-white border-amber-600 shadow-amber-500/20 animate-pulse'
                : 'bg-emerald-50 text-[#008F72] border-[#008F72]/30 hover:bg-emerald-100'
            }`}
            title="Toggle simulated pollution spike demo"
          >
            <Zap className={`w-3.5 h-3.5 ${isDemoMode ? 'text-white fill-white' : 'text-[#008F72]'}`} />
            <span>{isDemoMode ? 'DEMO SURGE: ON' : 'DEMO MODE'}</span>
          </button>

          {/* Live Clock */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EEF8FD] border border-[#0799D8]/20 text-xs font-medium text-[#08233F]">
            <Clock className="w-3.5 h-3.5 text-[#0799D8]" />
            <span className="font-mono font-semibold tracking-wide">
              {timeString || 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
