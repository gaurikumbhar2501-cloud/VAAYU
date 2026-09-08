import React, { useState, useEffect } from 'react'
import {
  Wind,
  Layers,
  Activity,
  Filter,
  Sparkles,
  Thermometer,
  Droplets,
  Radio,
  Cpu,
  Wifi,
  TrendingUp,
  TrendingDown,
  Info,
  Clock
} from 'lucide-react'

export default function LiveSensorsSection({ isDemoMode, liveMetrics }) {
  const [sensorView, setSensorView] = useState('OUT')
  const [lastUpdatedTime, setLastUpdatedTime] = useState('just now')

  // Local simulated fluctuation offsets
  const [fluctuations, setFluctuations] = useState({
    pm1: 0,
    pm25: 0,
    pm4: 0,
    pm10: 0,
    co: 0,
    o3: 0,
    temp: 0,
    hum: 0,
    moisture: 0
  })

  // Timer to simulate small realistic sensor jitter every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFluctuations({
        pm1: Math.floor((Math.random() - 0.5) * 2),
        pm25: Math.floor((Math.random() - 0.5) * 2),
        pm4: Math.floor((Math.random() - 0.5) * 3),
        pm10: Math.floor((Math.random() - 0.5) * 3),
        co: parseFloat(((Math.random() - 0.5) * 0.1).toFixed(1)),
        o3: Math.floor((Math.random() - 0.5) * 2),
        temp: parseFloat(((Math.random() - 0.5) * 0.2).toFixed(1)),
        hum: Math.floor((Math.random() - 0.5) * 2),
        moisture: Math.floor((Math.random() - 0.5) * 1)
      })

      const now = new Date()
      setLastUpdatedTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const isOut = sensorView === 'OUT'

  // Dynamic values for IN vs OUT
  const inletPm1 = 64 + fluctuations.pm1
  const outletPm1 = 18 + fluctuations.pm1

  const inletPm25 = 86 + fluctuations.pm25
  const outletPm25 = 24 + fluctuations.pm25

  const inletPm4 = 109 + fluctuations.pm4
  const outletPm4 = 31 + fluctuations.pm4

  const inletPm10 = 142 + fluctuations.pm10
  const outletPm10 = 48 + fluctuations.pm10

  const rawCo = isOut ? 1.1 : 1.8
  const rawO3 = isOut ? 39 : 62
  const rawTemp = isOut ? 28.4 : 29.8
  const rawHum = isOut ? 58 : 61
  const rawMoisture = (liveMetrics?.moisture || 54)

  const currentCo = parseFloat(Math.max(0.1, rawCo + fluctuations.co).toFixed(1))
  const currentO3 = Math.max(1, rawO3 + fluctuations.o3)
  const currentTemp = parseFloat(Math.max(10, rawTemp + fluctuations.temp).toFixed(1))
  const currentHum = Math.max(10, rawHum + fluctuations.hum)
  const currentMoisture = Math.max(10, rawMoisture + fluctuations.moisture)

  // 5 Single-Metric Sensor Cards (Cards 2-6)
  const singleCards = [
    {
      id: 'co',
      title: 'CO Gas Sensor',
      secondary: 'Alphasense CO-B4',
      value: currentCo,
      unit: 'ppm',
      status: 'Normal',
      statusColor: '#008F72',
      trend: '-1.1%',
      trendUp: false,
      icon: Activity,
      accent: '#0799D8',
      accentBg: '#EEF8FD'
    },
    {
      id: 'o3',
      title: 'O₃ / NOx Sensor',
      secondary: 'OX-B431',
      value: currentO3,
      unit: 'ppb',
      status: 'Normal',
      statusColor: '#008F72',
      trend: '-0.4%',
      trendUp: false,
      icon: Sparkles,
      accent: '#69BE16',
      accentBg: '#F1F9E8'
    },
    {
      id: 'hum',
      title: 'Humidity Sensor',
      secondary: 'SHT35',
      value: currentHum,
      unit: '%',
      status: 'Normal',
      statusColor: '#008F72',
      trend: '-0.5%',
      trendUp: false,
      icon: Droplets,
      accent: '#0799D8',
      accentBg: '#EEF8FD'
    },
    {
      id: 'temp',
      title: 'Temperature Sensor',
      secondary: 'DS18B20',
      value: currentTemp,
      unit: '°C',
      status: 'Normal',
      statusColor: '#008F72',
      trend: '+0.2°',
      trendUp: true,
      icon: Thermometer,
      accent: '#D97706',
      accentBg: '#FEF3C7'
    },
    {
      id: 'moisture',
      title: 'Moisture Sensor',
      secondary: 'DFRobot',
      value: currentMoisture,
      unit: '%',
      status: 'Normal',
      statusColor: '#008F72',
      trend: '+0.1%',
      trendUp: true,
      icon: Droplets,
      accent: '#69BE16',
      accentBg: '#F1F9E8'
    }
  ]

  return (
    <section id="sensors" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
      
      {/* 1. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFAF4] border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
          <Radio className="w-3.5 h-3.5 text-[#008F72] animate-pulse" />
          <span>LIVE SENSOR NETWORK</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233F] tracking-tight mb-3 font-display">
          Every breath, measured.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          VAAYU continuously monitors particulate, gaseous and environmental parameters before and after purification.
        </p>

        {/* Live Simulation Badge & Helper Text */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-xs font-extrabold text-[#008F72] shadow-xs">
            <span className="h-2 w-2 rounded-full bg-[#008F72] animate-pulse" />
            <span>LIVE SIMULATION</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Demo data &bull; Simulated sensors
          </span>
        </div>
      </div>

      {/* AIR IN / AIR OUT SELECTOR */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-slate-200/80 p-1.5 rounded-2xl border border-slate-300/70 inline-flex items-center gap-1 shadow-xs">
          <button
            onClick={() => setSensorView('IN')}
            className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              sensorView === 'IN'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            [ AIR IN ]
          </button>
          <button
            onClick={() => setSensorView('OUT')}
            className={`px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              sensorView === 'OUT'
                ? 'bg-[#008F72] text-white shadow-md'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            [ AIR OUT ]
          </button>
        </div>
      </div>

      {/* Active Node Subheader Indicator */}
      <div className="mb-6 flex items-center justify-between text-xs font-bold text-slate-600 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isOut ? 'bg-[#008F72] animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
          <span>Active View Array: {isOut ? 'OUTLET (Post-Purification)' : 'INLET (Ambient Air Intake)'}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Last updated: {lastUpdatedTime}</span>
        </div>
      </div>

      {/* EXACT 6 SENSOR CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        
        {/* CARD 1 — AIR QUALITY SENSOR (Sensirion SPS30 x2) */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-6 flex flex-col justify-between transition-all hover:shadow-md hover:border-emerald-900/20 relative overflow-hidden group">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ECFAF4] text-[#008F72]">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#08233F] tracking-wide">
                  Air Quality Sensor
                </h3>
                <span className="text-xs text-slate-500 font-bold block">
                  Sensirion SPS30 &times;2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#ECFAF4] text-[#008F72] border border-[#008F72]/30">
                PARTICULATE ARRAY
              </span>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-[#008F72]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F72] animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>
          </div>

          {/* PM Measurements Grid inside Card 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
            {/* PM1.0 */}
            <div className="p-3.5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#08233F] block">PM1.0</span>
                <span className="text-[10px] text-slate-400 font-semibold">Ultra-fine particles</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="text-right">
                  <span className="text-[9px] text-amber-600 font-black block uppercase">AIR IN</span>
                  <span className="text-slate-800 font-extrabold">{inletPm1} µg/m³</span>
                </div>
                <div className="text-right pl-2.5 border-l border-slate-200">
                  <span className="text-[9px] text-[#008F72] font-black block uppercase">AIR OUT</span>
                  <span className="text-[#008F72] font-black">{outletPm1} µg/m³</span>
                </div>
              </div>
            </div>

            {/* PM2.5 */}
            <div className="p-3.5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#08233F] block">PM2.5</span>
                <span className="text-[10px] text-slate-400 font-semibold">Fine particles</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="text-right">
                  <span className="text-[9px] text-amber-600 font-black block uppercase">AIR IN</span>
                  <span className="text-slate-800 font-extrabold">{inletPm25} µg/m³</span>
                </div>
                <div className="text-right pl-2.5 border-l border-slate-200">
                  <span className="text-[9px] text-[#008F72] font-black block uppercase">AIR OUT</span>
                  <span className="text-[#008F72] font-black">{outletPm25} µg/m³</span>
                </div>
              </div>
            </div>

            {/* PM4.0 */}
            <div className="p-3.5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#08233F] block">PM4.0</span>
                <span className="text-[10px] text-slate-400 font-semibold">Respirable dust</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="text-right">
                  <span className="text-[9px] text-amber-600 font-black block uppercase">AIR IN</span>
                  <span className="text-slate-800 font-extrabold">{inletPm4} µg/m³</span>
                </div>
                <div className="text-right pl-2.5 border-l border-slate-200">
                  <span className="text-[9px] text-[#008F72] font-black block uppercase">AIR OUT</span>
                  <span className="text-[#008F72] font-black">{outletPm4} µg/m³</span>
                </div>
              </div>
            </div>

            {/* PM10 */}
            <div className="p-3.5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#08233F] block">PM10</span>
                <span className="text-[10px] text-slate-400 font-semibold">Coarse dust &amp; smog</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="text-right">
                  <span className="text-[9px] text-amber-600 font-black block uppercase">AIR IN</span>
                  <span className="text-slate-800 font-extrabold">{inletPm10} µg/m³</span>
                </div>
                <div className="text-right pl-2.5 border-l border-slate-200">
                  <span className="text-[9px] text-[#008F72] font-black block uppercase">AIR OUT</span>
                  <span className="text-[#008F72] font-black">{outletPm10} µg/m³</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer inside Card 1 */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Dual SPS30 Sensor Architecture (Inlet + Outlet)</span>
            <span className="text-[#008F72] font-black">72% Avg Particulate Removal</span>
          </div>
        </div>

        {/* CARDS 2 THROUGH 6 */}
        {singleCards.map((card) => {
          const Icon = card.icon

          return (
            <div
              key={card.id}
              className="bg-white rounded-3xl border border-emerald-900/10 shadow-xs p-5 sm:p-6 flex flex-col justify-between transition-all hover:shadow-md hover:border-emerald-900/20 group relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ backgroundColor: card.accentBg, color: card.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#08233F] tracking-wide">
                      {card.title}
                    </h3>
                    <span className="text-xs text-slate-500 font-bold block">
                      {card.secondary}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-[#008F72]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008F72] animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Value & Unit */}
              <div className="my-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-[#08233F] font-display tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs font-extrabold text-slate-400">
                    {card.unit}
                  </span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: card.statusColor }}
                  />
                  <span
                    className="font-extrabold text-xs"
                    style={{ color: card.statusColor }}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 text-[11px] font-bold text-slate-500">
                    {card.trendUp ? (
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-sky-600" />
                    )}
                    <span>{card.trend}</span>
                  </div>

                  <svg className="w-12 h-5 text-slate-300" viewBox="0 0 50 20" fill="none">
                    <path
                      d="M 0 15 Q 12 5 25 12 T 50 8"
                      stroke={card.accent}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )
        })}

      </div>

      {/* SENSOR CONNECTIVITY FOOTER STATUS BAR */}
      <div className="bg-white rounded-2xl border border-emerald-900/10 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#08233F]">
          <Cpu className="w-4 h-4 text-[#008F72]" />
          <span>Sensor Hardware Connectivity Telemetry:</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-slate-600">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-[#008F72]">
            <span className="w-2 h-2 rounded-full bg-[#008F72]" />
            <span>SPS30 #1 — Air IN — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-[#008F72]">
            <span className="w-2 h-2 rounded-full bg-[#008F72]" />
            <span>SPS30 #2 — Air OUT — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-[#008F72]">
            <span className="w-2 h-2 rounded-full bg-[#008F72]" />
            <span>CO-B4 — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-[#008F72]">
            <span className="w-2 h-2 rounded-full bg-[#008F72]" />
            <span>OX-B431 — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF8FD] border border-[#0799D8]/20 text-[#0799D8]">
            <span className="w-2 h-2 rounded-full bg-[#0799D8]" />
            <span>SHT35 — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF8FD] border border-[#0799D8]/20 text-[#0799D8]">
            <span className="w-2 h-2 rounded-full bg-[#0799D8]" />
            <span>DS18B20 — Connected</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F9E8] border border-[#69BE16]/30 text-[#69BE16]">
            <span className="w-2 h-2 rounded-full bg-[#69BE16]" />
            <span>DFRobot — Connected</span>
          </div>
        </div>
      </div>

      {/* Helper Disclaimer */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
        <Info className="w-4 h-4 text-[#008F72] shrink-0" />
        <span>Demo data &bull; Simulated sensors for hackathon prototype.</span>
      </div>

    </section>
  )
}
