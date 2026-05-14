import { RefreshCw, ChevronDown } from 'lucide-react'

interface HeaderProps {
  restaurant: 'ishtaa' | 'aaha'
  onSwitch: (r: 'ishtaa' | 'aaha') => void
}

const restaurants = {
  ishtaa: { name: 'Ishtaa – Veg Restaurant', handle: '@ishtaa_veg', logo: '🌿', color: '#f97316' },
  aaha: { name: 'Amaha', handle: '@amaha', logo: '🌾', color: '#ea580c' },
}

export default function Header({ restaurant, onSwitch }: HeaderProps) {
  const now = new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })

  return (
    <header style={{ background: 'linear-gradient(180deg, #1a0d03 0%, #0c0700 100%)', borderBottom: '1px solid rgba(249,115,22,0.18)' }}
      className="sticky top-0 z-50 px-6 py-3 flex items-center justify-between gap-4">

      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f97316, #b45309)' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: 18, lineHeight: 1, fontFamily: 'sans-serif' }}>W</span>
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight" style={{ color: '#fbbf24' }}>Wishly<span style={{ color: '#f97316' }}>AI</span></div>
            <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: '#b45309' }}>Managed Services</div>
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: 'rgba(249,115,22,0.2)' }} />

        {/* AI badge */}
        <div className="badge" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', border: '1px solid rgba(249,115,22,0.25)' }}>
          <div className="ai-dot" />
          AI Agentic
        </div>
        <div className="badge" style={{ background: 'rgba(251,191,36,0.08)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
          🔴 LIVE
        </div>
      </div>

      {/* Restaurant Switcher */}
      <div className="flex items-center gap-2">
        {(['ishtaa', 'aaha'] as const).map(id => {
          const item = restaurants[id]
          const active = restaurant === id
          return (
            <button key={id} onClick={() => onSwitch(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={active ? {
                background: 'linear-gradient(135deg, rgba(249,115,22,0.25), rgba(180,83,9,0.2))',
                border: '1px solid rgba(249,115,22,0.4)',
                color: '#fbbf24',
                boxShadow: '0 0 16px rgba(249,115,22,0.15)'
              } : {
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(249,115,22,0.12)',
                color: '#a16207',
              }}>
              <span className="text-base">{item.logo}</span>
              <div className="text-left">
                <div className="font-semibold leading-none text-xs">{item.name}</div>
                <div className="text-[10px] opacity-60 mt-0.5">{item.handle}</div>
              </div>
              {active && <ChevronDown size={12} />}
            </button>
          )
        })}
      </div>

      {/* Live info */}
      <div className="flex items-center gap-3 text-xs" style={{ color: '#78350f' }}>
        <div className="flex items-center gap-1.5">
          <RefreshCw size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
          <span>Updated {now}</span>
        </div>
        <div className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
          ✓ All Systems Active
        </div>
      </div>
    </header>
  )
}
