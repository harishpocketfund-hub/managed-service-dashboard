import { useState } from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import { AlertTriangle, CheckCircle2, Clock, Users, Hash, Calendar, TrendingUp, Target, Star, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { auditData } from '../../data/auditData'

interface Props { restaurant: RestaurantId }

const ScoreRing = ({ score, size = 100 }: { score: number; size?: number }) => {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 75 ? '#22c55e' : score >= 55 ? '#f0b429' : '#ef4444'
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fill={color} fontSize={size * 0.22} fontWeight="900">{score}</text>
      <text x={size / 2} y={size / 2 + size * 0.18} textAnchor="middle" fill="#8a5a0a" fontSize={size * 0.1}>/100</text>
    </svg>
  )
}

const SectionHeader = ({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub?: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e85d1a, #b34a0a)' }}>
      <Icon size={16} className="text-white" />
    </div>
    <div>
      <div className="font-black text-sm" style={{ color: '#fef3c7' }}>{title}</div>
      {sub && <div className="text-[10px] mt-0.5" style={{ color: '#8a5a0a' }}>{sub}</div>}
    </div>
  </div>
)

const StatusBadge = ({ status, color }: { status: string; color: string }) => (
  <span className="text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
    {status}
  </span>
)

export default function InstagramAudit({ restaurant }: Props) {
  const data = auditData[restaurant]
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0)

  const radarData = data.scoreBreakdown.map(s => ({ subject: s.label.split(' ')[0], A: s.score, fullMark: 100 }))

  return (
    <div className="space-y-5 animate-in">
      {/* Header / Profile Score */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.14), rgba(240,180,41,0.06))', borderColor: 'rgba(232,93,26,0.35)' }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <ScoreRing score={data.profileScore} size={110} />
            <div>
              <div className="badge mb-2" style={{ background: 'rgba(232,93,26,0.15)', color: '#e85d1a' }}>
                <div className="ai-dot" /> WishlyAI Instagram Audit Report
              </div>
              <div className="font-black text-xl" style={{ color: '#fef3c7' }}>{data.name}</div>
              <div className="text-sm font-semibold mb-1" style={{ color: '#f0b429' }}>{data.handle}</div>
              <div className="text-xs" style={{ color: '#8a5a0a' }}>Audit completed: {data.auditDate}</div>
              <div className="mt-2 text-xs" style={{ color: '#c8790a' }}>
                {data.profileScore >= 70
                  ? 'Good foundation — significant growth unlockable with targeted improvements.'
                  : data.profileScore >= 55
                  ? 'Below-potential account — core strategy gaps are limiting organic reach.'
                  : 'Urgent intervention needed — multiple critical signals being missed.'}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[240px]" style={{ maxWidth: 320 }}>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(232,93,26,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#8a5a0a', fontSize: 10 }} />
                <Radar name="Score" dataKey="A" stroke="#e85d1a" fill="#e85d1a" fillOpacity={0.18} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score breakdown bars */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(232,93,26,0.1)' }}>
          {data.scoreBreakdown.map(s => {
            const c = s.score >= 70 ? '#22c55e' : s.score >= 45 ? '#f0b429' : '#ef4444'
            return (
              <div key={s.label} className="p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.18)' }}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color: '#8a5a0a' }}>{s.label}</span>
                  <span style={{ color: c, fontWeight: 700 }}>{s.score}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: c }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Algorithm Intelligence */}
      <div className="card">
        <SectionHeader icon={Target} title="Algorithm Intelligence — 6 Ranking Signals"
          sub="Instagram's algorithm ranks your content on these 6 signals. Red = urgent fix." />

        {/* API notice */}
        <div className="flex items-start gap-3 mb-4 p-3 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.22)' }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(99,102,241,0.2)' }}>
            <span style={{ fontSize: 13 }}>🔌</span>
          </div>
          <div>
            <div className="font-bold text-xs mb-0.5" style={{ color: '#a5b4fc' }}>
              Live signal scores require Instagram Business API
            </div>
            <div className="text-[10px]" style={{ color: '#6366f1' }}>
              Benchmarks below reflect industry standards for accounts in this category. WishlyAI will pull real account-level signal data once the Instagram API is connected.
            </div>
          </div>
          <span className="text-[9px] font-black px-2 py-1 rounded-full flex-shrink-0" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
            API REQUIRED
          </span>
        </div>

        <div className="space-y-3">
          {data.algorithmSignals.map(sig => (
            <div key={sig.signal} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.18)', border: `1px solid ${sig.color}22` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: sig.color }} />
                  <span className="font-bold text-xs" style={{ color: '#fef3c7' }}>{sig.signal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={sig.status} color={sig.color} />
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', fontSize: 8 }}>
                    industry benchmark: {sig.benchmark}
                  </span>
                </div>
              </div>
              <p className="text-[10px]" style={{ color: '#c8790a' }}>{sig.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optimal Posting Windows */}
      <div className="card">
        <SectionHeader icon={Clock} title="Optimal Posting Windows"
          sub="When your audience is most active and most likely to engage" />
        <div className="space-y-3">
          {data.postingWindows.map((w, i) => (
            <div key={i} className="p-3 rounded-xl flex items-start gap-4" style={{ background: i === 0 ? 'rgba(232,93,26,0.08)' : 'rgba(0,0,0,0.15)', border: '1px solid rgba(232,93,26,0.1)' }}>
              <div className="text-center min-w-[90px]">
                <div className="font-black text-sm" style={{ color: '#f0b429' }}>{w.time}</div>
                <div className="text-[9px] mt-0.5" style={{ color: '#8a5a0a' }}>{w.days}</div>
                <div className="badge mt-1" style={{ background: w.priority === 'High' ? 'rgba(232,93,26,0.2)' : 'rgba(240,180,41,0.15)', color: w.priority === 'High' ? '#e85d1a' : '#f0b429', fontSize: 8 }}>
                  {w.priority} Priority
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: '#fef3c7' }}>{w.audience}</div>
                <div className="text-[10px]" style={{ color: '#c8790a' }}>{w.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Profile */}
      <div className="card">
        <SectionHeader icon={Users} title="Audience & Viewer Profile" />
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: 'Primary Audience', ...data.audience.primary, badge: 'Core Revenue', badgeColor: '#e85d1a' },
            { label: 'Secondary Audience', ...data.audience.secondary, badge: 'Growth Segment', badgeColor: '#f0b429' },
          ].map(seg => (
            <div key={seg.label} className="p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(232,93,26,0.12)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="section-label" style={{ color: '#8a5a0a' }}>{seg.label}</span>
                <span className="badge" style={{ background: `${seg.badgeColor}22`, color: seg.badgeColor, fontSize: 8 }}>{seg.badge}</span>
              </div>
              <div className="font-black text-sm mb-2" style={{ color: '#f0b429' }}>{seg.segment}</div>
              <div className="space-y-1 text-[10px]">
                <div><span style={{ color: '#8a5a0a' }}>Age: </span><span style={{ color: '#c8790a' }}>{seg.age}</span></div>
                <div><span style={{ color: '#8a5a0a' }}>Location: </span><span style={{ color: '#c8790a' }}>{seg.location}</span></div>
                <div><span style={{ color: '#8a5a0a' }}>Behavior: </span><span style={{ color: '#c8790a' }}>{seg.behavior}</span></div>
                <div><span style={{ color: '#8a5a0a' }}>Motivation: </span><span style={{ color: '#c8790a' }}>{seg.motivation}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Content They SAVE', icon: '🔖', items: data.audience.saves, color: '#f0b429' },
            { title: 'Content They SHARE', icon: '📤', items: data.audience.shares, color: '#e85d1a' },
          ].map(col => (
            <div key={col.title} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.15)', border: `1px solid ${col.color}22` }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span style={{ fontSize: 14 }}>{col.icon}</span>
                <span className="font-bold text-xs" style={{ color: col.color }}>{col.title}</span>
              </div>
              <ul className="space-y-1.5">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px]" style={{ color: '#c8790a' }}>
                    <span style={{ color: col.color, marginTop: 1 }}>▸</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Content Audit */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader icon={BookOpen} title="Content Audit" sub="Assessment of current content quality and gaps" />
          <div className="text-center">
            <div className="font-black text-3xl" style={{ color: data.contentAudit.gradeColor }}>{data.contentAudit.grade}</div>
            <div className="text-[9px]" style={{ color: '#8a5a0a' }}>Current Grade</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <CheckCircle2 size={13} style={{ color: '#22c55e' }} />
              <span className="font-bold text-xs" style={{ color: '#22c55e' }}>What's Working</span>
            </div>
            <ul className="space-y-2">
              {data.contentAudit.wins.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-[10px] p-2 rounded-lg" style={{ background: 'rgba(34,197,94,0.06)', color: '#c8790a' }}>
                  <span style={{ color: '#22c55e', marginTop: 1 }}>✓</span> {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle size={13} style={{ color: '#ef4444' }} />
              <span className="font-bold text-xs" style={{ color: '#ef4444' }}>Critical Missing Items</span>
            </div>
            <ul className="space-y-2">
              {data.contentAudit.missing.map((m, i) => (
                <li key={i} className="p-2 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.1)' }}>
                  <div className="flex items-start gap-1.5 text-[10px] font-semibold mb-0.5" style={{ color: '#fca5a5' }}>
                    <span style={{ color: '#ef4444', marginTop: 1 }}>✗</span> {m.item}
                  </div>
                  <div className="text-[9px] pl-3" style={{ color: '#8a5a0a' }}>Impact: {m.impact}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Hashtag Strategy */}
      <div className="card">
        <SectionHeader icon={Hash} title="Hashtag Strategy" sub={data.hashtagStrategy.note} />
        <div className="grid grid-cols-2 gap-3">
          {data.hashtagStrategy.tiers.map(tier => (
            <div key={tier.tier} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.18)', border: `1px solid ${tier.color}22` }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs" style={{ color: tier.color }}>{tier.tier}</span>
              </div>
              <div className="text-[9px] mb-2" style={{ color: '#8a5a0a' }}>{tier.purpose}</div>
              <div className="flex flex-wrap gap-1">
                {tier.tags.map(tag => (
                  <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: `${tier.color}18`, color: tier.color, border: `1px solid ${tier.color}30` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Roadmap */}
      <div className="card">
        <SectionHeader icon={Calendar} title="30-Day Growth Roadmap" sub="WishlyAI execution plan — week by week" />
        <div className="space-y-2">
          {data.roadmap.map((week, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(232,93,26,0.14)' }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left"
                style={{ background: expandedWeek === i ? 'rgba(232,93,26,0.1)' : 'rgba(0,0,0,0.2)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0" style={{ background: '#e85d1a', color: 'white' }}>
                  W{week.week}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>{week.title}</div>
                  <div className="text-[10px]" style={{ color: '#8a5a0a' }}>{week.theme}</div>
                </div>
                <div className="badge mr-2" style={{ background: 'rgba(240,180,41,0.15)', color: '#f0b429', fontSize: 9 }}>
                  KPI: {week.kpi}
                </div>
                {expandedWeek === i ? <ChevronUp size={14} style={{ color: '#e85d1a' }} /> : <ChevronDown size={14} style={{ color: '#8a5a0a' }} />}
              </button>
              {expandedWeek === i && (
                <div className="px-4 pb-4 pt-2" style={{ background: 'rgba(0,0,0,0.1)' }}>
                  <ul className="space-y-2">
                    {week.tasks.map((task, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs p-2 rounded-lg" style={{ background: 'rgba(232,93,26,0.04)', color: '#c8790a' }}>
                        <span className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0" style={{ background: 'rgba(232,93,26,0.2)', color: '#e85d1a' }}>{j + 1}</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ROI Stats */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.08), rgba(179,74,10,0.04))' }}>
        <SectionHeader icon={Star} title="Why Instagram Matters for Your Restaurant" />
        <div className="grid grid-cols-4 gap-3 mb-5">
          {data.roiStats.map(s => (
            <div key={s.stat} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(232,93,26,0.12)' }}>
              <div className="font-black text-2xl" style={{ color: '#f0b429' }}>{s.stat}</div>
              <div className="text-[10px] mt-1" style={{ color: '#8a5a0a' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projected Results */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} style={{ color: '#e85d1a' }} />
            <span className="font-bold text-sm" style={{ color: '#fef3c7' }}>Projected Results with WishlyAI Management</span>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(232,93,26,0.18)' }}>
            <div className="grid grid-cols-4 text-[10px] font-black px-3 py-2" style={{ background: 'rgba(232,93,26,0.12)', color: '#e85d1a' }}>
              <span>Metric</span>
              <span className="text-center">Current</span>
              <span className="text-center">30 Days</span>
              <span className="text-center" style={{ color: '#f0b429' }}>90 Days</span>
            </div>
            {data.projection.map((row, i) => (
              <div key={row.metric} className="grid grid-cols-4 text-[10px] px-3 py-2.5" style={{ background: i % 2 === 0 ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)', borderTop: '1px solid rgba(232,93,26,0.06)' }}>
                <span className="font-semibold" style={{ color: '#c8790a' }}>{row.metric}</span>
                <span className="text-center" style={{ color: '#8a5a0a' }}>{row.current}</span>
                <span className="text-center font-semibold" style={{ color: '#e85d1a' }}>{row.thirtyDays}</span>
                <span className="text-center font-black" style={{ color: '#f0b429' }}>{row.ninetyDays}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.2)' }}>
          <div className="text-xs font-black mb-1" style={{ color: '#f0b429' }}>WishlyAI Managed Services</div>
          <p className="text-[10px]" style={{ color: '#c8790a' }}>
            All of the above — content creation, scheduling, hashtag optimisation, reel production, influencer outreach, and monthly audit reviews — handled end-to-end by our team.
          </p>
        </div>
      </div>
    </div>
  )
}
