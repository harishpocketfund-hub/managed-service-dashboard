import { useState } from 'react'
import { intelligenceData } from '../../data/mockData'
import type { RestaurantId } from '../../data/mockData'
import { Newspaper, Calendar, Cloud, Trophy, Film, GraduationCap, ChevronRight, Zap } from 'lucide-react'

const sections = [
  { id: 'relevant', label: 'AI Priority Feed', icon: Zap },
  { id: 'festivals', label: 'Festivals & Events', icon: Calendar },
  { id: 'news', label: 'Local & Industry News', icon: Newspaper },
  { id: 'weather', label: 'Weather (Hyd)', icon: Cloud },
  { id: 'ipl', label: 'Sports Schedule', icon: Trophy },
  { id: 'movies', label: 'Movies & Entertainment', icon: Film },
  { id: 'academics', label: 'Academic Calendar', icon: GraduationCap },
]

interface Props { restaurant: RestaurantId }

export default function IntelligenceHub({ restaurant }: Props) {
  const [active, setActive] = useState('relevant')
  const d = intelligenceData
  const name = restaurant === 'ishtaa' ? 'Ishtaa Veg' : 'Amaha Food Village'

  const relevantFestivals = d.festivals.slice(0, 4)
  const relevantNews = [...d.localNews, ...d.foodIndustryNews].filter(n => n.relevance.includes(restaurant)).slice(0, 5)

  return (
    <div className="flex gap-4 h-full" style={{ minHeight: 'calc(100vh - 160px)' }}>
      {/* Left Nav */}
      <div className="w-52 flex-shrink-0">
        <div className="card p-2 sticky top-4">
          <div className="section-label px-2 py-2">Intelligence Modules</div>
          {sections.map(s => {
            const Icon = s.icon
            const isActive = active === s.id
            return (
              <button key={s.id} onClick={() => setActive(s.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-150 mb-0.5"
                style={isActive ? { background: 'rgba(249,115,22,0.15)', color: '#fbbf24', borderLeft: '2px solid #f97316' } : { color: '#a16207' }}>
                <Icon size={15} />
                <span className="font-medium">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 animate-in">

        {/* AI PRIORITY FEED */}
        {active === 'relevant' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gradient">AI Priority Intelligence</h2>
                <p className="text-xs mt-0.5" style={{ color: '#a16207' }}>Curated by our AI agents specifically for {name} — updated live</p>
              </div>
              <div className="badge glow-orange" style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
                <div className="ai-dot" /> AI Filtered
              </div>
            </div>

            {/* Urgent Today */}
            {relevantFestivals.filter(f => f.isToday).map(f => (
              <div key={f.name} className="card glow-orange" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(180,83,9,0.08))', borderColor: 'rgba(249,115,22,0.4)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge sev-high">⚡ ACT TODAY</span>
                  <span className="text-xs font-bold" style={{ color: '#f97316' }}>{f.name}</span>
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#fbbf24' }}>{f.tip}</p>
                <div className="flex items-center gap-2 text-xs mt-3" style={{ color: '#a16207' }}>
                  <span>AI Relevance Score</span>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(249,115,22,0.15)' }}>
                    <div className="h-full rounded-full" style={{ width: `${f.relevanceScore}%`, background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                  </div>
                  <span className="font-bold" style={{ color: '#fbbf24' }}>{f.relevanceScore}/100</span>
                </div>
              </div>
            ))}

            {/* Upcoming Opportunities */}
            <div className="card">
              <div className="section-label mb-3">Upcoming Opportunities (Next 30 Days)</div>
              <div className="space-y-3">
                {relevantFestivals.filter(f => !f.isToday).map(f => (
                  <div key={f.name} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.1)' }}>
                    <div className="text-2xl">{f.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm" style={{ color: '#fef3c7' }}>{f.name}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                          {f.daysAway}d away
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: '#a16207' }}>{f.tip}</p>
                      <div className="flex items-center gap-2 text-xs mt-2">
                        <div className="h-1 rounded-full" style={{ width: `${f.relevanceScore * 0.8}px`, background: 'linear-gradient(90deg, #b45309, #f97316)', minWidth: 40 }} />
                        <span style={{ color: '#78350f' }}>Score: <strong style={{ color: '#fbbf24' }}>{f.relevanceScore}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry News for this restaurant */}
            <div className="card">
              <div className="section-label mb-3">Relevant Industry News</div>
              <div className="space-y-2">
                {relevantNews.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'rgba(249,115,22,0.08)' }}>
                    <div className="badge mt-0.5 flex-shrink-0" style={
                      n.tag === 'Opportunity' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' } :
                      n.tag === 'Platform' ? { background: 'rgba(99,102,241,0.1)', color: '#818cf8' } :
                      n.tag === 'Compliance' ? { background: 'rgba(239,68,68,0.1)', color: '#f87171' } :
                      { background: 'rgba(249,115,22,0.1)', color: '#f97316' }
                    }>{n.tag}</div>
                    <div className="flex-1">
                      <p className="text-xs font-medium leading-snug" style={{ color: '#fef3c7' }}>{n.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: '#78350f' }}>
                        <span>{n.source}</span>
                        <span>•</span>
                        <span>{n.time}</span>
                      </div>
                    </div>
                    <ChevronRight size={12} style={{ color: '#78350f', flexShrink: 0, marginTop: 2 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FESTIVALS */}
        {active === 'festivals' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gradient">Festival & Events Calendar</h2>
              <p className="text-xs mt-0.5" style={{ color: '#a16207' }}>Next 30 days — all tracked, sorted by business relevance</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {d.festivals.map(f => (
                <div key={f.name} className="card" style={f.isToday ? { borderColor: 'rgba(249,115,22,0.5)', background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(180,83,9,0.05))' } : {}}>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{f.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm" style={{ color: '#fef3c7' }}>{f.name}</span>
                        {f.isToday && <span className="badge" style={{ background: '#f97316', color: 'white', fontSize: 9 }}>TODAY</span>}
                      </div>
                      <div className="text-xs mb-2" style={{ color: '#a16207' }}>
                        {new Date(f.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                        {!f.isToday && <span className="ml-2" style={{ color: '#fbbf24' }}>→ {f.daysAway} days</span>}
                      </div>
                      <div className="badge mb-2" style={{ background: 'rgba(249,115,22,0.1)', color: '#d97706', fontSize: 10 }}>
                        {f.category}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: '#d97706' }}>{f.tip}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <span style={{ color: '#78350f' }}>Relevance</span>
                        <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(249,115,22,0.12)' }}>
                          <div className="h-full rounded-full" style={{ width: `${f.relevanceScore}%`, background: 'linear-gradient(90deg, #b45309, #f97316)' }} />
                        </div>
                        <strong className="text-[10px]" style={{ color: '#fbbf24' }}>{f.relevanceScore}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEWS */}
        {active === 'news' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gradient">Local & Food Industry News</h2>
            <div>
              <div className="section-label mb-2">Local Hyderabad News</div>
              <div className="space-y-2">
                {d.localNews.map((n, i) => (
                  <div key={i} className="card flex items-start gap-3">
                    <div className="badge flex-shrink-0" style={n.tag === 'Opportunity' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' } : n.tag === 'Compliance' ? { background: 'rgba(239,68,68,0.1)', color: '#f87171' } : { background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>{n.tag}</div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#fef3c7' }}>{n.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: '#78350f' }}>
                        <span>{n.source}</span><span>•</span><span>{n.time}</span>
                        {n.relevance.includes(restaurant) && <span className="badge" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', fontSize: 9 }}>Relevant to you</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-2 mt-4">Food Industry News</div>
              <div className="space-y-2">
                {d.foodIndustryNews.map((n, i) => (
                  <div key={i} className="card flex items-start gap-3">
                    <div className="badge flex-shrink-0" style={n.tag === 'Platform' ? { background: 'rgba(99,102,241,0.1)', color: '#818cf8' } : n.tag === 'Strategy' ? { background: 'rgba(16,185,129,0.1)', color: '#10b981' } : { background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>{n.tag}</div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#fef3c7' }}>{n.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: '#78350f' }}>
                        <span>{n.source}</span><span>•</span><span>{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WEATHER */}
        {active === 'weather' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gradient">Hyderabad Weather Forecast</h2>
              <p className="text-xs mt-1" style={{ color: '#a16207' }}>AI insight: <strong style={{ color: '#fbbf24' }}>Hot weather = indoors dining surge. Expected 28% footfall boost this week.</strong></p>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {d.weather.map((w, i) => (
                <div key={i} className="card text-center p-3" style={i === 0 ? { borderColor: 'rgba(249,115,22,0.4)', background: 'rgba(249,115,22,0.06)' } : {}}>
                  <div className="text-xs font-bold mb-1" style={{ color: i === 0 ? '#fbbf24' : '#a16207' }}>{w.day}</div>
                  <div className="text-xs mb-2" style={{ color: '#78350f' }}>{w.date}</div>
                  <div className="text-2xl mb-2">{w.icon}</div>
                  <div className="font-bold text-sm" style={{ color: '#f97316' }}>{w.high}°</div>
                  <div className="text-xs" style={{ color: '#78350f' }}>{w.low}°</div>
                  <div className="text-[10px] mt-1" style={{ color: '#92400e' }}>{w.condition}</div>
                  <div className="text-[10px] mt-1" style={{ color: '#78350f' }}>💧 {w.humidity}%</div>
                </div>
              ))}
            </div>
            <div className="card" style={{ background: 'rgba(249,115,22,0.05)' }}>
              <div className="section-label mb-2">AI Weather-Business Insights</div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2"><span style={{ color: '#f97316' }}>🌡️</span><span style={{ color: '#d97706' }}>Temperatures above 38°C drive 32% increase in cold beverage orders — promote coolers & chaas heavily this week</span></div>
                <div className="flex items-start gap-2"><span style={{ color: '#f97316' }}>⛈️</span><span style={{ color: '#d97706' }}>Sunday thunderstorm predicted — content opportunity: "Perfect storm comfort food" post for Sunday morning</span></div>
                <div className="flex items-start gap-2"><span style={{ color: '#10b981' }}>🌦️</span><span style={{ color: '#d97706' }}>Pre-monsoon season starts next week — "First rains" themed content typically gets 2.8x engagement</span></div>
              </div>
            </div>
          </div>
        )}

        {/* IPL / SPORTS */}
        {active === 'ipl' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gradient">Sports Schedule</h2>
            <div>
              <div className="section-label mb-2">IPL 2026 — Remaining Matches</div>
              <div className="space-y-2">
                {d.iplSchedule.map((m, i) => (
                  <div key={i} className="card flex items-center gap-4"
                    style={m.round.includes('FINAL') ? { borderColor: 'rgba(251,191,36,0.4)', background: 'linear-gradient(135deg, rgba(251,191,36,0.08), rgba(249,115,22,0.05))' } : {}}>
                    <div className="text-2xl">🏏</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>{m.match}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#a16207' }}>{m.venue}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-xs" style={{ color: '#fbbf24' }}>{m.date} • {m.time}</div>
                      <div className="badge mt-1" style={{ background: m.round.includes('FINAL') ? '#f97316' : 'rgba(249,115,22,0.12)', color: m.round.includes('FINAL') ? 'white' : '#f97316', fontSize: 10 }}>{m.round}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-label mb-2 mt-2">Other Major Sports Events</div>
              <div className="grid grid-cols-2 gap-2">
                {d.sports.filter(s => !s.sport.includes('🏏')).map((s, i) => (
                  <div key={i} className="card p-3 flex items-center gap-3">
                    <div className="text-xl">{s.sport.split(' ').slice(-1)[0]}</div>
                    <div>
                      <div className="font-medium text-xs" style={{ color: '#fef3c7' }}>{s.event}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#a16207' }}>{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MOVIES */}
        {active === 'movies' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gradient">Movies & Entertainment Releases</h2>
            <p className="text-xs" style={{ color: '#a16207' }}>AI insight: <strong style={{ color: '#fbbf24' }}>Major film releases = date nights & family outings = pre/post movie dining surge</strong></p>
            <div className="grid grid-cols-1 gap-3">
              {d.movies.map((m, i) => (
                <div key={i} className="card flex items-center gap-4">
                  <div className="w-12 h-16 rounded-lg flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(180,83,9,0.15))', border: '1px solid rgba(249,115,22,0.2)' }}>🎬</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>{m.title}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#a16207' }}>
                      <span>{m.release}</span>
                      <span>•</span>
                      <span>{m.language}</span>
                      <span>•</span>
                      <span>{m.genre}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs mb-1" style={{ color: '#78350f' }}>Hype Index</div>
                    <div className="font-bold text-xl" style={{ color: m.hype > 90 ? '#f97316' : m.hype > 80 ? '#fbbf24' : '#a16207' }}>{m.hype}</div>
                    <div className="text-[10px]" style={{ color: '#78350f' }}>/100</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACADEMICS */}
        {active === 'academics' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gradient">Exam & Academic Calendar</h2>
            <p className="text-xs" style={{ color: '#a16207' }}>Results days = high footfall from celebrating families. Exam days = student break dining.</p>
            <div className="space-y-2">
              {d.academics.map((a, i) => (
                <div key={i} className="card flex items-center gap-4">
                  <div className="text-2xl">{a.category === 'Results' ? '🎉' : a.category === 'Exam' ? '📝' : '📢'}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm" style={{ color: '#fef3c7' }}>{a.event}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#a16207' }}>Target: {a.audience}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm" style={{ color: '#fbbf24' }}>{a.date}</div>
                    <div className="badge mt-1" style={{ background: a.category === 'Results' ? 'rgba(16,185,129,0.1)' : 'rgba(249,115,22,0.1)', color: a.category === 'Results' ? '#10b981' : '#f97316', fontSize: 10 }}>{a.category}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card" style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className="section-label mb-2" style={{ color: '#10b981' }}>AI Opportunity Alert</div>
              <p className="text-sm" style={{ color: '#a7f3d0' }}>CBSE Results on <strong>May 25</strong> and EAMCET Results on <strong>May 18</strong> are massive celebration triggers. Plan a "Results Day" special campaign — family meal deals with shareable moments. Posts around these dates historically see 4–6x organic shares.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
