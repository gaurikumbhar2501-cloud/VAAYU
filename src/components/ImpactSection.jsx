import React from 'react'
import { Leaf, Award, Wind, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react'

export default function ImpactSection() {
  const impacts = [
    { title: 'Total Air Processed', value: '1,248,500 m³', icon: Wind, color: '#0799D8', bg: '#EEF8FD' },
    { title: 'Avg PM2.5 Reduction', value: '71.4%', icon: ShieldCheck, color: '#008F72', bg: '#ECFAF4' },
    { title: 'Avg PM10 Reduction', value: '58.2%', icon: ShieldCheck, color: '#008F72', bg: '#ECFAF4' },
    { title: 'Operating Hours', value: '1,840 Hours', icon: Clock, color: '#69BE16', bg: '#F1F9E8' },
    { title: 'Outdoor Area Served', value: '~4,500 m²', icon: MapPin, color: '#0799D8', bg: '#EEF8FD' }
  ]

  return (
    <section id="impact" className="bg-gradient-to-b from-slate-100/60 via-[#ECFAF4]/40 to-slate-100/60 pt-6 sm:pt-8 pb-16 sm:pb-20 border-y border-emerald-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
            <Award className="w-3.5 h-3.5 text-[#008F72]" />
            <span>MEASURABLE ENVIRONMENTAL IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08233F] tracking-tight mb-3">
            Quantifiable Atmospheric Impact
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Real-time telemetry translates continuous outdoor airflow purification into tangible public health metrics.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {impacts.map((imp) => {
            const Icon = imp.icon
            return (
              <div
                key={imp.title}
                className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 flex flex-col justify-between text-center transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: imp.bg, color: imp.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-1">{imp.title}</span>
                  <span className="text-2xl font-black text-[#08233F] font-display">{imp.value}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-medium">
          Prototype &bull; Hackathon demonstration estimates based on 1,840 continuous deployment hours
        </div>
      </div>
    </section>
  )
}
