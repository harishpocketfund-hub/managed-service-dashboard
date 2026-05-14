import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Zap, Calendar, Target, DollarSign, Lightbulb, Flame, Clock } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { aiRecommendations } from '../../data/mockData'

interface Props { restaurant: RestaurantId }

export default function AIRecommendations({ restaurant }: Props) {
  const recs = aiRecommendations[restaurant]
  const roi = recs.roiProjection

  const calendarData = recs.contentCalendar.map(c => ({
    name: c.date.split('(')[0].trim(),
    score: c.viralityScore,
    type: c.type,
  }))

  return (
    <div className="space-y-4 animate-in">
      {/* AI Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(180,83,9,0.1), rgba(146,64,14,0.08))', borderColor: 'rgba(249,115,22,0.4)', boxShadow: '0 0 40px rgba(249,115,22,0.08)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f97316, #b45309)' }}>
            <Zap size={20} className="text-white" fill="white" />
          </div>
          <div>
            <div className="font-bold text-base" style={{ color: '#fbbf24' }}>Wishly AI Engine — Active Recommendations</div>
            <div className="text-xs" style={{ color: '#a16207' }}>Trained on 2.4M+ restaurant posts • Hyderabad market data • Real-time trend signals</div>
          </div>
          <div className="ml-auto flex gap-2">
            <div className="badge" style={{ background: 'rgba(249,115,22,0.2)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
              <div className="ai-dot" /> Processing Live
            </div>
            <div className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
              ✓ {recs.contentCalendar.length} actions ready
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mt-3">
          {[
            { label: 'Current Monthly Reach', val: roi.currentMonthlyReach.toLocaleString(), icon: '📊', color: '#a16207' },
            { label: 'Projected Reach', val: roi.projectedReach.toLocaleString(), icon: '🚀', color: '#f97316' },
            { label: 'Engagement Lift', val: roi.engagementLift, icon: '📈', color: '#10b981' },
            { label: 'Time to Results', val: roi.timeToResults, icon: '⏱️', color: '#fbbf24' },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-bold text-base" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#78350f' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} style={{ color: '#f97316' }} />
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>AI Content Calendar — Next 30 Days</div>
          <div className="badge ml-auto" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', fontSize: 10 }}>Festival-Optimized</div>
        </div>

        {/* Virality Bar */}
        <div className="mb-4">
          <div className="section-label mb-2">Virality Potential Score by Date</div>
          <ResponsiveContainer width="100%" height={90}>
            <BarChart data={calendarData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(249,115,22,0.08)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#78350f', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#78350f', fontSize: 9 }} tickLine={false} axisLine={false} width={24} />
              <Tooltip formatter={(v: any) => [`${v}/100`, 'Virality Score']} contentStyle={{ background: '#1f1408', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {calendarData.map((entry, i) => (
                  <Cell key={i} fill={entry.score >= 90 ? '#f97316' : entry.score >= 80 ? '#b45309' : '#92400e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Calendar Cards */}
        <div className="space-y-3">
          {recs.contentCalendar.map((item, i) => (
            <div key={i} className={`p-4 rounded-xl ${item.viralityScore >= 90 ? 'virality-high' : 'virality-med'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>{item.title}</span>
                    <span className="badge" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', fontSize: 9 }}>{item.type}</span>
                    <span className="badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: 9 }}>🎉 {item.festival}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: '#a16207' }}>
                    <Clock size={11} />
                    <span className="font-semibold" style={{ color: item.date.includes('Today') ? '#f97316' : '#fbbf24' }}>{item.date}</span>
                  </div>
                  <div className="p-2.5 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(0,0,0,0.15)', color: '#d97706', fontStyle: 'italic' }}>
                    "{item.caption}"
                  </div>
                  <div className="mt-2 text-[10px]" style={{ color: '#78350f' }}>
                    Suggested hashtags: <span style={{ color: '#b45309' }}>{item.hashtags}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="text-[10px] mb-1" style={{ color: '#78350f' }}>Virality</div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: item.viralityScore >= 90 ? '#10b981' : '#f97316', background: 'rgba(0,0,0,0.2)' }}>
                    <div>
                      <div className="font-black text-lg leading-none" style={{ color: item.viralityScore >= 90 ? '#10b981' : '#fbbf24' }}>{item.viralityScore}</div>
                      <div className="text-[8px]" style={{ color: '#78350f' }}>/100</div>
                    </div>
                  </div>
                  {item.viralityScore >= 90 && <div className="text-[10px] mt-1" style={{ color: '#10b981' }}>🔥 Hot</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Virality Alerts */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={16} style={{ color: '#ef4444' }} />
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Virality Opportunity Alerts</div>
          <div className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>Real-time</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {recs.viralityAlerts.map((alert, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.12)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs" style={{ color: '#fbbf24' }}>{alert.trigger}</span>
                <span className="badge" style={{
                  background: alert.potential === 'Very High' ? 'rgba(239,68,68,0.15)' : 'rgba(249,115,22,0.12)',
                  color: alert.potential === 'Very High' ? '#f87171' : '#f97316',
                  fontSize: 9
                }}>{alert.potential}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#a16207', fontStyle: 'italic' }}>"{alert.idea}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Gap Analysis */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} style={{ color: '#8b5cf6' }} />
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Content Gap Analysis</div>
          <div className="badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#8b5cf6', fontSize: 10 }}>vs Top Competitors</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {recs.contentGaps.map((gap, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.12)' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#8b5cf6' }} />
                <span className="font-semibold text-xs" style={{ color: '#c4b5fd' }}>Gap: {gap.gap}</span>
              </div>
              <p className="text-[10px] mb-2" style={{ color: '#a16207' }}>📊 {gap.opportunity}</p>
              <div className="flex items-start gap-1.5">
                <Lightbulb size={10} style={{ color: '#fbbf24', flexShrink: 0, marginTop: 1 }} />
                <p className="text-[10px] font-medium" style={{ color: '#fbbf24' }}>{gap.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI Projection */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.04))', borderColor: 'rgba(16,185,129,0.2)' }}>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={16} style={{ color: '#10b981' }} />
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Projected Business Impact</div>
          <div className="badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 10 }}>60-day projection</div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {[
            { label: 'Reach Increase', val: `${(roi.projectedReach - roi.currentMonthlyReach).toLocaleString()}`, sub: 'additional monthly reach', icon: '📡' },
            { label: 'Engagement Lift', val: roi.engagementLift, sub: 'vs current baseline', icon: '📈' },
            { label: 'New Customers', val: roi.estimatedNewCustomers, sub: 'estimated per month', icon: '👥' },
            { label: 'Revenue Impact', val: roi.revenueImpact, sub: 'additional monthly', icon: '💰' },
            { label: 'Implementation', val: roi.timeToResults, sub: 'to see results', icon: '⏰' },
          ].map(s => (
            <div key={s.label} className="p-3 rounded-xl text-center" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-bold text-sm" style={{ color: '#10b981' }}>{s.val}</div>
              <div className="text-[9px] mt-1" style={{ color: '#6ee7b7' }}>{s.label}</div>
              <div className="text-[9px]" style={{ color: '#78350f' }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: 'rgba(16,185,129,0.04)', color: '#6ee7b7' }}>
          <strong style={{ color: '#10b981' }}>How we calculated this:</strong> Based on comparable restaurant accounts in Hyderabad that implemented Wishly AI managed service — median results over 8 weeks. Your projected figures are conservative estimates at the 40th percentile of outcomes.
        </div>
      </div>
    </div>
  )
}
