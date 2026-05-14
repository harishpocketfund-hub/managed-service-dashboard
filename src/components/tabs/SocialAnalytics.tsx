import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import { TrendingUp, TrendingDown, Users, Heart, MessageCircle, Eye, Zap, AlertTriangle, Camera, ExternalLink } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { ishtaaData, aahaData, ownLatestPosts } from '../../data/mockData'
import InstagramEmbed from '../InstagramEmbed'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm']

interface Props { restaurant: RestaurantId }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <p className="font-bold mb-1" style={{ color: '#fbbf24' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export default function SocialAnalytics({ restaurant }: Props) {
  const data = restaurant === 'ishtaa' ? ishtaaData : aahaData
  const m = data.metrics
  const engData = data.engagement.filter((_, i) => i % 3 === 0)

  const sentimentData = [
    { name: 'Positive', value: data.sentiment.positive, color: '#10b981' },
    { name: 'Neutral', value: data.sentiment.neutral, color: '#f97316' },
    { name: 'Negative', value: data.sentiment.negative, color: '#ef4444' },
  ]

  const metricCards = [
    { label: 'Total Followers', value: m.followers.toLocaleString(), change: `+${m.followerGrowth}%`, up: true, icon: Users, color: '#f97316' },
    { label: 'Engagement Rate', value: `${m.engagementRate}%`, change: 'Industry avg: 2.1%', up: true, icon: TrendingUp, color: '#10b981' },
    { label: 'Avg Reach / Post', value: m.avgReach.toLocaleString(), change: `+${m.reachGrowth}%`, up: true, icon: Eye, color: '#8b5cf6' },
    { label: 'Avg Likes', value: m.avgLikes.toLocaleString(), change: '+12.4%', up: true, icon: Heart, color: '#ec4899' },
    { label: 'Avg Comments', value: m.avgComments.toLocaleString(), change: '+8.2%', up: true, icon: MessageCircle, color: '#06b6d4' },
    { label: 'Reel Skip Rate', value: `${m.skipRate}%`, change: m.skipRate > 40 ? 'High — needs fix' : 'Acceptable', up: m.skipRate <= 38, icon: Zap, color: m.skipRate > 40 ? '#ef4444' : '#fbbf24' },
  ]

  // heatmap max for normalization
  const heatMax = Math.max(...data.postingHeatmap.flat())

