import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { TrendingUp, Users, Heart, Lightbulb, AlertTriangle, CheckCircle, ExternalLink, Clock, Calendar, Zap } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { ishtaaData, aahaData } from '../../data/mockData'
import InstagramEmbed from '../InstagramEmbed'

interface Props { restaurant: RestaurantId }

const COMP_COLORS = ['#e85d1a', '#b34a0a', '#8b3a08']

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <p className="font-bold mb-1" style={{ color: '#f0b429' }}>{label}</p>
      {payload.map((p: any) => <p key={p.name} style={{ color: p.color || '#e85d1a' }}>{p.name}: <strong>{p.value?.toLocaleString()}</strong></p>)}
    </div>
  )
}

function lastPostLabel(h: number) {
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}
function urgencyColor(h: number) {
  if (h <= 12) return '#10b981'
  if (h <= 36) return '#f0b429'
  return '#ef4444'
}

export default function CompetitiveIntel({ restaurant }: Props) {
  const data = restaurant === 'ishtaa' ? ishtaaData : aahaData
  const [activeComp, setActiveComp] = useState(0)
  const comp = data.competitors[activeComp] as any
  const own = data.metrics

  const compareData = [
    { metric: 'Followers', own: own.followers, comp: comp.followers },
    { metric: 'Avg Likes', own: own.avgLikes, comp: comp.avgLikes },
    { metric: 'Avg Comments', own: own.avgComments, comp: comp.avgComments },
    { metric: 'Posts/Week', own: 3, comp: comp.postsPerWeek },
  ]

  const radarData = [
    { subject: 'Engagement', A: own.engagementRate, B: comp.engagement, fullMark: 10 },
    { subject: 'Frequency', A: 3, B: comp.postsPerWeek, fullMark: 10 },
    { subject: 'Reach', A: 6, B: Math.min(9, comp.postsPerWeek * 1.2), fullMark: 10 },
    { subject: 'Growth', A: own.followerGrowth, B: comp.growth, fullMark: 25 },
    { subject: 'Comments', A: own.avgComments, B: comp.avgComments, fullMark: 100 },
    { subject: 'Shares', A: own.avgShares, B: Math.round(comp.avgLikes * 0.3), fullMark: 100 },
  ]

  return (
    <div className="space-y-4 animate-in">
      {/* Competitor selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="section-label">Select Competitor:</span>
        <div className="flex gap-2">
          {data.competitors.map((c: any, i: number) => (
            <button key={c.handle} onClick={() => setActiveComp(i)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={activeComp === i ? {
                background: 'linear-gradient(135deg, rgba(232,93,26,0.22), rgba(179,74,10,0.16))',
                border: '1px solid rgba(232,93,26,0.45)', color: '#f0b429',
                boxShadow: '0 0 14px rgba(232,93,26,0.14)'
              } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(232,93,26,0.1)', color: '#8a5a0a' }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
                style={{ background: COMP_COLORS[i], color: 'white' }}>{i + 1}</span>
              <div className="text-left">
                <div className="leading-none">{c.name}</div>
                <div className="text-[10px] opacity-60 mt-0.5">{c.handle}</div>
              </div>
              {/* Last post freshness dot */}
              <div className="w-2 h-2 rounded-full ml-1" style={{ background: urgencyColor(c.lastPostHoursAgo) }} title={`Last post: ${lastPostLabel(c.lastPostHoursAgo)}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Competitor header card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.08), rgba(179,74,10,0.05))', borderColor: 'rgba(232,93,26,0.25)' }}>
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {/* Instagram-style gradient border avatar */}
              <div className="ig-gradient-border p-0.5 rounded-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: 'var(--card2)' }}>📸</div>
              </div>
              <div>
                <div className="font-bold text-base" style={{ color: '#fef3c7' }}>{comp.name}</div>
                <a href={comp.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs hover:opacity-80 transition-opacity"
                  style={{ color: '#e85d1a' }}>
                  <ExternalLink size={10} />
                  {comp.handle}
                </a>
              </div>
              <a href={comp.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-wishly ml-2">
                <ExternalLink size={12} /> View on Instagram
              </a>
            </div>
            <p className="text-sm" style={{ color: '#c8790a' }}>
              Top content style: <strong style={{ color: '#f0b429' }}>{comp.topContent}</strong>
            </p>
          </div>

          {/* Last post + stats */}
          <div className="flex items-start gap-6 flex-wrap">
            {/* Last Post info */}
            <div className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${urgencyColor(comp.lastPostHoursAgo)}30`, minWidth: 140 }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={11} style={{ color: urgencyColor(comp.lastPostHoursAgo) }} />
                <span className="section-label" style={{ color: urgencyColor(comp.lastPostHoursAgo) }}>Last Post</span>
              </div>
              <div className="font-black text-xl" style={{ color: urgencyColor(comp.lastPostHoursAgo) }}>
                {lastPostLabel(comp.lastPostHoursAgo)}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: '#8a5a0a' }}>
                {comp.lastPostHoursAgo <= 12 ? '🔥 Very active' : comp.lastPostHoursAgo <= 36 ? '🟡 Moderate' : '🔴 Slow'}
              </div>
              <div className="text-[10px] mt-2" style={{ color: '#8a5a0a' }}>
                Avg frequency: <strong style={{ color: '#f0b429' }}>{comp.avgPostInterval}</strong>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: 'Followers', val: comp.followers.toLocaleString(), icon: Users, color: '#e85d1a' },
                { label: 'Engagement', val: `${comp.engagement}%`, icon: Heart, color: '#10b981' },
                { label: 'Posts/Week', val: comp.postsPerWeek, icon: Calendar, color: '#06b6d4' },
                { label: 'Growth', val: `+${comp.growth}%`, icon: TrendingUp, color: '#f0b429' },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label}>
                    <Icon size={13} style={{ color: s.color, margin: '0 auto 4px' }} />
                    <div className="font-black text-base" style={{ color: s.color }}>{s.val}</div>
                    <div className="text-[10px]" style={{ color: '#8a5a0a' }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Head to Head Bar */}
        <div className="card col-span-2">
          <div className="font-bold text-sm mb-3" style={{ color: '#fef3c7' }}>
            Head-to-Head: {data.handle} vs {comp.handle}
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={compareData} barGap={6} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(232,93,26,0.08)" />
              <XAxis dataKey="metric" tick={{ fill: '#8a5a0a', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#8a5a0a', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="own" name={data.handle} fill="#e85d1a" radius={[4,4,0,0]} />
              <Bar dataKey="comp" name={comp.handle} fill="#5a3008" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-2 text-xs justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#e85d1a' }} /><span style={{ color: '#c8790a' }}>{data.handle}</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#5a3008' }} /><span style={{ color: '#c8790a' }}>{comp.handle}</span></div>
          </div>
        </div>

        {/* Radar */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Multi-Dimensional</div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(232,93,26,0.15)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#c8790a', fontSize: 9 }} />
              <Radar name={data.handle} dataKey="A" stroke="#e85d1a" fill="#e85d1a" fillOpacity={0.22} />
              <Radar name={comp.handle} dataKey="B" stroke="#b34a0a" fill="#b34a0a" fillOpacity={0.18} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-1 text-xs justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#e85d1a' }} /><span style={{ color: '#c8790a' }}>You</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#b34a0a' }} /><span style={{ color: '#c8790a' }}>Competitor</span></div>
          </div>
        </div>
      </div>

      {/* Latest Post from Competitor — Real Instagram Embed */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <div className="ig-gradient-border p-0.5 rounded-full">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ background: 'var(--card2)' }}>📸</div>
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Latest Posts from {comp.name}</div>
            <div className="text-[10px]" style={{ color: '#8a5a0a' }}>
              {comp.handle} • Last post <strong style={{ color: urgencyColor(comp.lastPostHoursAgo) }}>{lastPostLabel(comp.lastPostHoursAgo)}</strong> • Avg: {comp.avgPostInterval}
            </div>
          </div>
          <a href={comp.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="btn-wishly ml-auto text-xs">
            <ExternalLink size={11} /> Open Profile
          </a>
        </div>

        {(() => {
          const urls: string[] = (comp as any).latestPostUrls ?? []
          const items = urls.length > 0 ? urls : ['']
          return (
            <div style={{ display: 'flex', gap: 12 }}>
              {items.map((url, i) => (
                <div key={i} style={{ zoom: 0.5, width: 600, height: 720, overflow: 'hidden', flexShrink: 0, borderRadius: 4 }}>
                  <InstagramEmbed url={url} handle={comp.handle} index={i} />
                </div>
              ))}
            </div>
          )
        })()}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Analysis */}
        <div className="card">
          <div className="font-bold text-sm mb-3" style={{ color: '#fef3c7' }}>Competitive Analysis</div>
          <div className="mb-3">
            <div className="section-label mb-2" style={{ color: '#10b981' }}>Their Strengths</div>
            <div className="space-y-1.5">
              {comp.strengths.map((s: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <CheckCircle size={11} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ color: '#c8790a' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-label mb-2" style={{ color: '#ef4444' }}>Their Weaknesses</div>
            <div className="space-y-1.5">
              {comp.weaknesses.map((w: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <AlertTriangle size={11} style={{ color: '#f0b429', flexShrink: 0 }} />
                  <span style={{ color: '#c8790a' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to adapt */}
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.07), rgba(179,74,10,0.04))', borderColor: 'rgba(232,93,26,0.22)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={15} style={{ color: '#f0b429' }} />
            <div className="font-bold text-sm" style={{ color: '#f0b429' }}>What to Adapt from {comp.name}</div>
            <div className="badge ml-auto" style={{ background: 'rgba(232,93,26,0.15)', color: '#e85d1a' }}>
              <div className="ai-dot" /> AI
            </div>
          </div>
          <div className="space-y-3">
            {comp.strengths.slice(0, 3).map((item: string, i: number) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(232,93,26,0.06)', border: '1px solid rgba(232,93,26,0.12)' }}>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#e85d1a', fontSize: 10, color: 'white', fontWeight: 900 }}>{i+1}</div>
                  <div>
                    <div className="font-semibold text-xs mb-0.5" style={{ color: '#fef3c7' }}>Adopt: {item}</div>
                    <p className="text-[10px]" style={{ color: '#c8790a' }}>
                      {i === 0 ? `Estimated engagement uplift: +${Math.round(comp.engagement * 8)}%` :
                       i === 1 ? `Reach impact: +${Math.round(comp.avgLikes / own.avgLikes * 80)}% per post` :
                       'Builds long-term brand trust and repeat visits'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-lg text-xs" style={{ background: 'rgba(240,180,41,0.06)', color: '#b34a0a' }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={11} style={{ color: '#f0b429' }} />
              <strong style={{ color: '#f0b429' }}>Counter-play opportunity:</strong>
            </div>
            {comp.weaknesses[0]} — this is their blind spot. Double down here while they're weak.
          </div>
        </div>
      </div>
    </div>
  )
}
