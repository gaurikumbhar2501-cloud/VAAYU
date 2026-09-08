import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SidebarNav from './components/SidebarNav'
import DashboardIntro from './components/DashboardIntro'
import HeroSection from './components/HeroSection'
import AirFlowSection from './components/AirFlowSection'
import LiveSensorsSection from './components/LiveSensorsSection'
import FiltrationSection from './components/FiltrationSection'
import AiIntelligenceSection from './components/AiIntelligenceSection'
import SystemHealthSection from './components/SystemHealthSection'
import HistoricalPerformanceSection from './components/HistoricalPerformanceSection'
import ImpactSection from './components/ImpactSection'
import AboutSection from './components/AboutSection'
import AQICard from './components/AQICard'
import MetricCard from './components/MetricCard'
import { Wind, Layers, Thermometer, Droplets, Zap } from 'lucide-react'

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Live simulated sensor state
  const [liveMetrics, setLiveMetrics] = useState({
    aqiInlet: 168,
    aqiOutlet: 42,
    inletPm1: 45,
    outletPm1: 11,
    inletPm25: 86,
    outletPm25: 24,
    inletPm4: 112,
    outletPm4: 38,
    inletPm10: 142,
    outletPm10: 48,
    coInlet: 1.8,
    coOutlet: 1.1,
    o3Inlet: 62,
    o3Outlet: 39,
    temp: 28.4,
    humidity: 58,
    moisture: 54,
    lastUpdated: 'Just now'
  })

  // Full-page view switcher
  const navigateTo = (id) => {
    setActiveSection(id)
    setIsNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Live simulation timer (updates every 3 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveMetrics((prev) => {
        const deltaPm25 = (Math.random() - 0.5) * 2
        const nextInletPm25 = Math.round(Math.max(80, Math.min(92, prev.inletPm25 + deltaPm25)))
        const nextOutletPm25 = Math.round(nextInletPm25 * (1 - 0.72))

        const deltaPm10 = (Math.random() - 0.5) * 3
        const nextInletPm10 = Math.round(Math.max(134, Math.min(150, prev.inletPm10 + deltaPm10)))
        const nextOutletPm10 = Math.round(nextInletPm10 * (1 - 0.66))

        const deltaCo = (Math.random() - 0.5) * 0.1
        const nextInletCo = parseFloat(Math.max(1.5, Math.min(2.1, prev.coInlet + deltaCo)).toFixed(1))
        const nextOutletCo = parseFloat((nextInletCo * (1 - 0.39)).toFixed(1))

        const deltaO3 = (Math.random() - 0.5) * 2
        const nextInletO3 = Math.round(Math.max(57, Math.min(67, prev.o3Inlet + deltaO3)))
        const nextOutletO3 = Math.round(nextInletO3 * (1 - 0.37))

        const deltaTemp = (Math.random() - 0.5) * 0.2
        const nextTemp = parseFloat(Math.max(28.0, Math.min(28.8, prev.temp + deltaTemp)).toFixed(1))

        const deltaHum = (Math.random() - 0.5) * 2
        const nextHum = Math.round(Math.max(55, Math.min(62, prev.humidity + deltaHum)))

        const deltaMoisture = (Math.random() - 0.5) * 1
        const nextMoisture = Math.round(Math.max(50, Math.min(58, prev.moisture + deltaMoisture)))

        const now = new Date()
        const timeStr = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })

        return {
          ...prev,
          inletPm25: nextInletPm25,
          outletPm25: nextOutletPm25,
          inletPm10: nextInletPm10,
          outletPm10: nextOutletPm10,
          coInlet: nextInletCo,
          coOutlet: nextOutletCo,
          o3Inlet: nextInletO3,
          o3Outlet: nextOutletO3,
          aqiInlet: Math.round(nextInletPm25 * 2 + 2),
          aqiOutlet: Math.round(nextOutletPm25 * 1.7 + 2),
          temp: nextTemp,
          humidity: nextHum,
          moisture: nextMoisture,
          lastUpdated: timeStr
        }
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7FCFB] text-[#08233F] flex flex-col justify-between selection:bg-[#008F72] selection:text-white relative">
      {/* 1. Header Navigation */}
      <Header
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
        activeSection={activeSection}
        scrollTo={navigateTo}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
      />

      {/* 2. Slide-out Navigation Drawer */}
      <SidebarNav
        activeSection={activeSection}
        scrollTo={navigateTo}
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
      />

      {/* 3. FULL-PAGE DASHBOARD VIEW CONTAINER */}
      <main className="flex-1 min-h-[calc(100vh-6rem)]">
        {/* Floating Demo Mode Active Indicator Banner */}
        {isDemoMode && (
          <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white rounded-2xl p-4 shadow-2xl border border-red-400 flex items-center gap-4 animate-bounce">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <div>
                <div className="text-xs font-black uppercase tracking-wider">DEMO POLLUTION SURGE ACTIVE</div>
                <div className="text-[11px] text-red-100 font-medium">Inlet PM2.5: 120 µg/m³ &rarr; Outlet: 32 µg/m³ (73% Reduced)</div>
              </div>
            </div>
            <button
              onClick={() => setIsDemoMode(false)}
              className="bg-white text-red-700 hover:bg-red-50 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              Disable
            </button>
          </div>
        )}

        {/* View Transition Wrapper */}
        <div key={activeSection} className="transition-all duration-300 ease-out">
          
          {/* VIEW 1: HOME / OVERVIEW */}
          {activeSection === 'hero' && (
            <div className="pb-12">
              <HeroSection
                isDemoMode={isDemoMode}
                setIsDemoMode={setIsDemoMode}
                scrollTo={navigateTo}
              />
              <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-emerald-900/5">
                <DashboardIntro />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-5">
                    <AQICard
                      aqi={isDemoMode ? 185 : liveMetrics.aqiInlet}
                      lastUpdated={liveMetrics.lastUpdated}
                    />
                  </div>
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MetricCard
                      icon={Wind}
                      sensorTitle="AIR QUALITY SENSOR"
                      hardwareName="Sensirion SPS30 ×2"
                      measurementLabel="PM2.5 • INLET"
                      value={isDemoMode ? 120 : liveMetrics.inletPm25}
                      unit="µg/m³"
                      status={isDemoMode ? "Surge" : "Moderate"}
                      statusType={isDemoMode ? "moderate" : "moderate"}
                      accentColor="#0799D8"
                      accentBg="#EEF8FD"
                    />
                    <MetricCard
                      icon={Layers}
                      sensorTitle="AIR QUALITY SENSOR"
                      hardwareName="Sensirion SPS30 ×2"
                      measurementLabel="PM10 • INLET"
                      value={isDemoMode ? 210 : liveMetrics.inletPm10}
                      unit="µg/m³"
                      status={isDemoMode ? "Surge" : "Moderate"}
                      statusType={isDemoMode ? "moderate" : "moderate"}
                      accentColor="#008F72"
                      accentBg="#ECFAF4"
                    />
                    <MetricCard
                      icon={Thermometer}
                      name="Temperature"
                      value={liveMetrics.temp}
                      unit="°C"
                      status="Normal"
                      statusType="normal"
                      accentColor="#69BE16"
                      accentBg="#F1F9E8"
                    />
                    <MetricCard
                      icon={Droplets}
                      name="Humidity"
                      value={liveMetrics.humidity}
                      unit="%"
                      status="Normal"
                      statusType="normal"
                      accentColor="#0799D8"
                      accentBg="#EEF8FD"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* VIEW 2: AIR FLOW */}
          {activeSection === 'flow' && (
            <div className="pb-4">
              <AirFlowSection
                isDemoMode={isDemoMode}
                liveMetrics={liveMetrics}
              />
            </div>
          )}

          {/* VIEW 3: LIVE SENSORS */}
          {activeSection === 'sensors' && (
            <div className="pb-4">
              <LiveSensorsSection
                isDemoMode={isDemoMode}
                liveMetrics={liveMetrics}
              />
            </div>
          )}

          {/* VIEW 4: 7-STAGE CORE */}
          {activeSection === 'filtration' && (
            <div className="pb-4">
              <FiltrationSection />
            </div>
          )}

          {/* VIEW 5: AI FORECAST */}
          {activeSection === 'ai' && (
            <div className="pb-4">
              <AiIntelligenceSection />
            </div>
          )}

          {/* VIEW 6: ANALYTICS & SYSTEM PERFORMANCE */}
          {activeSection === 'history' && (
            <div className="space-y-6 pb-4">
              <HistoricalPerformanceSection isDemoMode={isDemoMode} liveMetrics={liveMetrics} />
              <SystemHealthSection />
            </div>
          )}

          {/* VIEW 7: IMPACT */}
          {activeSection === 'impact' && (
            <div className="pb-4">
              <ImpactSection />
            </div>
          )}

          {/* VIEW 8: ABOUT */}
          {activeSection === 'about' && (
            <div className="pb-4">
              <AboutSection scrollTo={navigateTo} />
            </div>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-emerald-900/10 pt-12 pb-8 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/70">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-[#08233F] font-display">VAAYU</span>
              <span className="text-xs text-slate-500 block">&bull; Smart Outdoor Air Purification System</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
              <button onClick={() => navigateTo('hero')} className={`transition-colors ${activeSection === 'hero' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>Home</button>
              <button onClick={() => navigateTo('flow')} className={`transition-colors ${activeSection === 'flow' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>Air Flow</button>
              <button onClick={() => navigateTo('sensors')} className={`transition-colors ${activeSection === 'sensors' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>Sensors</button>
              <button onClick={() => navigateTo('filtration')} className={`transition-colors ${activeSection === 'filtration' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>7-Stage Core</button>
              <button onClick={() => navigateTo('ai')} className={`transition-colors ${activeSection === 'ai' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>AI Forecast</button>
              <button onClick={() => navigateTo('history')} className={`transition-colors ${activeSection === 'history' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>Analytics</button>
              <button onClick={() => navigateTo('impact')} className={`transition-colors ${activeSection === 'impact' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>Impact</button>
              <button onClick={() => navigateTo('about')} className={`transition-colors ${activeSection === 'about' ? 'text-[#008F72] font-extrabold' : 'hover:text-[#008F72]'}`}>About</button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="text-center sm:text-left max-w-xl">
              VAAYU is an outdoor ambient air purification platform. Dual SPS30 sensor nodes monitor particulate matter and gaseous removal before and after filtration.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <span>Hackathon Prototype Edition</span>
              <span>&bull;</span>
              <span>&copy; {new Date().getFullYear()} VAAYU Systems</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