  return (
    <div className="space-y-4 animate-in">
      {/* KPI Row */}
      <div className="grid grid-cols-6 gap-3">
        {metricCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="card">
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} style={{ color: card.color }} />
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1"
                  style={{ background: card.up ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: card.up ? '#10b981' : '#ef4444' }}>
                  {card.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />} {card.change}
                </span>
              </div>
              <div className="metric-val" style={{ color: card.color }}>{card.value}</div>
              <div className="text-[10px] mt-1 font-medium" style={{ color: '#78350f' }}>{card.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Engagement Chart */}
        <div className="card col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Engagement Timeline</div>
              <div className="text-xs" style={{ color: '#a16207' }}>Last 30 days — Likes, Comments & Reach</div>
            </div>
            <div className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Live</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={engData}>
              <defs>
                <linearGradient id="likes-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="comments-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" />
              <XAxis dataKey="date" tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="likes" name="Likes" stroke="#f97316" fill="url(#likes-grad)" strokeWidth={2} />
              <Area type="monotone" dataKey="comments" name="Comments" stroke="#06b6d4" fill="url(#comments-grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Donut */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Comment Sentiment</div>
          <div className="text-xs mb-3" style={{ color: '#a16207' }}>AI-analyzed last 500 comments</div>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                {sentimentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1f1408', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5">
            {sentimentData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span style={{ color: '#a16207' }}>{s.name}</span>
                </div>
                <strong style={{ color: s.color }}>{s.value}%</strong>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(249,115,22,0.1)' }}>
            <div className="section-label mb-1.5">Top Positive Words</div>
            <div className="flex flex-wrap gap-1">
              {data.sentiment.topPositive.slice(0, 4).map(w => (
                <span key={w} className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: 9 }}>{w}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Content Type Performance */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Content Type Performance</div>
          <div className="text-xs mb-3" style={{ color: '#a16207' }}>Avg engagement by format</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data.contentPerformance} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" />
              <XAxis dataKey="type" tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgLikes" name="Avg Likes" radius={[4, 4, 0, 0]}>
                {data.contentPerformance.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {data.contentPerformance.map(c => (
              <div key={c.type} className="flex items-center justify-between text-xs p-2 rounded-lg" style={{ background: 'rgba(249,115,22,0.04)' }}>
                <span style={{ color: '#a16207' }}>{c.type}</span>
                <span className="font-bold" style={{ color: c.color }}>{c.posts} posts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posting Time Heatmap */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Best Posting Times</div>
          <div className="text-xs mb-3" style={{ color: '#a16207' }}>Engagement heatmap by day & hour</div>
          <div className="overflow-x-auto">
            <table className="w-full text-[9px]" style={{ borderCollapse: 'separate', borderSpacing: 2 }}>
              <thead>
                <tr>
                  <td style={{ color: '#78350f', width: 28 }}></td>
                  {HOURS.map(h => <td key={h} className="text-center pb-1" style={{ color: '#78350f', width: 32 }}>{h}</td>)}
                </tr>
              </thead>
              <tbody>
                {DAYS.map((day, di) => (
                  <tr key={day}>
                    <td className="pr-1 font-medium" style={{ color: '#a16207' }}>{day}</td>
                    {data.postingHeatmap[di].map((val, hi) => {
                      const intensity = val / heatMax
                      return (
                        <td key={hi} className="heat-cell" style={{
                          background: `rgba(249,115,22,${0.05 + intensity * 0.75})`,
                          height: 18, borderRadius: 3, textAlign: 'center', color: intensity > 0.6 ? '#fef3c7' : '#78350f'
                        }}>{val > heatMax * 0.7 ? '🔥' : ''}</td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-2 text-[10px]" style={{ color: '#78350f' }}>
            <span>Low</span>
            <div className="flex gap-1">
              {[0.1, 0.25, 0.5, 0.75, 1].map(v => (
                <div key={v} className="w-4 h-3 rounded-sm" style={{ background: `rgba(249,115,22,${v})` }} />
              ))}
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Lacking / Priority Actions */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} style={{ color: '#fbbf24' }} />
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>What's Lacking — AI Priority Actions</div>
          <div className="badge ml-auto" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}>
            <div className="ai-dot" /> AI Identified
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {data.lacking.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.08)' }}>
              <span className={`badge flex-shrink-0 ${item.severity === 'high' ? 'sev-high' : item.severity === 'medium' ? 'sev-medium' : 'sev-low'}`} style={{ fontSize: 9 }}>
                {item.severity.toUpperCase()}
              </span>
              <div>
                <div className="font-semibold text-xs mb-0.5" style={{ color: '#fef3c7' }}>{item.issue}</div>
                <div className="text-[10px]" style={{ color: '#a16207' }}>Impact: {item.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Profile Visits (30d)', val: m.profileVisits.toLocaleString(), icon: '👁️' },
          { label: 'Website Clicks (30d)', val: m.websiteClicks.toLocaleString(), icon: '🔗' },
          { label: 'Stories Avg Views', val: m.storiesViews.toLocaleString(), icon: '📖' },
          { label: 'Avg Shares / Post', val: m.avgShares.toLocaleString(), icon: '🔄' },
        ].map(s => (
          <div key={s.label} className="card p-3 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="font-bold text-lg" style={{ color: '#fbbf24' }}>{s.val}</div>
            <div className="text-[10px] mt-0.5" style={{ color: '#78350f' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Own Latest Posts */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
            <Camera size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>
              Latest Posts from {data.handle}
            </div>
            <div className="text-[10px]" style={{ color: '#8a5a0a' }}>
              Real-time from your Instagram profile
            </div>
          </div>
          <a href={`https://www.instagram.com/${data.handle.replace('@', '')}/`}
            target="_blank" rel="noopener noreferrer"
            className="btn-wishly ml-auto text-xs">
            <ExternalLink size={11} /> Open Profile
          </a>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {ownLatestPosts[restaurant].map((url, i) => (
            <div key={i} style={{ zoom: 0.5, width: 600, height: 720, overflow: 'hidden', flexShrink: 0, borderRadius: 4 }}>
              <InstagramEmbed url={url} handle={data.handle} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
