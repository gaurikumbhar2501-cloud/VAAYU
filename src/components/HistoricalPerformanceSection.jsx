import React, { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import { BarChart3, Radio, ArrowRight, ShieldCheck, Info, Sparkles, Activity, Cpu } from 'lucide-react'

export default function HistoricalPerformanceSection({ isDemoMode, liveMetrics }) {
  const sensorCategories = [
    {
      id: 'air_quality',
      title: 'AIR QUALITY SENSOR',
      hardware: 'Sensirion SPS30 ×2',
      params: ['PM1.0', 'PM2.5', 'PM4.0', 'PM10'],
      defaultParam: 'PM2.5'
    },
    {
      id: 'co',
      title: 'CO GAS SENSOR',
      hardware: 'Alphasense CO-B4',
      params: ['CO'],
      defaultParam: 'CO'
    },
    {
      id: 'o3_nox',
      title: 'O₃ / NOx SENSOR',
      hardware: 'OX-B431',
      params: ['O₃ / NOx'],
      defaultParam: 'O₃ / NOx'
    },
    {
      id: 'humidity',
      title: 'HUMIDITY SENSOR',
      hardware: 'SHT35',
      params: ['Humidity'],
      defaultParam: 'Humidity'
    },
    {
      id: 'temperature',
      title: 'TEMPERATURE SENSOR',
      hardware: 'DS18B20',
      params: ['Temperature'],
      defaultParam: 'Temperature'
    },
    {
      id: 'moisture',
      title: 'MOISTURE SENSOR',
      hardware: 'DFRobot',
      params: ['Moisture'],
      defaultParam: 'Moisture'
    }
  ]

  const [activeCategory, setActiveCategory] = useState('air_quality')
  const [selectedParam, setSelectedParam] = useState('PM2.5')

  const currentCatObj = sensorCategories.find((c) => c.id === activeCategory) || sensorCategories[0]

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.id)
    if (!cat.params.includes(selectedParam)) {
      setSelectedParam(cat.defaultParam)
    }
  }

  // Multi-sensor baseline data mapping
  const pollutantData = {
    'PM1.0': {
      sensorName: 'AIR QUALITY SENSOR',
      hardware: 'Sensirion SPS30 ×2',
      inlet: isDemoMode ? 62 : (liveMetrics?.inletPm1 || 45),
      outlet: isDemoMode ? 14 : (liveMetrics?.outletPm1 || 11),
      unit: 'µg/m³'
    },
    'PM2.5': {
      sensorName: 'AIR QUALITY SENSOR',
      hardware: 'Sensirion SPS30 ×2',
      inlet: isDemoMode ? 120 : (liveMetrics?.inletPm25 || 86),
      outlet: isDemoMode ? 32 : (liveMetrics?.outletPm25 || 24),
      unit: 'µg/m³'
    },
    'PM4.0': {
      sensorName: 'AIR QUALITY SENSOR',
      hardware: 'Sensirion SPS30 ×2',
      inlet: isDemoMode ? 165 : (liveMetrics?.inletPm4 || 112),
      outlet: isDemoMode ? 44 : (liveMetrics?.outletPm4 || 38),
      unit: 'µg/m³'
    },
    'PM10': {
      sensorName: 'AIR QUALITY SENSOR',
      hardware: 'Sensirion SPS30 ×2',
      inlet: isDemoMode ? 210 : (liveMetrics?.inletPm10 || 142),
      outlet: isDemoMode ? 68 : (liveMetrics?.outletPm10 || 48),
      unit: 'µg/m³'
    },
    'CO': {
      sensorName: 'CO GAS SENSOR',
      hardware: 'Alphasense CO-B4',
      inlet: isDemoMode ? 3.8 : (liveMetrics?.coInlet || 1.8),
      outlet: isDemoMode ? 1.4 : (liveMetrics?.coOutlet || 1.1),
      unit: 'ppm'
    },
    'O₃ / NOx': {
      sensorName: 'O₃ / NOx SENSOR',
      hardware: 'OX-B431',
      inlet: isDemoMode ? 115 : (liveMetrics?.o3Inlet || 62),
      outlet: isDemoMode ? 42 : (liveMetrics?.o3Outlet || 39),
      unit: 'ppb'
    },
    'Temperature': {
      sensorName: 'TEMPERATURE SENSOR',
      hardware: 'DS18B20',
      inlet: isDemoMode ? 34.5 : (liveMetrics?.temp ? parseFloat((liveMetrics.temp + 3.2).toFixed(1)) : 32.0),
      outlet: isDemoMode ? 27.8 : (liveMetrics?.temp ? parseFloat(liveMetrics.temp.toFixed(1)) : 26.5),
      unit: '°C'
    },
    'Humidity': {
      sensorName: 'HUMIDITY SENSOR',
      hardware: 'SHT35',
      inlet: isDemoMode ? 68 : (liveMetrics?.humidity ? liveMetrics.humidity + 12 : 62),
      outlet: isDemoMode ? 48 : (liveMetrics?.humidity || 45),
      unit: '%'
    },
    'Moisture': {
      sensorName: 'MOISTURE SENSOR',
      hardware: 'DFRobot',
      inlet: isDemoMode ? 54 : (liveMetrics?.moisture ? liveMetrics.moisture + 10 : 50),
      outlet: isDemoMode ? 38 : (liveMetrics?.moisture || 35),
      unit: '%'
    }
  }

  const activeData = pollutantData[selectedParam] || pollutantData['PM2.5']
  const inletVal = activeData.inlet
  const outletVal = activeData.outlet
  const unit = activeData.unit
  const reductionPct = Math.max(0, Math.round(((inletVal - outletVal) / inletVal) * 100))

  // 7-Point simulated chart timeline (10:00 to 10:30 at 5-minute intervals)
  const timeLabels = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30']

  const chartData = timeLabels.map((time, idx) => {
    const jitterInlet = [0, 3, 6, 4, 2, 5, 4][idx]
    const jitterOutlet = [0, 1, -1, 1, -1, 0, 0][idx]

    const inletValP = Math.round((inletVal + jitterInlet) * 10) / 10
    const outletValP = Math.round((outletVal + jitterOutlet) * 10) / 10

    return {
      time,
      Inlet: inletValP,
      Outlet: outletValP
    }
  })

  // Data for the 6 core physical sensor category summary cards
  const pmItems = ['PM1.0', 'PM2.5', 'PM4.0', 'PM10'].map((p) => {
    const item = pollutantData[p]
    const red = Math.round(((item.inlet - item.outlet) / item.inlet) * 100)
    return { param: p, inlet: item.inlet, outlet: item.outlet, unit: item.unit, reduction: Math.max(0, red) }
  })
  const avgPmRed = Math.round(pmItems.reduce((acc, i) => acc + i.reduction, 0) / pmItems.length)

  const otherCategoryCards = [
    { catId: 'co', paramKey: 'CO' },
    { catId: 'o3_nox', paramKey: 'O₃ / NOx' },
    { catId: 'humidity', paramKey: 'Humidity' },
    { catId: 'temperature', paramKey: 'Temperature' },
    { catId: 'moisture', paramKey: 'Moisture' }
  ].map(({ catId, paramKey }) => {
    const cat = sensorCategories.find((c) => c.id === catId)
    const item = pollutantData[paramKey]
    const red = Math.max(0, Math.round(((item.inlet - item.outlet) / item.inlet) * 100))
    return {
      id: catId,
      title: cat.title,
      hardware: cat.hardware,
      paramKey,
      inlet: item.inlet,
      outlet: item.outlet,
      unit: item.unit,
      reduction: red
    }
  })

  return (
    <section id="history" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
      {/* 2. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFAF4] border border-[#008F72]/30 text-xs font-extrabold uppercase tracking-wider text-[#008F72] mb-3">
          <Radio className="w-3.5 h-3.5 text-[#008F72] animate-pulse" />
          <span>PHYSICAL SENSOR ANALYTICS</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#08233F] tracking-tight mb-3 font-display">
          Measure the difference.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
          Compare real-time physical sensor telemetry before and after air passes through VAAYU.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFAF4] border border-[#008F72]/20 text-xs font-extrabold text-[#008F72]">
            <span className="h-2 w-2 rounded-full bg-[#008F72] animate-pulse" />
            <span>LIVE SIMULATION</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Demo data &bull; 6 Core Physical Sensors
          </span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="bg-white rounded-3xl border border-emerald-900/10 shadow-xl p-6 sm:p-8">
        
        {/* 4. SENSOR CATEGORY SELECTOR */}
        <div className="pb-6 mb-6 border-b border-slate-100 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#008F72]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#08233F]">
                Select Physical Sensor Category:
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              6 Core Hardware Nodes
            </span>
          </div>

          {/* 6 Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {sensorCategories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isActive
                      ? 'bg-[#008F72] text-white border-[#008F72] shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] font-black uppercase tracking-tight leading-tight mb-0.5">
                    {cat.title}
                  </div>
                  <div className={`text-[10px] font-semibold truncate ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {cat.hardware}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Exposed Sub-parameters for AIR QUALITY SENSOR */}
          {activeCategory === 'air_quality' && (
            <div className="flex items-center gap-2 pt-2 px-3.5 py-2.5 bg-[#ECFAF4] rounded-2xl border border-[#008F72]/20">
              <span className="text-xs font-extrabold text-[#008F72] shrink-0">
                Air Quality Measurements:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {['PM1.0', 'PM2.5', 'PM4.0', 'PM10'].map((p) => (
                  <button
                    key={p}
                    onClick={() => { setSelectedParam(p); setActiveCategory('air_quality') }}
                    className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
                      selectedParam === p
                        ? 'bg-[#008F72] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SENSOR HARDWARE METADATA BANNER */}
        <div className="mb-6 p-4 rounded-2xl bg-[#ECFAF4]/70 border border-[#008F72]/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#008F72] block mb-0.5">
              ACTIVE SENSOR CATEGORY
            </span>
            <div className="text-lg font-black text-[#08233F] font-display flex items-center gap-2">
              <span>{currentCatObj.title}</span>
              <span className="text-xs font-extrabold text-[#008F72] bg-white px-2 py-0.5 rounded-md border border-[#008F72]/20">
                {selectedParam}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-xs">
            <Cpu className="w-4 h-4 text-[#008F72]" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-0.5">
                HARDWARE MODEL
              </span>
              <span className="text-xs font-black text-[#08233F] block leading-none">
                {currentCatObj.hardware}
              </span>
            </div>
          </div>
        </div>

        {/* 5. LIVE INLET / OUTLET CARDS & DYNAMIC REDUCTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* AIR IN CARD */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-center">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
              AIR IN
            </span>
            <div className="text-3xl font-black text-amber-600 font-display">
              {inletVal} <span className="text-xs font-normal text-slate-500">{unit}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-semibold block mt-1">
              {activeData.hardware.includes('SPS30') ? 'Sensirion SPS30 #1 → Air IN' : `${activeData.hardware} • Ambient Intake`}
            </span>
          </div>

          {/* AIR OUT CARD */}
          <div className="p-5 rounded-2xl bg-[#ECFAF4] border border-emerald-200/80 text-center">
            <span className="text-xs font-extrabold text-[#008F72] uppercase tracking-wider block mb-1">
              AIR OUT
            </span>
            <div className="text-3xl font-black text-[#008F72] font-display">
              {outletVal} <span className="text-xs font-normal text-slate-500">{unit}</span>
            </div>
            <span className="text-[10px] text-[#008F72] font-semibold block mt-1">
              {activeData.hardware.includes('SPS30') ? 'Sensirion SPS30 #2 → Air OUT' : `${activeData.hardware} • Purified Output`}
            </span>
          </div>

          {/* DYNAMIC REDUCTION CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#008F72] to-teal-800 text-white text-center shadow-md flex flex-col justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-200 block">
              {selectedParam} REDUCTION
            </span>
            <div className="text-4xl font-black font-display text-white my-1">
              {reductionPct}%
            </div>
            <span className="text-[10px] font-bold text-emerald-100 bg-white/10 px-2.5 py-0.5 rounded-full inline-block border border-white/20 mx-auto">
              Inlet &rarr; Outlet
            </span>
          </div>
        </div>

        {/* 6. HORIZONTAL ANIMATED REDUCTION BAR */}
        <div className="p-5 rounded-2xl bg-[#F7FCFB] border border-slate-200/80 mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>AIR IN: {inletVal} {unit}</span>
            <span className="text-[#008F72] font-black text-sm">{reductionPct}% LOWER</span>
            <span>AIR OUT: {outletVal} {unit}</span>
          </div>

          {/* Animated Bar Graphic */}
          <div className="w-full h-3 bg-amber-200/80 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#0799D8] to-[#008F72] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${100 - reductionPct}%` }}
            />
          </div>
        </div>

        {/* 3. MAIN RECHARTS PERFORMANCE CHART */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#08233F]">
                Live {selectedParam} Concentration Trend (Inlet vs Outlet)
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                {activeData.hardware}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              Timeline: 10:00 – 10:30
            </span>
          </div>

          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="inletG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outletG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008F72" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#008F72" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#08233F',
                    borderColor: '#008F72',
                    borderRadius: '16px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  dataKey="Inlet"
                  name={activeData.hardware.includes('SPS30') ? 'Air IN (Sensirion SPS30 #1)' : `Air IN (${activeData.hardware})`}
                  stroke="#F59E0B"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#inletG)"
                />
                <Area
                  type="monotone"
                  dataKey="Outlet"
                  name={activeData.hardware.includes('SPS30') ? 'Air OUT (Sensirion SPS30 #2)' : `Air OUT (${activeData.hardware})`}
                  stroke="#008F72"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#outletG)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7. THE 6 CORE PHYSICAL SENSOR CATEGORIES SUMMARY GRID */}
        <div className="pt-6 border-t border-slate-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#08233F]">
              6 Physical Sensor Categories Telemetry Summary
            </h3>
            <span className="text-[11px] font-semibold text-slate-400">
              Click any category card to focus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CARD 1 — AIR QUALITY SENSOR (Sensirion SPS30 x2) */}
            <div
              onClick={() => { setActiveCategory('air_quality'); if (!['PM1.0','PM2.5','PM4.0','PM10'].includes(selectedParam)) setSelectedParam('PM2.5') }}
              className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeCategory === 'air_quality'
                  ? 'bg-[#ECFAF4] border-[#008F72] shadow-sm'
                  : 'bg-[#F7FCFB] border-slate-200/80 hover:border-emerald-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-black text-[#08233F]">AIR QUALITY SENSOR</span>
                  <span className="text-[#008F72] font-black text-xs">{avgPmRed}% AVG</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mb-3">
                  Sensirion SPS30 ×2
                </div>

                {/* 4 PM Measurements inside Air Quality Sensor */}
                <div className="space-y-1.5 bg-white/80 p-2.5 rounded-xl border border-emerald-900/10">
                  {pmItems.map((pm) => (
                    <div
                      key={pm.param}
                      onClick={(e) => { e.stopPropagation(); setActiveCategory('air_quality'); setSelectedParam(pm.param) }}
                      className={`flex items-center justify-between text-xs px-2.5 py-1 rounded-lg transition-all ${
                        selectedParam === pm.param ? 'bg-[#008F72] text-white font-extrabold' : 'hover:bg-emerald-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="font-bold">{pm.param}</span>
                      <div className="flex items-center gap-2">
                        <span className={selectedParam === pm.param ? 'text-white' : 'text-slate-900 font-extrabold'}>
                          {pm.inlet} &rarr; {pm.outlet} <span className="text-[10px] font-normal opacity-80">{pm.unit}</span>
                        </span>
                        <span className={`text-[10px] font-black ${selectedParam === pm.param ? 'text-emerald-200' : 'text-[#008F72]'}`}>
                          {pm.reduction}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#0799D8] to-[#008F72] rounded-full transition-all duration-700"
                  style={{ width: `${avgPmRed}%` }}
                />
              </div>
            </div>

            {/* CARDS 2 TO 6 — OTHER 5 SENSOR CATEGORIES */}
            {otherCategoryCards.map((card) => (
              <div
                key={card.id}
                onClick={() => { setActiveCategory(card.id); setSelectedParam(card.paramKey) }}
                className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeCategory === card.id
                    ? 'bg-[#ECFAF4] border-[#008F72] shadow-sm'
                    : 'bg-[#F7FCFB] border-slate-200/80 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-black text-[#08233F]">{card.title}</span>
                    <span className="text-[#008F72] font-black text-xs">{card.reduction}%</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mb-3">
                    {card.hardware}
                  </div>

                  <div className="bg-white/80 p-3 rounded-xl border border-emerald-900/10">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">{card.paramKey} Measurement</div>
                    <div className="text-sm font-black text-slate-900">
                      {card.inlet} &rarr; {card.outlet} <span className="text-xs font-normal text-slate-500">{card.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0799D8] to-[#008F72] rounded-full transition-all duration-700"
                    style={{ width: `${card.reduction}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 9. EXPLANATION & HIGHLIGHTED STATEMENT */}
        <div className="text-center max-w-2xl mx-auto space-y-2 pt-2">
          <p className="text-xs text-slate-600 font-medium">
            VAAYU compares air quality at the inlet and outlet using hardware sensor pairs to make performance visible.
          </p>
          <p className="text-base sm:text-lg font-black text-[#08233F] font-display">
            &ldquo;Don&apos;t just trust the purifier. See the difference.&rdquo;
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <Info className="w-4 h-4 text-[#0799D8]" />
          <span>Demo data &bull; 6 Core Physical Sensors</span>
        </div>
      </div>
    </section>
  )
}


