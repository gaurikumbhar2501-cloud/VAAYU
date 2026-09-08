import React from 'react'
import vaayuLogoAsset from '../assets/vaayu-logo.jpg.png'

export default function VaayuLogo({ className = "w-9 h-9" }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden shrink-0 ${className}`}>
      <img 
        src={vaayuLogoAsset} 
        alt="VAAYU Logo" 
        className="w-full h-full object-contain mix-blend-multiply scale-110 transition-transform"
      />
    </div>
  )
}
