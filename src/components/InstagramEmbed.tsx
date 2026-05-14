import { useEffect } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ExternalLink } from 'lucide-react'

declare global {
  interface Window { instgrm?: { Embeds: { process(): void } } }
}

let igLoaded = false

function ensureIgScript() {
  if (igLoaded) {
    window.instgrm?.Embeds.process()
    return
  }
  igLoaded = true
  const s = document.createElement('script')
  s.src = '//www.instagram.com/embed.js'
  s.async = true
  s.onload = () => window.instgrm?.Embeds.process()
  document.body.appendChild(s)
}

// Gradient food image backgrounds — cycles per handle so each looks unique
const FOOD_GRADIENTS = [
  'linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 70%, #fbbf24 100%)',
  'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ea580c 70%, #fb923c 100%)',
  'linear-gradient(135deg, #451a03 0%, #78350f 40%, #b45309 70%, #d97706 100%)',
  'linear-gradient(135deg, #1c1917 0%, #44403c 40%, #78716c 60%, #a8a29e 100%)',
]

const FOOD_EMOJIS = ['🍛', '🥘', '🍲', '🫕', '🥗', '🍱', '🍜', '🫔']

interface Props {
  url: string
  handle?: string
  fallbackLabel?: string
  index?: number
}

export default function InstagramEmbed({ url, handle, index = 0 }: Props) {
  useEffect(() => {
    if (url) ensureIgScript()
  }, [url])

  if (!url) {
    const grad = FOOD_GRADIENTS[index % FOOD_GRADIENTS.length]
    const emoji = FOOD_EMOJIS[index % FOOD_EMOJIS.length]
    const displayHandle = handle ?? '@account'
    const profileUrl = `https://www.instagram.com/${displayHandle.replace('@', '')}/`

    return (
      <div className="rounded-xl overflow-hidden" style={{ background: '#1a0e05', border: '1px solid rgba(232,93,26,0.15)' }}>
        {/* Instagram-style header */}
        <div className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            {/* Gradient avatar ring */}
            <div className="p-0.5 rounded-full" style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm" style={{ background: '#1a0e05' }}>
                {emoji}
              </div>
            </div>
            <div>
              <div className="font-bold text-xs" style={{ color: '#fef3c7' }}>{displayHandle}</div>
              <div className="text-[9px]" style={{ color: '#8a5a0a' }}>Hyderabad</div>
            </div>
          </div>
          <MoreHorizontal size={14} style={{ color: '#8a5a0a' }} />
        </div>

        {/* Image placeholder — looks like a real food post */}
        <div className="relative" style={{ aspectRatio: '1 / 1', background: grad }}>
          {/* Food emoji centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: 64, opacity: 0.35 }}>{emoji}</span>
          </div>
          {/* "Connect" overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: 'rgba(0,0,0,0.38)' }}>
            <a href={profileUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <ExternalLink size={11} /> View {displayHandle} on Instagram
            </a>
            <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Post URL not configured</div>
          </div>
        </div>

        {/* Instagram-style actions */}
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-3">
              <Heart size={20} style={{ color: '#fef3c7' }} />
              <MessageCircle size={20} style={{ color: '#fef3c7' }} />
              <Send size={20} style={{ color: '#fef3c7' }} />
            </div>
            <Bookmark size={20} style={{ color: '#fef3c7' }} />
          </div>
          <div className="text-[10px] font-bold mb-0.5" style={{ color: '#fef3c7' }}>— likes</div>
          <div className="text-[10px]" style={{ color: '#8a5a0a' }}>View all comments on Instagram</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned=""
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#fff',
          border: '0',
          borderRadius: '4px',
          margin: '0 auto',
          maxWidth: '100%',
          minWidth: '280px',
          padding: '0',
          width: '100%',
        }}
      />
    </div>
  )
}
