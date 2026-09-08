import React, { useEffect } from 'react'
import {
  Wind,
  Activity,
  Radio,
  Filter,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Info,
  ChevronRight,
  X
} from 'lucide-react'
import VaayuLogo from './VaayuLogo'

export default function SidebarNav({ activeSection, scrollTo, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'hero', label: 'Home', icon: Wind },
    { id: 'flow', label: 'Air Flow', icon: Activity },
    { id: 'sensors', label: 'Live Sensors', icon: Radio },
    { id: 'filtration', label: '8-Stage Core', icon: Filter },
    { id: 'ai', label: 'AI Forecast', icon: Sparkles },
    { id: 'history', label: 'Analytics', icon: BarChart3 },
    { id: 'impact', label: 'Impact', icon: ShieldCheck },
    { id: 'about', label: 'About', icon: Info }
  ]

  // Close drawer when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setIsOpen])

  const handleNavClick = (id) => {
    setIsOpen(false)
    setTimeout(() => {
      scrollTo(id)
    }, 150)
  }

  return (
    <>
      {/* 1. TRANSLUCENT BACKDROP OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 2. SLIDE-OUT NAVIGATION DRAWER */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white/95 backdrop-blur-xl border-r border-emerald-900/10 shadow-2xl rounded-r-3xl transition-transform duration-300 ease-in-out p-6 flex flex-col justify-between overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header Inside Menu */}
          <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-white shadow-xs border border-emerald-100">
                <VaayuLogo className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xl font-black text-[#08233F] tracking-tight font-display block">
                  VAAYU
                </span>
                <span className="text-[10px] font-bold text-[#008F72] uppercase block -mt-1">
                  Navigation Menu
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-2xl bg-slate-100 text-slate-500 hover:text-[#08233F] hover:bg-slate-200 transition-colors"
              title="Close Menu (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Section Indicator Header */}
          <div className="flex items-center justify-between px-2 mb-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              SELECT SECTION
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#ECFAF4] text-[#008F72]">
              8 Sections
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#ECFAF4] text-[#008F72] font-black border border-[#008F72]/30 shadow-2xs translate-x-1'
                      : 'text-slate-600 font-bold hover:bg-slate-100/80 hover:text-[#08233F] hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Active Bullet / Icon */}
                    <div
                      className={`p-2 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#008F72] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-500 group-hover:text-[#008F72] group-hover:bg-emerald-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="tracking-tight text-sm">{item.label}</span>
                  </div>

                  {isActive ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#008F72] animate-pulse" />
                      <span className="text-[10px] font-extrabold text-[#008F72] uppercase">Active</span>
                    </div>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer info inside slide menu */}
        <div className="pt-4 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#008F72] animate-ping" />
              <span className="text-[#08233F]">VAAYU Platform</span>
            </div>
            <span className="text-[10px] text-[#008F72] font-extrabold uppercase">Live System</span>
          </div>
        </div>
      </aside>
    </>
  )
}
