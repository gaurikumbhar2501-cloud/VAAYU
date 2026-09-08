import React from 'react'
import { Sun, BatteryCharging, Wind, Cpu, Wifi, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function SystemHealthSection() {
  const metrics = [
    { name: 'Solar Generation', value: '142 W', status: 'Generating', icon: Sun, color: '#69BE16', bg: '#F1F9E8' },
    { name: 'Battery Level', value: '86%', status: 'Charging', icon: BatteryCharging, color: '#008F72', bg: '#ECFAF4' },
    { name: 'Suction Fan', value: 'ON', status: 'Optimal Intake', icon: Wind, color: '#0799D8', bg: '#EEF8FD' },
    { name: 'Exhaust Fan', value: 'ON', status: 'Optimal Purge', icon: Wind, color: '#0799D8', bg: '#EEF8FD' },
    { name: 'ESP32 — Inlet', value: 'ONLINE', status: 'Dual Sensing', icon: Cpu, color: '#008F72', bg: '#ECFAF4' },
    { name: 'ESP32 — Outlet', value: 'ONLINE', status: 'Dual Sensing', icon: Cpu, color: '#008F72', bg: '#ECFAF4' },
    { name: 'Wi-Fi Signal', value: 'CONNECTED', status: '100% Signal', icon: Wifi, color: '#69BE16', bg: '#F1F9E8' }
  ]

  return (
    <section id="system" className="bg-gradient-to-b from-slate-100/60 via-[#ECFAF4]/40 to-slate-100/60 py-16 sm:py-20 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008F72]" />
            <span>HARDWARE & POWER TELEMETRY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233F] tracking-tight mb-3">
            System & Power Health
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Real-time status of solar arrays, dual ESP32 microcontrollers, fans, and telemetry links.
          </p>
        </div>

        {/* System Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => {
            const Icon = m.icon
            return (
              <div
                key={m.name}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: m.bg, color: m.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border"
                    style={{ backgroundColor: m.bg, color: m.color, borderColor: `${m.color}30` }}
                  >
                    {m.status}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-0.5">{m.name}</span>
                  <span className="text-xl font-black text-[#08233F] font-display">{m.value}</span>
                </div>
              </div>
            )
          })}

          {/* Overall System Health Status Card */}
          <div className="bg-gradient-to-br from-[#008F72] to-teal-800 text-white rounded-3xl p-5 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-emerald-200">System Telemetry</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="text-xl font-black font-display">100% OPERATIONAL</div>
              <div className="text-[11px] text-emerald-100 font-medium mt-0.5">Demo telemetry status active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
