import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Zap, Calendar, Target, DollarSign, Lightbulb, Flame, Clock, AlertTriangle, Palette, FileText, CheckSquare, ArrowRight } from 'lucide-react'
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

      {/* ─── WishlyAI PLAN SECTION (only for accounts with wishlyPlan) ────── */}
      {(recs as any).wishlyPlan && (() => {
        const plan = (recs as any).wishlyPlan
        return (
          <div className="space-y-4">
            {/* Plan header */}
            <div className="flex items-center gap-3 px-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                <FileText size={16} className="text-white" />
              </div>
              <div>
                <div className="font-black text-base tracking-tight" style={{ color: '#c4b5fd' }}>WishlyAI Launch Plan — {plan.phaseLabel}</div>
                <div className="text-xs" style={{ color: '#6d28d9' }}>What we do first. Why we do it. In order.</div>
              </div>
              <div className="ml-auto badge" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)', fontSize: 10 }}>
                Phase 1
              </div>
            </div>

            {/* CRITICAL ALERT — Google Temporarily Closed */}
            <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.06))', border: '2px solid rgba(239,68,68,0.5)' }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)' }}>
                  <AlertTriangle size={20} style={{ color: '#f87171' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-black text-sm" style={{ color: '#fca5a5' }}>CRITICAL ACTION: {plan.criticalAlert.issue}</span>
                    <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', fontSize: 9 }}>DO THIS NOW</span>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: '#fca5a5', opacity: 0.85 }}>{plan.criticalAlert.consequence}</p>
                  <div className="flex items-start gap-2 p-2.5 rounded-lg mb-2" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <ArrowRight size={12} style={{ color: '#f87171', flexShrink: 0, marginTop: 1 }} />
                    <span className="text-xs font-semibold" style={{ color: '#fbbf24' }}>{plan.criticalAlert.action}</span>
                  </div>
                  <div className="badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontSize: 10 }}>
                    ✓ Estimated impact: {plan.criticalAlert.estimatedImpact}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Redesign + Brand Palette */}
            <div className="grid grid-cols-2 gap-4">
              {/* Bio Redesign */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={14} style={{ color: '#f97316' }} />
                  <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>Bio Redesign</span>
                  <span className="badge ml-auto" style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171', fontSize: 9 }}>Before → After</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <div className="text-[9px] font-black mb-1.5 tracking-widest uppercase" style={{ color: '#ef4444' }}>Current (broken)</div>
                    <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>{plan.bioRedo.current}</p>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight size={14} style={{ color: '#f97316' }} />
                  </div>
                  <div className="p-2.5 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)' }}>
                    <div className="text-[9px] font-black mb-1.5 tracking-widest uppercase" style={{ color: '#10b981' }}>WishlyAI Proposed</div>
                    <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: '#6ee7b7' }}>{plan.bioRedo.proposed}</p>
                  </div>
                </div>
                <p className="text-[10px] mt-2 leading-relaxed" style={{ color: '#78350f' }}>💡 {plan.bioRedo.why}</p>
              </div>

              {/* Brand Palette */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Palette size={14} style={{ color: '#f97316' }} />
                  <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>Brand Palette</span>
                </div>
                <p className="text-[10px] mb-3" style={{ color: '#78350f' }}>{plan.brandPalette.note}</p>
                <div className="space-y-2">
                  {plan.brandPalette.colors.map((c: any, i: number) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 border" style={{ background: c.hex, borderColor: 'rgba(255,255,255,0.1)' }} />
                      <div>
                        <div className="text-xs font-semibold" style={{ color: '#fef3c7' }}>{c.name}</div>
                        <div className="text-[10px]" style={{ color: '#a16207' }}>{c.hex} — {c.use}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* First 5 Content Plan */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <CheckSquare size={16} style={{ color: '#f97316' }} />
                <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>First 5 Content Pieces — WishlyAI Delivers These</div>
                <div className="badge ml-auto" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', fontSize: 10 }}>In order of priority</div>
              </div>
              <div className="space-y-3">
                {plan.firstFiveContent.map((item: any) => (
                  <div key={item.number} className="p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(249,115,22,0.1)' }}>
                    <div className="flex items-start gap-3">
                      {/* Number badge */}
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316' }}>
                        {item.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>{item.title}</span>
                          <span className="badge text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: item.urgencyColor + '22', color: item.urgencyColor, border: `1px solid ${item.urgencyColor}44` }}>
                            {item.urgency}
                          </span>
                          <span className="badge" style={{ background: 'rgba(249,115,22,0.08)', color: '#a16207', fontSize: 9 }}>{item.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Clock size={10} style={{ color: item.urgencyColor, flexShrink: 0 }} />
                          <span className="text-xs font-semibold" style={{ color: item.urgencyColor }}>{item.whenToPost}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-2 rounded-lg" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.08)' }}>
                            <div className="text-[9px] font-black mb-1 tracking-widest uppercase" style={{ color: '#b45309' }}>What we film</div>
                            <p className="text-[10px] leading-relaxed" style={{ color: '#d97706' }}>{item.what}</p>
                          </div>
                          <div className="p-2 rounded-lg" style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.1)' }}>
                            <div className="text-[9px] font-black mb-1 tracking-widest uppercase" style={{ color: '#7c3aed' }}>Why this works</div>
                            <p className="text-[10px] leading-relaxed" style={{ color: '#a78bfa' }}>{item.why}</p>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg mb-1.5" style={{ background: 'rgba(0,0,0,0.12)', border: '1px solid rgba(251,191,36,0.1)' }}>
                          <div className="text-[9px] font-black mb-0.5 tracking-widest uppercase" style={{ color: '#92400e' }}>Caption</div>
                          <p className="text-[10px] italic" style={{ color: '#fbbf24' }}>{item.caption}</p>
                        </div>
                        <div className="text-[10px]" style={{ color: '#78350f' }}>
                          Hashtags: <span style={{ color: '#b45309' }}>{item.hashtags}</span>
                        </div>
                      </div>
                      {/* Virality score */}
                      <div className="flex-shrink-0 text-center">
                        <div className="text-[9px] mb-1" style={{ color: '#78350f' }}>Virality</div>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: item.viralityScore >= 90 ? '#10b981' : '#f97316', background: 'rgba(0,0,0,0.2)' }}>
                          <div>
                            <div className="font-black text-sm leading-none" style={{ color: item.viralityScore >= 90 ? '#10b981' : '#fbbf24' }}>{item.viralityScore}</div>
                            <div className="text-[7px]" style={{ color: '#78350f' }}>/100</div>
                          </div>
                        </div>
                        {item.viralityScore >= 90 && <div className="text-[9px] mt-0.5" style={{ color: '#10b981' }}>🔥 Hot</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Business Fix */}
            <div className="card p-4" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.04))', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <span style={{ fontSize: 18 }}>🗺️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-sm" style={{ color: '#6ee7b7' }}>Google Business Fix: {plan.googleBusinessFix.issue}</span>
                    <span className="badge" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', fontSize: 9 }}>Quick Win</span>
                  </div>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color: '#a16207' }}>{plan.googleBusinessFix.currentImpact}</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {plan.googleBusinessFix.steps.map((step: string, i: number) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-xs font-bold flex-shrink-0" style={{ color: '#10b981' }}>{i + 1}.</span>
                        <span className="text-[10px]" style={{ color: '#6ee7b7' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontSize: 10 }}>
                    ✓ {plan.googleBusinessFix.estimatedImpact}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

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
          {recs.contentCalendar.map((item, i) => {
            const missed = (item as any).missed === true
            const alert = (item as any).alert === true
            const ipl = (item as any).ipl === true

            if (ipl) {
              return (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.06))', border: '1.5px solid rgba(16,185,129,0.4)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>{item.title}</span>
                        <span className="badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)', fontSize: 9 }}>🏏 IPL PRIORITY</span>
                        <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', fontSize: 9 }}>{item.type}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-xs">
                        <Clock size={11} style={{ color: '#10b981' }} />
                        <span className="font-semibold" style={{ color: item.date.includes('Today') ? '#10b981' : '#6ee7b7' }}>{item.date}</span>
                        {item.date.includes('Today') && <span className="text-[10px] font-bold" style={{ color: '#10b981' }}>— Post right now for maximum IPL reach</span>}
                      </div>
                      <div className="p-2.5 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(16,185,129,0.06)', color: '#6ee7b7', fontStyle: 'italic', border: '1px solid rgba(16,185,129,0.12)' }}>
                        "{item.caption}"
                      </div>
                      <div className="mt-2 text-[10px]" style={{ color: '#78350f' }}>
                        Suggested hashtags: <span style={{ color: '#059669' }}>{item.hashtags}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <div className="text-[10px] mb-1" style={{ color: '#78350f' }}>Virality</div>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#10b981', background: 'rgba(16,185,129,0.1)' }}>
                        <div>
                          <div className="font-black text-lg leading-none" style={{ color: '#10b981' }}>{item.viralityScore}</div>
                          <div className="text-[8px]" style={{ color: '#78350f' }}>/100</div>
                        </div>
                      </div>
                      <div className="text-[10px] mt-1" style={{ color: '#10b981' }}>🏆 IPL</div>
                    </div>
                  </div>
                </div>
              )
            }

            if (alert) {
              return (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(252,128,25,0.12), rgba(252,128,25,0.06))', border: '1.5px solid rgba(252,128,25,0.5)' }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>{item.title}</span>
                        <span className="badge flex items-center gap-1" style={{ background: 'rgba(252,128,25,0.2)', color: '#fc8019', border: '1px solid rgba(252,128,25,0.4)', fontSize: 9 }}>
                          <div className="ai-dot" style={{ background: '#fc8019' }} /> DETECTED
                        </span>
                        <span className="badge" style={{ background: 'rgba(252,128,25,0.12)', color: '#fc8019', fontSize: 9 }}>🛵 {item.festival}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: '#a16207' }}>
                        <Clock size={11} />
                        <span className="font-semibold" style={{ color: '#fc8019' }}>{item.date}</span>
                        <span className="text-[10px]" style={{ color: '#fc8019' }}>— Act within 2 hours for maximum impact</span>
                      </div>
                      <div className="p-2.5 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(252,128,25,0.08)', color: '#fbbf24', fontStyle: 'italic', border: '1px solid rgba(252,128,25,0.15)' }}>
                        Suggested response: "{item.caption}"
                      </div>
                      <div className="mt-2 text-[10px]" style={{ color: '#78350f' }}>
                        Suggested hashtags: <span style={{ color: '#b45309' }}>{item.hashtags}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <div className="text-[10px] mb-1" style={{ color: '#78350f' }}>Urgency</div>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                        style={{ borderColor: '#fc8019', background: 'rgba(252,128,25,0.1)' }}>
                        <div>
                          <div className="font-black text-lg leading-none" style={{ color: '#fc8019' }}>{item.viralityScore}</div>
                          <div className="text-[8px]" style={{ color: '#78350f' }}>/100</div>
                        </div>
                      </div>
                      <div className="text-[10px] mt-1" style={{ color: '#fc8019' }}>🛵 Live</div>
                    </div>
                  </div>
                </div>
              )
            }

            if (missed) {
              return (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1.5px solid rgba(239,68,68,0.4)', opacity: 0.85 }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-bold text-sm line-through" style={{ color: '#fca5a5' }}>{item.title}</span>
                        <span className="badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', fontSize: 9 }}>✗ MISSED</span>
                        <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 9 }}>{item.type}</span>
                        <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: 9 }}>💔 {item.festival}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-xs" style={{ color: '#a16207' }}>
                        <Clock size={11} style={{ color: '#ef4444' }} />
                        <span className="font-semibold" style={{ color: '#ef4444' }}>{item.date}</span>
                        <span className="text-[10px]" style={{ color: '#ef4444' }}>— Repurpose for Father's Day (Jun 21)</span>
                      </div>
                      <div className="p-2.5 rounded-lg text-xs leading-relaxed" style={{ background: 'rgba(239,68,68,0.06)', color: '#9ca3af', fontStyle: 'italic' }}>
                        "{item.caption}"
                      </div>
                      <div className="mt-2 text-[10px]" style={{ color: '#78350f' }}>
                        Suggested hashtags: <span style={{ color: '#7f1d1d' }}>{item.hashtags}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-center">
                      <div className="text-[10px] mb-1" style={{ color: '#78350f' }}>Virality</div>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center border-2"
                        style={{ borderColor: '#ef4444', background: 'rgba(239,68,68,0.1)' }}>
                        <div>
                          <div className="font-black text-lg leading-none" style={{ color: '#ef4444' }}>{item.viralityScore}</div>
                          <div className="text-[8px]" style={{ color: '#78350f' }}>/100</div>
                        </div>
                      </div>
                      <div className="text-[10px] mt-1" style={{ color: '#ef4444' }}>Missed</div>
                    </div>
                  </div>
                </div>
              )
            }

            return (
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
            )
          })}
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
