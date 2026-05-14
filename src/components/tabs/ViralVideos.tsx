import { TrendingUp, Lightbulb, Flame, Camera } from 'lucide-react'
import type { RestaurantId } from '../../data/mockData'
import { viralVideos } from '../../data/mockData'
import InstagramEmbed from '../InstagramEmbed'

interface Props { restaurant: RestaurantId }

export default function ViralVideos({ restaurant }: Props) {
  const videos = viralVideos[restaurant]
  const name = restaurant === 'ishtaa' ? 'Ishtaa Veg' : 'Amaha Food Village'

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.12), rgba(131,58,180,0.06))', borderColor: 'rgba(232,93,26,0.3)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={18} style={{ color: '#e85d1a' }} />
              <h2 className="text-lg font-black text-gradient">Viral Food Reels — Right Now</h2>
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
                <Camera size={13} className="text-white" />
              </div>
            </div>
            <p className="text-xs" style={{ color: '#c8790a' }}>
              Top-performing Instagram Reels in the{' '}
              <strong style={{ color: '#f0b429' }}>
                {restaurant === 'ishtaa' ? 'pure veg / South Indian dining' : 'South Indian breakfast / tiffin'}
              </strong>{' '}
              space. WishlyAI tracks these to extract winning content formulas for {name}.
            </p>
          </div>
          <div className="flex gap-2">
            <div className="badge" style={{ background: 'rgba(131,58,180,0.15)', color: '#c084fc', border: '1px solid rgba(131,58,180,0.25)' }}>
              <Camera size={10} /> Instagram Reels
            </div>
            <div className="badge" style={{ background: 'rgba(232,93,26,0.15)', color: '#e85d1a' }}>
              <div className="ai-dot" /> Insight-Mapped
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Combined Reel Views', val: restaurant === 'ishtaa' ? '14.9M+' : '19.7M+', icon: '👁️' },
            { label: 'Avg Engagement Rate', val: '8.4%', icon: '❤️' },
            { label: 'Content Formats Tracked', val: '3', icon: '📊' },
            { label: 'AI Learnings Extracted', val: `${videos.length * 3}`, icon: '🧠' },
          ].map(s => (
            <div key={s.label} className="text-center p-2.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-black text-lg" style={{ color: '#f0b429' }}>{s.val}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#8a5a0a' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reel Cards */}
      {videos.map((vid, i) => (
        <div key={i} className="card" style={{ overflow: 'hidden' }}>
          <div className="grid grid-cols-5 gap-5">
            {/* Instagram Embed */}
            <div className="col-span-2">
              <div style={{ zoom: 0.5, width: 600, height: 720, overflow: 'hidden', borderRadius: 4 }}>
                <InstagramEmbed
                  url={vid.postUrl}
                  handle={vid.account}
                  index={i}
                />
              </div>

              {/* Account info below embed */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
                  <Camera size={11} className="text-white" />
                </div>
                <span className="text-xs font-bold" style={{ color: '#f0b429' }}>{vid.account}</span>
                <span className="text-[10px]" style={{ color: '#8a5a0a' }}>{vid.followers}</span>
                {vid.trending && (
                  <span className="badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: 9 }}>
                    🔥 Trending
                  </span>
                )}
              </div>
            </div>

            {/* Info panel */}
            <div className="col-span-3 flex flex-col justify-between">
              <div>
                {/* Title + category */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge" style={{ background: 'rgba(232,93,26,0.12)', color: '#e85d1a', fontSize: 9 }}>
                      {vid.category}
                    </span>
                    <span className="text-[10px]" style={{ color: '#8a5a0a' }}>{vid.daysAgo}d ago</span>
                  </div>
                  <div className="font-bold text-sm leading-snug" style={{ color: '#fef3c7' }}>{vid.title}</div>
                </div>

                {/* Performance bars */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { label: 'Views', val: vid.views, pct: 90 + i * 3 },
                    { label: 'Likes', val: vid.likes, pct: 80 - i * 8 },
                    { label: 'Virality', val: `${95 - i * 5}/100`, pct: 95 - i * 5 },
                  ].map(m => (
                    <div key={m.label} className="p-2 rounded-lg" style={{ background: 'rgba(232,93,26,0.04)', border: '1px solid rgba(232,93,26,0.1)' }}>
                      <div className="text-[9px] mb-1" style={{ color: '#8a5a0a' }}>{m.label}</div>
                      <div className="font-bold text-sm" style={{ color: '#f0b429' }}>{m.val}</div>
                      <div className="h-1 rounded-full mt-1" style={{ background: 'rgba(232,93,26,0.12)' }}>
                        <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: 'linear-gradient(90deg, #e85d1a, #f0b429)' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Relevance */}
                <div className="p-3 rounded-xl mb-3" style={{ background: 'rgba(232,93,26,0.06)', border: '1px solid rgba(232,93,26,0.14)' }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp size={12} style={{ color: '#e85d1a' }} />
                    <span className="section-label" style={{ color: '#e85d1a' }}>Why it's relevant to {name}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#c8790a' }}>{vid.relevance}</p>
                </div>
              </div>

              {/* AI Lesson */}
              <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(240,180,41,0.08), rgba(232,93,26,0.05))', border: '1px solid rgba(240,180,41,0.2)' }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Lightbulb size={12} style={{ color: '#f0b429' }} />
                  <span className="section-label" style={{ color: '#f0b429' }}>AI Content Lesson for {name}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: '#fef3c7' }}>{vid.lesson}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Summary takeaways */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(232,93,26,0.07), rgba(179,74,10,0.04))' }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e85d1a, #b34a0a)' }}>
            <Lightbulb size={14} className="text-white" />
          </div>
          <div className="font-bold text-sm" style={{ color: '#fef3c7' }}>Top 3 Content Takeaways for {name}</div>
          <div className="badge ml-auto" style={{ background: 'rgba(232,93,26,0.15)', color: '#e85d1a' }}><div className="ai-dot" /> WishlyAI Synthesized</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { n: 1, title: 'Slow-motion food close-ups', desc: 'Steam rising off hot idly/dosa, ghee pour, sambar swirl — this format gets 3–5x more saves than static shots. Non-negotiable for every Reel.' },
            { n: 2, title: 'First-person reaction format', desc: `"I tried the most viral ${restaurant === 'ishtaa' ? 'veg restaurant' : 'breakfast'} in Hyderabad" POV is getting 2–8M views consistently. Partner with a micro-influencer to create this for ${name}.` },
            { n: 3, title: 'Morning rush B-roll', desc: '7am kitchen prep — fire on tawa, batter being ladled, steam in morning light — this authenticity format outperforms polished studio shots 3:1.' },
          ].map(t => (
            <div key={t.n} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(232,93,26,0.1)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-black" style={{ background: '#e85d1a', color: 'white' }}>{t.n}</div>
                <span className="font-bold text-xs" style={{ color: '#f0b429' }}>{t.title}</span>
              </div>
              <p className="text-xs" style={{ color: '#c8790a' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
