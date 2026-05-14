import { useState, useRef } from 'react'
import Header from './components/Header'
import IntelligenceHub from './components/tabs/IntelligenceHub'
import SocialAnalytics from './components/tabs/SocialAnalytics'
import MarketIntelligence from './components/tabs/MarketIntelligence'
import CompetitiveIntel from './components/tabs/CompetitiveIntel'
import AIRecommendations from './components/tabs/AIRecommendations'
import ViralVideos from './components/tabs/ViralVideos'
import InstagramAudit from './components/tabs/InstagramAudit'
import { Brain, BarChart2, Globe, Swords, Zap, PlayCircle, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react'
import type { RestaurantId } from './data/mockData'

const tabs = [
  { id: 'ai', label: 'AI Recommendations', icon: Zap, badge: 'NEW' },
  { id: 'analytics', label: 'Social Analytics', icon: BarChart2, badge: null },
  { id: 'audit', label: 'Instagram Audit', icon: ClipboardList, badge: 'RPT' },
  { id: 'market', label: 'Market Intelligence', icon: Globe, badge: null },
  { id: 'competitive', label: 'Competitive Intel', icon: Swords, badge: null },
  { id: 'viral', label: 'Viral Videos', icon: PlayCircle, badge: '🔥' },
  { id: 'intelligence', label: 'Intelligence Hub', icon: Brain, badge: 'LIVE' },
]

export default function App() {
  const [restaurant, setRestaurant] = useState<RestaurantId>('just_biryani')
  const [activeTab, setActiveTab] = useState('ai')
  const tabScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollTabs = (dir: 'left' | 'right') => {
    const el = tabScrollRef.current
    if (el) el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  const [scrollPercent, setScrollPercent] = useState(0)
  const [thumbWidth, setThumbWidth] = useState(30)

  const onTabScroll = () => {
    const el = tabScrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    const maxScroll = el.scrollWidth - el.clientWidth
    setScrollPercent(maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0)
    setThumbWidth(Math.max(15, (el.clientWidth / el.scrollWidth) * 100))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0c0806' }}>
      <Header restaurant={restaurant} onSwitch={setRestaurant} />

      {/* Tab Bar */}
      <div style={{ background: '#110a05', borderBottom: '1px solid rgba(232,93,26,0.14)', position: 'sticky', top: 56, zIndex: 40 }} className="relative flex items-center">
        {/* Left fade + arrow */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center" style={{ pointerEvents: 'none' }}>
            <div style={{ width: 48, background: 'linear-gradient(to right, #110a05 40%, transparent)', height: '100%' }} />
          </div>
        )}
        {canScrollLeft && (
          <button onClick={() => scrollTabs('left')}
            className="absolute left-0 top-0 bottom-0 z-20 flex items-center justify-center w-8"
            style={{ color: '#e85d1a' }}>
            <ChevronLeft size={16} />
          </button>
        )}

        <div ref={tabScrollRef} onScroll={onTabScroll} className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide w-full px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all duration-150 border-b-2 relative whitespace-nowrap"
                style={isActive
                  ? { borderColor: '#e85d1a', color: '#f0b429' }
                  : { borderColor: 'transparent', color: '#8a5a0a' }}>
                <Icon size={14} />
                {tab.label}
                {tab.badge && typeof tab.badge === 'string' && tab.badge.length <= 4 && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full"
                    style={{ background: tab.badge === 'LIVE' ? '#ef4444' : '#e85d1a', color: 'white', letterSpacing: '0.05em' }}>
                    {tab.badge}
                  </span>
                )}
                {tab.badge === '🔥' && <span style={{ fontSize: 14 }}>🔥</span>}
                {isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#e85d1a', bottom: -1 }} />
                )}
              </button>
            )
          })}
        </div>

        {/* Right fade + arrow — always visible when there's more to scroll */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 z-10 flex items-center" style={{ pointerEvents: 'none' }}>
            <div style={{ width: 64, background: 'linear-gradient(to left, #110a05 50%, transparent)', height: '100%' }} />
          </div>
        )}
        {canScrollRight && (
          <button onClick={() => scrollTabs('right')}
            className="absolute right-0 top-0 bottom-0 z-20 flex items-center justify-center w-10 gap-0.5"
            style={{ color: '#f97316' }}>
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Tab scroll indicator */}
      <div style={{ background: '#110a05', height: 3, paddingInline: '1.5rem' }}>
        <div style={{ position: 'relative', height: '100%', borderRadius: 99, overflow: 'hidden', background: 'rgba(232,93,26,0.1)' }}>
          <div style={{
            position: 'absolute', top: 0, height: '100%', borderRadius: 99,
            width: `${thumbWidth}%`,
            left: `${scrollPercent * (1 - thumbWidth / 100)}%`,
            background: 'linear-gradient(90deg, #e85d1a, #f97316)',
            transition: 'left 0.1s ease',
          }} />
        </div>
      </div>

      {/* Page Content */}
      <div className="px-6 py-5" style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div key={`${restaurant}-${activeTab}`} className="animate-in">
          {activeTab === 'intelligence' && <IntelligenceHub restaurant={restaurant} />}
          {activeTab === 'analytics' && <SocialAnalytics restaurant={restaurant} />}
          {activeTab === 'audit' && <InstagramAudit restaurant={restaurant} />}
          {activeTab === 'market' && <MarketIntelligence restaurant={restaurant} />}
          {activeTab === 'competitive' && <CompetitiveIntel restaurant={restaurant} />}
          {activeTab === 'ai' && <AIRecommendations restaurant={restaurant} />}
          {activeTab === 'viral' && <ViralVideos restaurant={restaurant} />}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs" style={{ color: '#5a3a08', borderTop: '1px solid rgba(232,93,26,0.07)' }}>
        WishlyAI Managed Services Dashboard • AI-Agentic • Data signals updated live • May 2026
      </div>
    </div>
  )
}
