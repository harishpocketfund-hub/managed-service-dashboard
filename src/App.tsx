import { useState } from 'react'
import Header from './components/Header'
import IntelligenceHub from './components/tabs/IntelligenceHub'
import SocialAnalytics from './components/tabs/SocialAnalytics'
import MarketIntelligence from './components/tabs/MarketIntelligence'
import CompetitiveIntel from './components/tabs/CompetitiveIntel'
import AIRecommendations from './components/tabs/AIRecommendations'
import ViralVideos from './components/tabs/ViralVideos'
import InstagramAudit from './components/tabs/InstagramAudit'
import { Brain, BarChart2, Globe, Swords, Zap, PlayCircle, ClipboardList } from 'lucide-react'
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
  const [restaurant, setRestaurant] = useState<RestaurantId>('ishtaa')
  const [activeTab, setActiveTab] = useState('ai')

  return (
    <div style={{ minHeight: '100vh', background: '#0c0806' }}>
      <Header restaurant={restaurant} onSwitch={setRestaurant} />

      {/* Tab Bar */}
      <div style={{ background: '#110a05', borderBottom: '1px solid rgba(232,93,26,0.14)', position: 'sticky', top: 56, zIndex: 40 }}>
        <div className="flex items-center px-6 gap-0.5">
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
