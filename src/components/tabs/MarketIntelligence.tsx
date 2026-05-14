import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import { TrendingUp, AlertCircle } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { ishtaaData, aahaData } from '../../data/mockData'

interface Props { restaurant: RestaurantId }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip">
      <p className="font-bold mb-1" style={{ color: '#fbbf24' }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color || '#f97316' }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  )
}

export default function MarketIntelligence({ restaurant }: Props) {
  const data = restaurant === 'ishtaa' ? ishtaaData : aahaData
  const mkt = data.marketSentiment

  return (
    <div className="space-y-4 animate-in">
      {/* Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(180,83,9,0.06))', borderColor: 'rgba(249,115,22,0.3)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="section-label mb-1">Market Intelligence Module</div>
            <h2 className="text-lg font-bold text-gradient">{mkt.space}</h2>
            <p className="text-xs mt-1" style={{ color: '#a16207' }}>Real-time market demand signals, trend tracking and share analysis in your exact food category</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="badge" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
              <div className="ai-dot" /> Live Market Tracking
            </div>
            <div className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>Hyderabad Region</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Demand Trend */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Category Demand Index</div>
          <div className="text-xs mb-3" style={{ color: '#a16207' }}>Normalized demand score (Dec '25 – May '26)</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mkt.demandCurve}>
              <defs>
                <linearGradient id="demand-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" />
              <XAxis dataKey="month" tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[40, 100]} tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="demand" name="Demand Index" stroke="#f97316" fill="url(#demand-grad)" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-2 mt-2 p-2 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <TrendingUp size={14} style={{ color: '#10b981' }} />
            <span className="text-xs" style={{ color: '#a7f3d0' }}>
              Demand up <strong>+{mkt.demandCurve[mkt.demandCurve.length - 1].demand - mkt.demandCurve[0].demand} pts</strong> since December — {restaurant === 'ishtaa' ? 'veg dining boom' : 'breakfast demand surge'}
            </span>
          </div>
        </div>

        {/* Market Share Donut */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Competitor Distribution</div>
          <div className="text-xs mb-2" style={{ color: '#a16207' }}>Estimated follower + engagement share across key players</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={mkt.marketShare} cx="50%" cy="50%" innerRadius={42} outerRadius={64} paddingAngle={3} dataKey="share">
                  {mkt.marketShare.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1f1408', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {mkt.marketShare.map(s => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span style={{ color: s.name === data.name.split('–')[0].trim() || s.name === 'Aaha' || s.name === 'Ishtaa' ? '#fbbf24' : '#a16207' }}>{s.name}</span>
                  </div>
                  <strong style={{ color: s.color }}>{s.share}%</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 p-2 rounded-lg text-xs" style={{ background: 'rgba(249,115,22,0.06)', color: '#d97706' }}>
            <strong style={{ color: '#f97316' }}>Opportunity:</strong> {restaurant === 'ishtaa' ? '86% mindshare uncaptured — with our content strategy, Ishtaa can realistically target 22% by Q3.' : '92% mindshare uncaptured — Aaha is in prime position to dominate the Manikonda breakfast space with consistent digital presence.'}
          </div>
        </div>
      </div>

      {/* Search Trends */}
      <div className="card">
        <div className="font-bold text-sm mb-3" style={{ color: '#fef3c7' }}>Hyderabad Search Trend Signals</div>
        <div className="space-y-3">
          {mkt.trending.map((t, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-xs font-medium flex-1" style={{ color: '#fef3c7' }}>{t.term}</span>
              <div className="flex items-center gap-2 w-48">
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(249,115,22,0.12)' }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, t.change * 2)}%`, background: `linear-gradient(90deg, ${i % 2 === 0 ? '#f97316' : '#b45309'}, ${i % 2 === 0 ? '#fbbf24' : '#f97316'})` }} />
                </div>
                <span className="font-bold text-xs w-12 text-right" style={{ color: '#10b981' }}>↑{t.change}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Dish Demand */}
        <div className="card">
          <div className="font-bold text-sm mb-1" style={{ color: '#fef3c7' }}>Dish-Level Demand Index</div>
          <div className="text-xs mb-3" style={{ color: '#a16207' }}>What customers are craving right now in your category</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mkt.topDishDemand} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: '#78350f', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis dataKey="dish" type="category" tick={{ fill: '#a16207', fontSize: 10 }} tickLine={false} axisLine={false} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="index" name="Demand Index" radius={[0, 4, 4, 0]}>
                {mkt.topDishDemand.map((_, i) => <Cell key={i} fill={i < 2 ? '#f97316' : i < 4 ? '#b45309' : '#92400e'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="card">
          <div className="font-bold text-sm mb-3" style={{ color: '#fef3c7' }}>AI Market Insights</div>
          <div className="space-y-3">
            {mkt.insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.08)' }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(249,115,22,0.2)', fontSize: 10, color: '#f97316', fontWeight: 'bold' }}>{i + 1}</div>
                <p className="text-xs leading-relaxed" style={{ color: '#d97706' }}>{insight}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={12} style={{ color: '#fbbf24' }} />
              <span className="font-bold text-xs" style={{ color: '#fbbf24' }}>Strategic Window</span>
            </div>
            <p className="text-xs" style={{ color: '#a16207' }}>
              {restaurant === 'ishtaa' ? 'Veg dining market in Hyderabad is at an inflection point. The next 90 days are critical for Ishtaa to establish digital dominance before well-funded competitors scale.' : 'The Manikonda breakfast market is under-digitised. First mover advantage on Instagram Reels could give Aaha 3–5x growth in next 60 days.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
